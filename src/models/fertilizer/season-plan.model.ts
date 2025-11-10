import type { NutrientRequirement } from './nutrient-requirement.model';
import type { FertilizerApplication } from './fertilizer-application.model';

export interface SeasonFertilizerPlan {
  fieldId: number;
  cropName: string;
  fieldName: string;
  sowingDate: string;
  expectedHarvestDate: string;
  planGeneratedDate: string;
  totalSeasonRequirement: NutrientRequirement;
  soilSupply: NutrientRequirement;
  requiredFromFertilizer: NutrientRequirement;
  alreadyApplied: NutrientRequirement;
  remainingToApply: NutrientRequirement;
  applications: FertilizerApplication[];
  fieldAreaHa: number;
  expectedYield: number;
  notes?: string;
  isSaved: boolean;
  savedPlanId?: number | null;
}

export interface SaveSeasonPlanRequest {
  fieldId: number;
  targetYield: number;
  sowingDate: string;
}
