import Agent from '@/app/api/agent.api';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
import type {
  SeasonFertilizerPlan,
  SaveSeasonPlanRequest,
  CurrentRecommendation,
} from '@/models/fertilizer';

/**
 * Fertilizer Planning API
 * Handles season planning and current recommendations
 */
export const fertilizerPlanningApi = {
  /**
   * Calculate season fertilizer plan for a field
   * GET /fertilizer/planning/season-plan
   */
  calculateSeasonPlan: async (
    fieldId: number,
    targetYield?: number,
    sowingDate?: string,
  ): Promise<SeasonFertilizerPlan> => {
    const params = new URLSearchParams({ fieldId: String(fieldId) });
    if (targetYield !== undefined) {
      params.append('targetYield', String(targetYield));
    }
    if (sowingDate) {
      params.append('sowingDate', sowingDate);
    }
    return await Agent.get<SeasonFertilizerPlan>(
      API_ROUTES.FERTILIZER.PLANNING.CALCULATE_PLAN,
      params,
    );
  },

  /**
   * Save a season fertilizer plan
   * POST /fertilizer/planning/season-plan
   */
  saveSeasonPlan: async (data: SaveSeasonPlanRequest): Promise<number> => {
    return await Agent.post<number>(
      API_ROUTES.FERTILIZER.PLANNING.SAVE_PLAN,
      data,
    );
  },

  /**
   * Get current fertilizer recommendation for a field
   * GET /fertilizer/planning/current-recommendation
   */
  getCurrentRecommendation: async (
    fieldId: number,
  ): Promise<CurrentRecommendation> => {
    return await Agent.get<CurrentRecommendation>(
      API_ROUTES.FERTILIZER.PLANNING.GET_CURRENT_REC,
      new URLSearchParams({ fieldId: String(fieldId) }),
    );
  },
};
