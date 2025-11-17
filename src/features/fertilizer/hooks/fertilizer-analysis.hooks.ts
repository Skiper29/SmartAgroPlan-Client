import { useQuery } from '@tanstack/react-query';
import { fertilizerAnalysisApi } from '@/features/fertilizer/api';
import type {
  NutrientBalance,
  NutrientDeficitAnalysis,
} from '@/models/fertilizer';
import type { ApiError } from '@/types/api-error.type';

/**
 * Query keys for fertilizer analysis
 */
export const FERTILIZER_ANALYSIS_KEYS = {
  all: ['fertilizer', 'analysis'] as const,
  balances: () => [...FERTILIZER_ANALYSIS_KEYS.all, 'balances'] as const,
  balance: (fieldId: number) =>
    [...FERTILIZER_ANALYSIS_KEYS.balances(), fieldId] as const,
  deficits: () => [...FERTILIZER_ANALYSIS_KEYS.all, 'deficits'] as const,
  deficit: (fieldId: number) =>
    [...FERTILIZER_ANALYSIS_KEYS.deficits(), fieldId] as const,
};

/**
 * Hook to get nutrient balance for a field
 * @param fieldId - Field ID
 * @param enabled - Whether the query is enabled
 */
export const useNutrientBalance = (
  fieldId: number,
  enabled: boolean = true,
) => {
  return useQuery<NutrientBalance, ApiError>({
    queryKey: FERTILIZER_ANALYSIS_KEYS.balance(fieldId),
    queryFn: () => fertilizerAnalysisApi.getNutrientBalance(fieldId),
    enabled: enabled && !!fieldId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to analyze nutrient deficit for a field
 * @param fieldId - Field ID
 * @param enabled - Whether the query is enabled
 */
export const useNutrientDeficit = (
  fieldId: number,
  enabled: boolean = true,
) => {
  return useQuery<NutrientDeficitAnalysis, ApiError>({
    queryKey: FERTILIZER_ANALYSIS_KEYS.deficit(fieldId),
    queryFn: () => fertilizerAnalysisApi.analyzeNutrientDeficit(fieldId),
    enabled: enabled && !!fieldId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
