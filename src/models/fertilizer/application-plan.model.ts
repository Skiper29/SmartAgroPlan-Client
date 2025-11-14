/**
 * DTO for updating an application plan
 */
export interface UpdateApplicationPlanDto {
  plannedApplicationDate: string;
  plannedNitrogen: number;
  plannedPhosphorus: number;
  plannedPotassium: number;
  plannedSulfur: number;
  plannedCalcium?: number;
  plannedMagnesium?: number;
  plannedBoron?: number;
  plannedZinc?: number;
  plannedManganese?: number;
  plannedCopper?: number;
  plannedIron?: number;
  plannedMolybdenum?: number;
  notes?: string | null;
}

/**
 * Request to complete an application plan
 */
export interface CompleteApplicationRequest {
  actualDate: string; // ISO DateTime
}
