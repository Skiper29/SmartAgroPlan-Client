/**
 * Fertilizer API Module
 * Centralized exports for all fertilizer-related API endpoints
 */

// Controller-based API exports
export { fertilizerPlanningApi } from './fertilizer-planning.api';
export { fertilizerApplicationsApi } from './fertilizer-applications.api';
export { fertilizerCalculationsApi } from './fertilizer-calculations.api';
export { fertilizerAnalysisApi } from './fertilizer-analysis.api';
export { fertilizerProductsApi } from './fertilizer-products.api';

// Legacy unified API (for backward compatibility)
export { fertilizerApi } from './fertilizer.api';
