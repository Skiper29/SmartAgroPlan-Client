import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fertilizerPlanningApi } from '@/features/fertilizer/api';
import type {
  SeasonFertilizerPlan,
  SaveSeasonPlanRequest,
  CurrentRecommendation,
} from '@/models/fertilizer';
import type { ApiError } from '@/types/api-error.type';

/**
 * Query keys for fertilizer planning
 */
export const FERTILIZER_PLANNING_KEYS = {
  all: ['fertilizer', 'planning'] as const,
  seasonPlans: () => [...FERTILIZER_PLANNING_KEYS.all, 'season-plans'] as const,
  seasonPlan: (fieldId: number, targetYield?: number, sowingDate?: string) =>
    [
      ...FERTILIZER_PLANNING_KEYS.seasonPlans(),
      { fieldId, targetYield, sowingDate },
    ] as const,
  currentRecommendations: () =>
    [...FERTILIZER_PLANNING_KEYS.all, 'current-recommendations'] as const,
  currentRecommendation: (fieldId: number) =>
    [...FERTILIZER_PLANNING_KEYS.currentRecommendations(), fieldId] as const,
};

/**
 * Hook to calculate season fertilizer plan for a field
 * @param fieldId - Field ID
 * @param targetYield - Optional target yield
 * @param sowingDate - Optional sowing date
 * @param enabled - Whether the query is enabled
 */
export const useCalculateSeasonPlan = (
  fieldId: number,
  targetYield?: number,
  sowingDate?: string,
  enabled: boolean = true,
) => {
  return useQuery<SeasonFertilizerPlan, ApiError>({
    queryKey: FERTILIZER_PLANNING_KEYS.seasonPlan(
      fieldId,
      targetYield,
      sowingDate,
    ),
    queryFn: () =>
      fertilizerPlanningApi.calculateSeasonPlan(
        fieldId,
        targetYield,
        sowingDate,
      ),
    enabled: enabled && !!fieldId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to save a season fertilizer plan
 */
export const useSaveSeasonPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, SaveSeasonPlanRequest>({
    mutationFn: (data: SaveSeasonPlanRequest) =>
      fertilizerPlanningApi.saveSeasonPlan(data),
    onSuccess: (_planId, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PLANNING_KEYS.seasonPlan(
          variables.fieldId,
          variables.targetYield,
          variables.sowingDate,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PLANNING_KEYS.currentRecommendation(
          variables.fieldId,
        ),
      });
      // Invalidate saved plans in applications
      queryClient.invalidateQueries({
        queryKey: ['fertilizer', 'applications', 'saved-plans'],
      });
    },
  });
};

/**
 * Hook to get current fertilizer recommendation for a field
 * @param fieldId - Field ID
 * @param enabled - Whether the query is enabled
 */
export const useCurrentRecommendation = (
  fieldId: number,
  enabled: boolean = true,
) => {
  return useQuery<CurrentRecommendation, ApiError>({
    queryKey: FERTILIZER_PLANNING_KEYS.currentRecommendation(fieldId),
    queryFn: () => fertilizerPlanningApi.getCurrentRecommendation(fieldId),
    enabled: enabled && !!fieldId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
