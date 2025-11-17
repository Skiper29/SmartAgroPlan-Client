/**
 * Fertilizer Hooks Module
 * Centralized exports for all fertilizer-related React Query hooks
 */

// Planning hooks
export {
  useCalculateSeasonPlan,
  useSaveSeasonPlan,
  useCurrentRecommendation,
  FERTILIZER_PLANNING_KEYS,
} from './fertilizer-planning.hooks';

// Application hooks
export {
  useRecordApplication,
  useApplicationHistory,
  useApplicationRecord,
  useUpdateApplicationRecord,
  useDeleteApplicationRecord,
  useApplicationSummary,
  useSavedPlans,
  useUpcomingApplications,
  useApplicationsByDateRange,
  useUpdateApplicationPlan,
  useCompleteApplicationPlan,
  useDeleteApplicationPlan,
  FERTILIZER_APPLICATIONS_KEYS,
} from './fertilizer-applications.hooks';

// Calculation hooks
export {
  useCalculateNutrientRequirement,
  useCalculateSoilNutrientSupply,
  useOptimizeProducts,
  FERTILIZER_CALCULATIONS_KEYS,
} from './fertilizer-calculations.hooks';

// Analysis hooks
export {
  useNutrientBalance,
  useNutrientDeficit,
  FERTILIZER_ANALYSIS_KEYS,
} from './fertilizer-analysis.hooks';

// Product hooks
export {
  useAllProducts,
  useProductsByType,
  useSearchProducts,
  useProductById,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  FERTILIZER_PRODUCTS_KEYS,
} from './fertilizer-products.hooks';
