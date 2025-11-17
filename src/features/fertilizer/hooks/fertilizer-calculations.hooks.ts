import { useMutation, useQuery } from '@tanstack/react-query';
import { fertilizerCalculationsApi } from '@/features/fertilizer/api';
import type {
  NutrientRequirement,
  OptimizeProductsRequest,
  ProductRecommendationDto,
} from '@/models/fertilizer';
import type { ApiError } from '@/types/api-error.type';

/**
 * Query keys for fertilizer calculations
 */
export const FERTILIZER_CALCULATIONS_KEYS = {
  all: ['fertilizer', 'calculations'] as const,
  nutrientRequirements: () =>
    [...FERTILIZER_CALCULATIONS_KEYS.all, 'nutrient-requirements'] as const,
  nutrientRequirement: (fieldId: number, targetYield?: number) =>
    [
      ...FERTILIZER_CALCULATIONS_KEYS.nutrientRequirements(),
      { fieldId, targetYield },
    ] as const,
  soilSupplies: () =>
    [...FERTILIZER_CALCULATIONS_KEYS.all, 'soil-supplies'] as const,
  soilSupply: (fieldId: number) =>
    [...FERTILIZER_CALCULATIONS_KEYS.soilSupplies(), fieldId] as const,
  productOptimizations: () =>
    [...FERTILIZER_CALCULATIONS_KEYS.all, 'product-optimizations'] as const,
};

/**
 * Hook to calculate nutrient requirements for a field
 * @param fieldId - Field ID
 * @param targetYield - Optional target yield
 * @param enabled - Whether the query is enabled
 */
export const useCalculateNutrientRequirement = (
  fieldId: number,
  targetYield?: number,
  enabled: boolean = true,
) => {
  return useQuery<NutrientRequirement, ApiError>({
    queryKey: FERTILIZER_CALCULATIONS_KEYS.nutrientRequirement(
      fieldId,
      targetYield,
    ),
    queryFn: () =>
      fertilizerCalculationsApi.calculateNutrientRequirement(
        fieldId,
        targetYield,
      ),
    enabled: enabled && !!fieldId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to calculate soil nutrient supply for a field
 * @param fieldId - Field ID
 * @param enabled - Whether the query is enabled
 */
export const useCalculateSoilNutrientSupply = (
  fieldId: number,
  enabled: boolean = true,
) => {
  return useQuery<NutrientRequirement, ApiError>({
    queryKey: FERTILIZER_CALCULATIONS_KEYS.soilSupply(fieldId),
    queryFn: () =>
      fertilizerCalculationsApi.calculateSoilNutrientSupply(fieldId),
    enabled: enabled && !!fieldId,
    staleTime: 10 * 60 * 1000, // 10 minutes - soil data doesn't change often
  });
};

/**
 * Hook to optimize fertilizer product selection
 * This is a mutation because it's a computational operation that doesn't need caching
 */
export const useOptimizeProducts = () => {
  return useMutation<
    ProductRecommendationDto,
    ApiError,
    OptimizeProductsRequest
  >({
    mutationFn: (data: OptimizeProductsRequest) =>
      fertilizerCalculationsApi.optimizeProducts(data),
  });
};
