import type { NutrientRequirement } from './nutrient-requirement.model';

/**
 * Optimization strategies for product selection
 */
export const OptimizationStrategy = {
  Balanced: 'Balanced',
  CostEffective: 'CostEffective',
  PreciseNutrition: 'PreciseNutrition',
} as const;

export type OptimizationStrategy =
  (typeof OptimizationStrategy)[keyof typeof OptimizationStrategy];

export const OptimizationStrategyLabels: Record<OptimizationStrategy, string> =
  {
    [OptimizationStrategy.Balanced]: 'Збалансований',
    [OptimizationStrategy.CostEffective]: 'Економічний',
    [OptimizationStrategy.PreciseNutrition]: 'Точне живлення',
  };

/**
 * Request for optimizing product selection
 */
export interface OptimizeProductsRequest {
  targetNutrients: NutrientRequirement;
  fieldAreaHa: number;
  optimizationStrategy: OptimizationStrategy | string;
}

/**
 * Recommended product with quantities and nutrients provided
 */
export interface RecommendedProductDto {
  productId: number;
  productName: string;
  quantityKgPerHa: number;
  totalQuantityKg: number;
  nutrientsProvided: NutrientRequirement;
  applicationMethod: string;
  estimatedCost: number | null;
}

/**
 * Product recommendation result from optimization
 */
export interface ProductRecommendationDto {
  products: RecommendedProductDto[];
  totalCost: number;
  targetNutrients: NutrientRequirement;
  actualNutrients: NutrientRequirement;
  optimizationStrategy: string;
}
