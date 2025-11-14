import Agent from '@/app/api/agent.api';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
import type {
  NutrientBalance,
  NutrientDeficitAnalysis,
} from '@/models/fertilizer';

/**
 * Fertilizer Analysis API
 * Handles nutrient balance and deficit analysis
 */
export const fertilizerAnalysisApi = {
  /**
   * Get nutrient balance for a field
   * GET /fertilizer/analysis/nutrient-balance
   */
  getNutrientBalance: async (fieldId: number): Promise<NutrientBalance> => {
    return await Agent.get<NutrientBalance>(
      API_ROUTES.FERTILIZER.ANALYSIS.GET_BALANCE,
      new URLSearchParams({ fieldId: String(fieldId) }),
    );
  },

  /**
   * Analyze nutrient deficit for a field
   * GET /fertilizer/analysis/nutrient-deficit
   */
  analyzeNutrientDeficit: async (
    fieldId: number,
  ): Promise<NutrientDeficitAnalysis> => {
    return await Agent.get<NutrientDeficitAnalysis>(
      API_ROUTES.FERTILIZER.ANALYSIS.GET_DEFICIT,
      new URLSearchParams({ fieldId: String(fieldId) }),
    );
  },
};
