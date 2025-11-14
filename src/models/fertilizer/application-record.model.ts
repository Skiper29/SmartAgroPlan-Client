/**
 * Product used in an application record
 */
export interface ApplicationRecordProductDto {
  id: number;
  applicationRecordId: number;
  fertilizerProductId: number;
  productName: string | null;
  quantityUsedKg: number;
}

/**
 * Detailed fertilizer application record
 */
export interface FertilizerApplicationRecordDto {
  id: number;
  fieldId: number;
  applicationPlanId: number | null;
  applicationDate: string; // ISO DateTime
  recordedDate: string; // ISO DateTime
  appliedNitrogen: number;
  appliedPhosphorus: number;
  appliedPotassium: number;
  appliedSulfur: number;
  appliedCalcium: number;
  appliedMagnesium: number;
  appliedBoron: number;
  appliedZinc: number;
  appliedManganese: number;
  appliedCopper: number;
  appliedIron: number;
  appliedMolybdenum: number;
  applicationMethodId: number;
  applicationMethodName: string | null;
  notes: string | null;
  temperatureC: number | null;
  windSpeedKmh: number | null;
  humidity: number | null;
  productsUsed: ApplicationRecordProductDto[];
}

/**
 * DTO for updating an application record
 */
export interface UpdateApplicationRecordDto {
  applicationDate: string;
  productsUsed: Record<number, number>; // Product ID -> quantity in kg/ha
  applicationMethodId: number;
  notes?: string | null;
  temperatureC?: number | null;
  windSpeedKmh?: number | null;
  humidity?: number | null;
}
