import Agent from '@/app/api/agent.api';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
import type {
  NutrientRequirement,
  OptimizeProductsRequest,
  ProductRecommendationDto,
} from '@/models/fertilizer';

/**
 * Fertilizer Calculations API
 * Handles nutrient calculations and product optimizations
 */
export const fertilizerCalculationsApi = {
  /**
   * Calculate nutrient requirements for a field
   * GET /fertilizer/calculations/nutrient-requirement
   */
  calculateNutrientRequirement: async (
    fieldId: number,
    targetYield?: number,
  ): Promise<NutrientRequirement> => {
    const params = new URLSearchParams({ fieldId: String(fieldId) });
    if (targetYield !== undefined) {
      params.append('targetYield', String(targetYield));
    }
    return await Agent.get<NutrientRequirement>(
      API_ROUTES.FERTILIZER.CALCULATIONS.CALCULATE_REQ,
      params,
    );
  },

  /**
   * Calculate soil nutrient supply for a field
   * GET /fertilizer/calculations/soil-nutrient-supply
   */
  calculateSoilNutrientSupply: async (
    fieldId: number,
  ): Promise<NutrientRequirement> => {
    return await Agent.get<NutrientRequirement>(
      API_ROUTES.FERTILIZER.CALCULATIONS.CALCULATE_SOIL_SUPPLY,
      new URLSearchParams({ fieldId: String(fieldId) }),
    );
  },

  /**
   * Optimize fertilizer product selection
   * POST /fertilizer/calculations/optimize-products
   */
  optimizeProducts: async (
    data: OptimizeProductsRequest,
  ): Promise<ProductRecommendationDto> => {
    return await Agent.post<ProductRecommendationDto>(
      API_ROUTES.FERTILIZER.CALCULATIONS.OPTIMIZE_PRODUCTS,
      data,
    );
  },
};
