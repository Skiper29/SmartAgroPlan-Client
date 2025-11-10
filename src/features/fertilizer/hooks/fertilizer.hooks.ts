import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fertilizerApi } from '@/features/fertilizer/api/fertilizer.api';
import type {
  SeasonFertilizerPlan,
  SaveSeasonPlanRequest,
  CurrentRecommendation,
  FertilizerApplication,
  NutrientApplicationSummary,
  RecordApplicationRequest,
  NutrientBalance,
  NutrientDeficitAnalysis,
} from '@/models/fertilizer';
import type { ApiError } from '@/types/api-error.type';

// Query keys
const FERTILIZER_KEYS = {
  all: ['fertilizer'] as const,
  plans: () => [...FERTILIZER_KEYS.all, 'plans'] as const,
  plan: (fieldId: number, targetYield?: number, sowingDate?: string) =>
    [...FERTILIZER_KEYS.plans(), { fieldId, targetYield, sowingDate }] as const,
  recommendations: () => [...FERTILIZER_KEYS.all, 'recommendations'] as const,
  currentRecommendation: (fieldId: number) =>
    [...FERTILIZER_KEYS.recommendations(), 'current', fieldId] as const,
  applications: () => [...FERTILIZER_KEYS.all, 'applications'] as const,
  upcomingApplications: (fieldId: number, daysAhead: number) =>
    [
      ...FERTILIZER_KEYS.applications(),
      'upcoming',
      { fieldId, daysAhead },
    ] as const,
  applicationsByDateRange: (
    fieldId: number,
    startDate: string,
    endDate: string,
  ) =>
    [
      ...FERTILIZER_KEYS.applications(),
      'dateRange',
      { fieldId, startDate, endDate },
    ] as const,
  applicationSummary: (fieldId: number, fromDate: string, toDate: string) =>
    [
      ...FERTILIZER_KEYS.applications(),
      'summary',
      { fieldId, fromDate, toDate },
    ] as const,
  balances: () => [...FERTILIZER_KEYS.all, 'balances'] as const,
  balance: (fieldId: number) =>
    [...FERTILIZER_KEYS.balances(), fieldId] as const,
  deficits: () => [...FERTILIZER_KEYS.all, 'deficits'] as const,
  deficit: (fieldId: number) =>
    [...FERTILIZER_KEYS.deficits(), fieldId] as const,
};

// Calculate season plan
export const useCalculateSeasonPlan = (
  fieldId: number,
  targetYield?: number,
  sowingDate?: string,
  enabled: boolean = true,
) =>
  useQuery<SeasonFertilizerPlan, ApiError>({
    queryKey: FERTILIZER_KEYS.plan(fieldId, targetYield, sowingDate),
    queryFn: () =>
      fertilizerApi.calculateSeasonPlan(fieldId, targetYield, sowingDate),
    enabled: enabled && !!fieldId,
  });

// Save season plan
export const useSaveSeasonPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<number, ApiError, SaveSeasonPlanRequest>({
    mutationFn: (data: SaveSeasonPlanRequest) =>
      fertilizerApi.saveSeasonPlan(data),
    onSuccess: (_planId, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_KEYS.plan(
          variables.fieldId,
          variables.targetYield,
          variables.sowingDate,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_KEYS.currentRecommendation(variables.fieldId),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_KEYS.balance(variables.fieldId),
      });
    },
  });
};

// Get current recommendation
export const useCurrentRecommendation = (
  fieldId: number,
  enabled: boolean = true,
) =>
  useQuery<CurrentRecommendation, ApiError>({
    queryKey: FERTILIZER_KEYS.currentRecommendation(fieldId),
    queryFn: () => fertilizerApi.getCurrentRecommendation(fieldId),
    enabled: enabled && !!fieldId,
  });

// Get upcoming applications
export const useUpcomingApplications = (
  fieldId: number,
  daysAhead: number = 14,
  enabled: boolean = true,
) =>
  useQuery<FertilizerApplication[], ApiError>({
    queryKey: FERTILIZER_KEYS.upcomingApplications(fieldId, daysAhead),
    queryFn: () => fertilizerApi.getUpcomingApplications(fieldId, daysAhead),
    enabled: enabled && !!fieldId,
  });

// Get applications by date range
export const useApplicationsByDateRange = (
  fieldId: number,
  startDate: string,
  endDate: string,
  enabled: boolean = true,
) =>
  useQuery<FertilizerApplication[], ApiError>({
    queryKey: FERTILIZER_KEYS.applicationsByDateRange(
      fieldId,
      startDate,
      endDate,
    ),
    queryFn: () =>
      fertilizerApi.getApplicationsByDateRange(fieldId, startDate, endDate),
    enabled: enabled && !!fieldId && !!startDate && !!endDate,
  });

// Get application summary
export const useApplicationSummary = (
  fieldId: number,
  fromDate: string,
  toDate: string,
  enabled: boolean = true,
) =>
  useQuery<NutrientApplicationSummary, ApiError>({
    queryKey: FERTILIZER_KEYS.applicationSummary(fieldId, fromDate, toDate),
    queryFn: () =>
      fertilizerApi.getApplicationSummary(fieldId, fromDate, toDate),
    enabled: enabled && !!fieldId && !!fromDate && !!toDate,
  });

// Record application
export const useRecordApplication = () => {
  const queryClient = useQueryClient();
  return useMutation<number, ApiError, RecordApplicationRequest>({
    mutationFn: (data: RecordApplicationRequest) =>
      fertilizerApi.recordApplication(data),
    onSuccess: (_applicationId, variables) => {
      // Invalidate all application-related queries for the field
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_KEYS.applications(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_KEYS.currentRecommendation(variables.fieldId),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_KEYS.balance(variables.fieldId),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_KEYS.deficit(variables.fieldId),
      });
    },
  });
};

// Get nutrient balance
export const useNutrientBalance = (fieldId: number, enabled: boolean = true) =>
  useQuery<NutrientBalance, ApiError>({
    queryKey: FERTILIZER_KEYS.balance(fieldId),
    queryFn: () => fertilizerApi.getNutrientBalance(fieldId),
    enabled: enabled && !!fieldId,
  });

// Analyze nutrient deficit
export const useNutrientDeficit = (fieldId: number, enabled: boolean = true) =>
  useQuery<NutrientDeficitAnalysis, ApiError>({
    queryKey: FERTILIZER_KEYS.deficit(fieldId),
    queryFn: () => fertilizerApi.analyzeNutrientDeficit(fieldId),
    enabled: enabled && !!fieldId,
  });
