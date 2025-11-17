import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fertilizerApplicationsApi } from '@/features/fertilizer/api';
import type {
  FertilizerApplication,
  RecordApplicationRequest,
  FertilizerApplicationRecordDto,
  UpdateApplicationRecordDto,
  NutrientApplicationSummary,
  SeasonFertilizerPlan,
  UpdateApplicationPlanDto,
  CompleteApplicationRequest,
} from '@/models/fertilizer';
import type { ApiError } from '@/types/api-error.type';

/**
 * Query keys for fertilizer applications
 */
export const FERTILIZER_APPLICATIONS_KEYS = {
  all: ['fertilizer', 'applications'] as const,
  history: () => [...FERTILIZER_APPLICATIONS_KEYS.all, 'history'] as const,
  historyByField: (
    fieldId: number,
    fromDate?: string,
    toDate?: string,
    pageNumber?: number,
    pageSize?: number,
  ) =>
    [
      ...FERTILIZER_APPLICATIONS_KEYS.history(),
      { fieldId, fromDate, toDate, pageNumber, pageSize },
    ] as const,
  records: () => [...FERTILIZER_APPLICATIONS_KEYS.all, 'records'] as const,
  record: (recordId: number) =>
    [...FERTILIZER_APPLICATIONS_KEYS.records(), recordId] as const,
  summaries: () => [...FERTILIZER_APPLICATIONS_KEYS.all, 'summaries'] as const,
  summary: (fieldId: number, fromDate: string, toDate: string) =>
    [
      ...FERTILIZER_APPLICATIONS_KEYS.summaries(),
      { fieldId, fromDate, toDate },
    ] as const,
  savedPlans: () =>
    [...FERTILIZER_APPLICATIONS_KEYS.all, 'saved-plans'] as const,
  savedPlansByField: (fieldId: number, includeCompleted?: boolean) =>
    [
      ...FERTILIZER_APPLICATIONS_KEYS.savedPlans(),
      { fieldId, includeCompleted },
    ] as const,
  upcoming: () => [...FERTILIZER_APPLICATIONS_KEYS.all, 'upcoming'] as const,
  upcomingByField: (fieldId: number, daysAhead?: number) =>
    [
      ...FERTILIZER_APPLICATIONS_KEYS.upcoming(),
      { fieldId, daysAhead },
    ] as const,
  dateRange: () => [...FERTILIZER_APPLICATIONS_KEYS.all, 'date-range'] as const,
  dateRangeByField: (fieldId: number, startDate: string, endDate: string) =>
    [
      ...FERTILIZER_APPLICATIONS_KEYS.dateRange(),
      { fieldId, startDate, endDate },
    ] as const,
};

/**
 * Hook to record a new fertilizer application
 */
export const useRecordApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, RecordApplicationRequest>({
    mutationFn: (data: RecordApplicationRequest) =>
      fertilizerApplicationsApi.recordApplication(data),
    onSuccess: () => {
      // Invalidate all application-related queries for the field
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.history(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.summaries(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.upcoming(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.dateRange(),
      });
      // Invalidate planning and analysis queries
      queryClient.invalidateQueries({
        queryKey: ['fertilizer', 'planning', 'current-recommendations'],
      });
      queryClient.invalidateQueries({
        queryKey: ['fertilizer', 'analysis'],
      });
    },
  });
};

/**
 * Hook to get application history for a field
 * @param fieldId - Field ID
 * @param fromDate - Optional start date filter
 * @param toDate - Optional end date filter
 * @param pageNumber - Page number (default: 1)
 * @param pageSize - Page size (default: 20)
 * @param enabled - Whether the query is enabled
 */
export const useApplicationHistory = (
  fieldId: number,
  fromDate?: string,
  toDate?: string,
  pageNumber: number = 1,
  pageSize: number = 20,
  enabled: boolean = true,
) => {
  return useQuery<FertilizerApplicationRecordDto[], ApiError>({
    queryKey: FERTILIZER_APPLICATIONS_KEYS.historyByField(
      fieldId,
      fromDate,
      toDate,
      pageNumber,
      pageSize,
    ),
    queryFn: () =>
      fertilizerApplicationsApi.getApplicationHistory(
        fieldId,
        fromDate,
        toDate,
        pageNumber,
        pageSize,
      ),
    enabled: enabled && !!fieldId,
    staleTime: 60 * 1000, // 1 minute
  });
};

/**
 * Hook to get a specific application record by ID
 * @param recordId - Application record ID
 * @param enabled - Whether the query is enabled
 */
