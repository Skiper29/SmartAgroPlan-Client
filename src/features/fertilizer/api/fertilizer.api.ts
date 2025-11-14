/**
 * Legacy Fertilizer API
 * This file maintains backward compatibility by re-exporting methods from the new controller-based APIs.
 * For new code, prefer importing directly from the specific controller APIs:
 * - fertilizerPlanningApi
 * - fertilizerApplicationsApi
 * - fertilizerCalculationsApi
 * - fertilizerAnalysisApi
 * - fertilizerProductsApi
 */
import { fertilizerPlanningApi } from './fertilizer-planning.api';
import { fertilizerApplicationsApi } from './fertilizer-applications.api';
import { fertilizerAnalysisApi } from './fertilizer-analysis.api';

/**
 * @deprecated Use the new controller-based APIs instead.
 * This unified API is maintained for backward compatibility only.
 */
export const fertilizerApi = {
  // Planning methods
  calculateSeasonPlan: fertilizerPlanningApi.calculateSeasonPlan,
  saveSeasonPlan: fertilizerPlanningApi.saveSeasonPlan,
  getCurrentRecommendation: fertilizerPlanningApi.getCurrentRecommendation,

  // Application methods
  getUpcomingApplications: fertilizerApplicationsApi.getUpcomingApplications,
  getApplicationsByDateRange:
    fertilizerApplicationsApi.getApplicationsByDateRange,
  getApplicationSummary: fertilizerApplicationsApi.getApplicationSummary,
  recordApplication: fertilizerApplicationsApi.recordApplication,

  // Analysis methods
  getNutrientBalance: fertilizerAnalysisApi.getNutrientBalance,
  analyzeNutrientDeficit: fertilizerAnalysisApi.analyzeNutrientDeficit,
};
