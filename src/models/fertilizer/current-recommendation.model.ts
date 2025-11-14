import type { NutrientRequirement } from './nutrient-requirement.model';
import type { FertilizerProduct } from './fertilizer-product.model';
import type { ApplicationMethod } from './fertilizer-application.model';

export const RecommendationPriority = {
  Low: 'Низький',
  Medium: 'Середній',
  High: 'Високий',
  Critical: 'Критичний',
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

export interface CurrentRecommendation {
  fieldId: number;
  fieldName: string | null;
  date: string; // ISO DateTime
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
  weatherConsiderations?: string | null;
  nextRecommendedDate?: string | null; // ISO DateTime
}
