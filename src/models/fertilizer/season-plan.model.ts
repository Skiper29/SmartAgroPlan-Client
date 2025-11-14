import type { NutrientRequirement } from './nutrient-requirement.model';
import type { FertilizerApplication } from './fertilizer-application.model';

export interface SeasonFertilizerPlan {
  fieldId: number;
  cropName: string | null;
  fieldName: string | null;
  sowingDate: string; // ISO DateTime
  expectedHarvestDate: string; // ISO DateTime
  planGeneratedDate: string; // ISO DateTime
  totalSeasonRequirement: NutrientRequirement;
  soilSupply: NutrientRequirement;
  requiredFromFertilizer: NutrientRequirement;
  alreadyApplied: NutrientRequirement;
  remainingToApply: NutrientRequirement;
  applications: FertilizerApplication[];
  fieldAreaHa: number;
  expectedYield: number; // tons/ha
  notes?: string | null;
  isSaved: boolean;
  savedPlanId?: number | null;
}

export interface SaveSeasonPlanRequest {
  fieldId: number;
  targetYield: number; // tons/ha
  sowingDate: string; // ISO DateTime
}
