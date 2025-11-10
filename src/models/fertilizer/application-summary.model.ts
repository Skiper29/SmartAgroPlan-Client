import type { NutrientRequirement } from './nutrient-requirement.model';

export interface ApplicationSummaryItem {
  id: number;
  date: string;
  isCompleted: boolean;
  stage: string;
  nutrients: Partial<NutrientRequirement>;
}

export interface NutrientApplicationSummary {
  fieldId: number;
  fieldName: string;
  fromDate: string;
  toDate: string;
  totalApplied: NutrientRequirement;
  plannedToApply: NutrientRequirement;
  completedApplications: number;
  pendingApplications: number;
  applications: ApplicationSummaryItem[];
}
