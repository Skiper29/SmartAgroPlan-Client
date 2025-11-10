import type { NutrientRequirement } from './nutrient-requirement.model';

export const NutrientBalanceStatus = {
  Balanced: 'Balanced',
  Deficit: 'Deficit',
  Surplus: 'Surplus',
  CriticalDeficit: 'Critical Deficit',
} as const;

export type NutrientBalanceStatus =
  (typeof NutrientBalanceStatus)[keyof typeof NutrientBalanceStatus];

export const NutrientBalanceStatusLabels: Record<
  NutrientBalanceStatus,
  string
> = {
  [NutrientBalanceStatus.Balanced]: 'Збалансовано',
  [NutrientBalanceStatus.Deficit]: 'Дефіцит',
  [NutrientBalanceStatus.Surplus]: 'Надлишок',
  [NutrientBalanceStatus.CriticalDeficit]: 'Критичний дефіцит',
};

export const NutrientBalanceStatusColors: Record<
  NutrientBalanceStatus,
  string
> = {
  [NutrientBalanceStatus.Balanced]: 'bg-green-100 text-green-800',
  [NutrientBalanceStatus.Deficit]: 'bg-yellow-100 text-yellow-800',
  [NutrientBalanceStatus.Surplus]: 'bg-blue-100 text-blue-800',
  [NutrientBalanceStatus.CriticalDeficit]: 'bg-red-100 text-red-800',
};

export interface NutrientBalance {
  fieldId: number;
  fieldName: string;
  cropName: string;
  analysisDate: string;
  daysAfterPlanting: number;
  daysToHarvest: number;
  requiredForTargetYield: NutrientRequirement;
  availableInSoil: NutrientRequirement;
  alreadyApplied: NutrientRequirement;
  deficit: NutrientRequirement;
  surplus: NutrientRequirement;
  overallStatus: NutrientBalanceStatus | string;
  recommendations: string[];
  warnings?: string[];
}

export const DeficitUrgency = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Critical: 'Critical',
} as const;

export type DeficitUrgency =
  (typeof DeficitUrgency)[keyof typeof DeficitUrgency];

export const DeficitUrgencyLabels: Record<DeficitUrgency, string> = {
  [DeficitUrgency.Low]: 'Низька',
  [DeficitUrgency.Medium]: 'Середня',
  [DeficitUrgency.High]: 'Висока',
  [DeficitUrgency.Critical]: 'Критична',
};

export interface NutrientDeficit {
  nutrientName: string;
  deficitAmount: number;
  urgency: DeficitUrgency | string;
  symptoms: string;
}

export interface NutrientDeficitAnalysis {
  fieldId: number;
  fieldName: string;
  analysisDate: string;
  deficits: NutrientDeficit[];
  overallStatus: string;
  recommendations: string[];
}