export const useApplicationRecord = (
  recordId: number,
  enabled: boolean = true,
) => {
  return useQuery<FertilizerApplicationRecordDto, ApiError>({
    queryKey: FERTILIZER_APPLICATIONS_KEYS.record(recordId),
    queryFn: () => fertilizerApplicationsApi.getApplicationRecord(recordId),
    enabled: enabled && !!recordId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to update an existing application record
 */
export const useUpdateApplicationRecord = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ApiError,
    { recordId: number; data: UpdateApplicationRecordDto }
  >({
    mutationFn: ({ recordId, data }) =>
      fertilizerApplicationsApi.updateApplicationRecord(recordId, data),
    onSuccess: (_result, variables) => {
      // Invalidate the specific record and related queries
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.record(variables.recordId),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.history(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.summaries(),
      });
      queryClient.invalidateQueries({
        queryKey: ['fertilizer', 'analysis'],
      });
    },
  });
};

/**
 * Hook to delete an application record
 */
export const useDeleteApplicationRecord = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (recordId: number) =>
      fertilizerApplicationsApi.deleteApplicationRecord(recordId),
    onSuccess: (_result, recordId) => {
      // Invalidate the specific record and related queries
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.record(recordId),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.history(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.summaries(),
      });
      queryClient.invalidateQueries({
        queryKey: ['fertilizer', 'analysis'],
      });
    },
  });
};

/**
 * Hook to get application summary for a field within a date range
 * @param fieldId - Field ID
 * @param fromDate - Start date
 * @param toDate - End date
 * @param enabled - Whether the query is enabled
 */
export const useApplicationSummary = (
  fieldId: number,
  fromDate: string,
  toDate: string,
  enabled: boolean = true,
) => {
  return useQuery<NutrientApplicationSummary, ApiError>({
    queryKey: FERTILIZER_APPLICATIONS_KEYS.summary(fieldId, fromDate, toDate),
    queryFn: () =>
      fertilizerApplicationsApi.getApplicationSummary(
        fieldId,
        fromDate,
        toDate,
      ),
    enabled: enabled && !!fieldId && !!fromDate && !!toDate,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to get saved fertilizer plans for a field
 * @param fieldId - Field ID
 * @param includeCompleted - Whether to include completed plans (default: false)
 * @param enabled - Whether the query is enabled
 */
export const useSavedPlans = (
  fieldId: number,
  includeCompleted: boolean = false,
  enabled: boolean = true,
) => {
  return useQuery<SeasonFertilizerPlan[], ApiError>({
    queryKey: FERTILIZER_APPLICATIONS_KEYS.savedPlansByField(
      fieldId,
      includeCompleted,
    ),
    queryFn: () =>
      fertilizerApplicationsApi.getSavedPlans(fieldId, includeCompleted),
    enabled: enabled && !!fieldId,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

/**
 * Hook to get upcoming fertilizer applications
 * @param fieldId - Field ID
 * @param daysAhead - Number of days to look ahead (default: 14)
 * @param enabled - Whether the query is enabled
 */
export const useUpcomingApplications = (
  fieldId: number,
  daysAhead: number = 14,
  enabled: boolean = true,
) => {
  return useQuery<FertilizerApplication[], ApiError>({
    queryKey: FERTILIZER_APPLICATIONS_KEYS.upcomingByField(fieldId, daysAhead),
    queryFn: () =>
      fertilizerApplicationsApi.getUpcomingApplications(fieldId, daysAhead),
    enabled: enabled && !!fieldId,
    staleTime: 60 * 1000, // 1 minute
  });
};

/**
 * Hook to get applications by date range
 * @param fieldId - Field ID
 * @param startDate - Start date
 * @param endDate - End date
 * @param enabled - Whether the query is enabled
 */
export const useApplicationsByDateRange = (
  fieldId: number,
  startDate: string,
  endDate: string,
  enabled: boolean = true,
) => {
  return useQuery<FertilizerApplication[], ApiError>({
    queryKey: FERTILIZER_APPLICATIONS_KEYS.dateRangeByField(
      fieldId,
      startDate,
      endDate,
    ),
    queryFn: () =>
      fertilizerApplicationsApi.getApplicationsByDateRange(
        fieldId,
        startDate,
        endDate,
      ),
    enabled: enabled && !!fieldId && !!startDate && !!endDate,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to update an application plan
 */
export const useUpdateApplicationPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ApiError,
    { planId: number; data: UpdateApplicationPlanDto }
  >({
    mutationFn: ({ planId, data }) =>
      fertilizerApplicationsApi.updateApplicationPlan(planId, data),
    onSuccess: () => {
      // Invalidate saved plans and related queries
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.savedPlans(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.upcoming(),
      });
      queryClient.invalidateQueries({
        queryKey: ['fertilizer', 'planning'],
      });
    },
  });
};

/**
 * Hook to mark an application plan as complete
 */
export const useCompleteApplicationPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ApiError,
    { planId: number; data: CompleteApplicationRequest }
  >({
    mutationFn: ({ planId, data }) =>
      fertilizerApplicationsApi.completeApplicationPlan(planId, data),
    onSuccess: () => {
      // Invalidate saved plans and related queries
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.savedPlans(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.upcoming(),
      });
      queryClient.invalidateQueries({
        queryKey: ['fertilizer', 'planning'],
      });
    },
  });
};

/**
 * Hook to delete a saved application plan
 */
export const useDeleteApplicationPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (planId: number) =>
      fertilizerApplicationsApi.deleteApplicationPlan(planId),
    onSuccess: () => {
      // Invalidate saved plans
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_APPLICATIONS_KEYS.savedPlans(),
      });
    },
  });
};
