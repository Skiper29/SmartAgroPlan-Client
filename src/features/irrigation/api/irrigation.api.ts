import { API_ROUTES } from '@/app/constants/api-routes.constants.ts';
import type { IrrigationRecommendation } from '@/models/irrigation/recommendation.model.ts';
import Agent from '@/app/api/agent.api.ts';
import type { WeeklyIrrigationSchedule } from '@/models/irrigation/schedule.model.ts';

interface BatchRecommendationsRequest {
  fieldIds: number[];
  date?: string | null;
}

export const irrigationApi = {
  // Get single field recommendation
  getRecommendation: async (
    fieldId: number,
    includeForecast: boolean = true,
    forecastDays: number = 7,
  ): Promise<IrrigationRecommendation> => {
    return await Agent.get<IrrigationRecommendation>(
      `${API_ROUTES.IRRIGATION.GET_RECOMMENDATION}/${fieldId}`,
      new URLSearchParams({
        includeForecast: String(includeForecast),
        forecastDays: String(forecastDays),
      }),
    );
  },
  // Get recommendations for multiple fields
  getBatchRecommendations: async (
    data: BatchRecommendationsRequest,
  ): Promise<IrrigationRecommendation[]> => {
    return await Agent.post<IrrigationRecommendation[]>(
      API_ROUTES.IRRIGATION.GET_BATCH_RECOMMENDATIONS,
      data,
    );
  },

  // Get weekly irrigation schedule for a field
  getWeeklySchedule: async (
    fieldId: number,
    startDate?: string | null,
  ): Promise<WeeklyIrrigationSchedule> => {
    return await Agent.get<WeeklyIrrigationSchedule>(
      `${API_ROUTES.IRRIGATION.GET_WEEKLY_SCHEDULE}/${fieldId}`,
      startDate ? new URLSearchParams({ startDate }) : undefined,
    );
  },
};
