import Agent from '@/app/api/agent.api';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
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

export const fertilizerApi = {
  // Calculate season fertilizer plan
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
      API_ROUTES.FERTILIZER_PLANNING.CALCULATE_PLAN,
      params,
    );
  },

  // Save season plan
  saveSeasonPlan: async (data: SaveSeasonPlanRequest): Promise<number> => {
    return await Agent.post<number>(
      API_ROUTES.FERTILIZER_PLANNING.SAVE_PLAN,
      data,
    );
  },

  // Get current recommendation for a field
  getCurrentRecommendation: async (
    fieldId: number,
  ): Promise<CurrentRecommendation> => {
    return await Agent.get<CurrentRecommendation>(
      API_ROUTES.FERTILIZER_PLANNING.GET_CURRENT_REC,
      new URLSearchParams({ fieldId: String(fieldId) }),
    );
  },

  // Get upcoming applications
  getUpcomingApplications: async (
    fieldId: number,
    daysAhead: number = 14,
  ): Promise<FertilizerApplication[]> => {
    return await Agent.get<FertilizerApplication[]>(
      API_ROUTES.FERTILIZER_PLANNING.GET_UPCOMING,
      new URLSearchParams({
        fieldId: String(fieldId),
        daysAhead: String(daysAhead),
      }),
    );
  },

  // Get applications by date range
  getApplicationsByDateRange: async (
    fieldId: number,
    startDate: string,
    endDate: string,
  ): Promise<FertilizerApplication[]> => {
    return await Agent.get<FertilizerApplication[]>(
      API_ROUTES.FERTILIZER_PLANNING.GET_BY_DATE_RANGE,
      new URLSearchParams({
        fieldId: String(fieldId),
        startDate,
        endDate,
      }),
    );
  },

  // Get application summary
  getApplicationSummary: async (
    fieldId: number,
    fromDate: string,
    toDate: string,
  ): Promise<NutrientApplicationSummary> => {
    return await Agent.get<NutrientApplicationSummary>(
      API_ROUTES.FERTILIZER_PLANNING.GET_SUMMARY,
      new URLSearchParams({
        fieldId: String(fieldId),
        fromDate,
        toDate,
      }),
    );
  },

  // Record an application
  recordApplication: async (
    data: RecordApplicationRequest,
  ): Promise<number> => {
    return await Agent.post<number>(
      API_ROUTES.FERTILIZER_PLANNING.RECORD_APP,
      data,
    );
  },

  // Get nutrient balance
  getNutrientBalance: async (fieldId: number): Promise<NutrientBalance> => {
    return await Agent.get<NutrientBalance>(
      API_ROUTES.FERTILIZER_PLANNING.GET_BALANCE,
      new URLSearchParams({ fieldId: String(fieldId) }),
    );
  },

  // Analyze nutrient deficit
  analyzeNutrientDeficit: async (
    fieldId: number,
  ): Promise<NutrientDeficitAnalysis> => {
    return await Agent.get<NutrientDeficitAnalysis>(
      API_ROUTES.FERTILIZER_PLANNING.GET_DEFICIT,
      new URLSearchParams({ fieldId: String(fieldId) }),
    );
  },
};
