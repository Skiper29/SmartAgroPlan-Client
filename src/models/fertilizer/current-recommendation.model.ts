import type { NutrientRequirement } from './nutrient-requirement.model';
import type { FertilizerProduct } from './fertilizer-product.model';
import type { ApplicationMethod } from './fertilizer-application.model';

export const RecommendationPriority = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Critical: 'Critical',
} as const;

export type RecommendationPriority =
  (typeof RecommendationPriority)[keyof typeof RecommendationPriority];

export const RecommendationPriorityLabels: Record<
  RecommendationPriority,
  string
> = {
  [RecommendationPriority.Low]: 'Низький',
  [RecommendationPriority.Medium]: 'Середній',
  [RecommendationPriority.High]: 'Високий',
  [RecommendationPriority.Critical]: 'Критичний',
};

export const RecommendationPriorityColors: Record<
  RecommendationPriority,
  string
> = {
  [RecommendationPriority.Low]: 'text-green-600',
  [RecommendationPriority.Medium]: 'text-yellow-600',
  [RecommendationPriority.High]: 'text-orange-600',
  [RecommendationPriority.Critical]: 'text-red-600',
};

export interface CurrentRecommendation {
  fieldId: number;
  fieldName: string;
  date: string;
  currentStage: string;
  daysAfterPlanting: number;
  daysToHarvest: number;
  shouldApplyNow: boolean;
  recommendedNutrients: NutrientRequirement;
  products: FertilizerProduct[];
  applicationMethod: ApplicationMethod | string;
  priority: RecommendationPriority | string;
  reasoning: string;
  warnings?: string[];
  weatherConsiderations?: string;
  nextRecommendedDate?: string;
}
