import Agent from '@/app/api/agent.api';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
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

/**
 * Fertilizer Applications API
 * Handles recording, managing, and querying fertilizer applications
 */
export const fertilizerApplicationsApi = {
  /**
   * Record a new fertilizer application
   * POST /fertilizer/applications
   */
  recordApplication: async (
    data: RecordApplicationRequest,
  ): Promise<number> => {
    return await Agent.post<number>(
      API_ROUTES.FERTILIZER.APPLICATION.RECORD_APP,
      data,
    );
  },

  /**
   * Get application history for a field
   * GET /fertilizer/applications/history
   */
  getApplicationHistory: async (
    fieldId: number,
    fromDate?: string,
    toDate?: string,
    pageNumber: number = 1,
    pageSize: number = 20,
  ): Promise<FertilizerApplicationRecordDto[]> => {
    const params = new URLSearchParams({
      fieldId: String(fieldId),
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });
    if (fromDate) {
      params.append('fromDate', fromDate);
    }
    if (toDate) {
      params.append('toDate', toDate);
    }
    return await Agent.get<FertilizerApplicationRecordDto[]>(
      API_ROUTES.FERTILIZER.APPLICATION.GET_APP_HISTORY,
      params,
    );
  },

  /**
   * Get a specific application record by ID
   * GET /fertilizer/applications/{recordId}
   */
  getApplicationRecord: async (
    recordId: number,
  ): Promise<FertilizerApplicationRecordDto> => {
    return await Agent.get<FertilizerApplicationRecordDto>(
      `${API_ROUTES.FERTILIZER.APPLICATION.GET_APP_RECORD}/${recordId}`,
    );
  },

  /**
   * Update an existing application record
   * PUT /fertilizer/applications/{recordId}
   */
  updateApplicationRecord: async (
    recordId: number,
    data: UpdateApplicationRecordDto,
  ): Promise<void> => {
    return await Agent.put<void>(
      `${API_ROUTES.FERTILIZER.APPLICATION.UPDATE_APP_RECORD}/${recordId}`,
      data,
    );
  },

  /**
   * Delete an application record
   * DELETE /fertilizer/applications/{recordId}
   */
  deleteApplicationRecord: async (recordId: number): Promise<void> => {
    return await Agent.delete<void>(
      `${API_ROUTES.FERTILIZER.APPLICATION.DELETE_APP_RECORD}/${recordId}`,
    );
  },

  /**
   * Get application summary for a field within a date range
   * GET /fertilizer/applications/summary
   */
  getApplicationSummary: async (
    fieldId: number,
    fromDate: string,
    toDate: string,
  ): Promise<NutrientApplicationSummary> => {
    return await Agent.get<NutrientApplicationSummary>(
      API_ROUTES.FERTILIZER.APPLICATION.GET_APP_SUMMARY,
      new URLSearchParams({
        fieldId: String(fieldId),
        fromDate,
        toDate,
      }),
    );
  },

  /**
   * Get saved fertilizer plans for a field
   * GET /fertilizer/applications/plans
   */
  getSavedPlans: async (
    fieldId: number,
    includeCompleted: boolean = false,
  ): Promise<SeasonFertilizerPlan[]> => {
    return await Agent.get<SeasonFertilizerPlan[]>(
      API_ROUTES.FERTILIZER.APPLICATION.GET_SAVED_PLANS,
      new URLSearchParams({
        fieldId: String(fieldId),
        includeCompleted: String(includeCompleted),
      }),
    );
  },

  /**
   * Get upcoming fertilizer applications
   * GET /fertilizer/applications/upcoming
   */
  getUpcomingApplications: async (
    fieldId: number,
    daysAhead: number = 14,
  ): Promise<FertilizerApplication[]> => {
    return await Agent.get<FertilizerApplication[]>(
      API_ROUTES.FERTILIZER.APPLICATION.GET_UPCOMING,
      new URLSearchParams({
        fieldId: String(fieldId),
        daysAhead: String(daysAhead),
      }),
    );
  },

  /**
   * Get applications by date range
   * GET /fertilizer/applications/date-range
   */
  getApplicationsByDateRange: async (
    fieldId: number,
    startDate: string,
    endDate: string,
  ): Promise<FertilizerApplication[]> => {
    return await Agent.get<FertilizerApplication[]>(
      API_ROUTES.FERTILIZER.APPLICATION.GET_BY_DATE_RANGE,
      new URLSearchParams({
        fieldId: String(fieldId),
        startDate,
        endDate,
      }),
    );
  },

  /**
   * Update an application plan
   * PUT /fertilizer/applications/plans/{planId}
   */
  updateApplicationPlan: async (
    planId: number,
    data: UpdateApplicationPlanDto,
  ): Promise<void> => {
    return await Agent.put<void>(
      `${API_ROUTES.FERTILIZER.APPLICATION.UPDATE_PLAN}/${planId}`,
      data,
    );
  },

  /**
   * Mark an application plan as complete
   * POST /fertilizer/applications/plans/{planId}/complete
   */
  completeApplicationPlan: async (
    planId: number,
    data: CompleteApplicationRequest,
  ): Promise<void> => {
    return await Agent.post<void>(
      `${API_ROUTES.FERTILIZER.APPLICATION.COMPLETE_PLAN}/${planId}/complete`,
      data,
    );
  },

  /**
   * Delete a saved application plan
   * DELETE /fertilizer/applications/plans/{planId}
   */
  deleteApplicationPlan: async (planId: number): Promise<void> => {
    return await Agent.delete<void>(
      `${API_ROUTES.FERTILIZER.APPLICATION.DELETE_PLAN}/${planId}`,
    );
  },
};
