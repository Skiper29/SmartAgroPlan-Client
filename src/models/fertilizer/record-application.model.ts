/**
 * Request to record a fertilizer application
 */
export interface RecordApplicationRequest {
  fieldId: number;
  applicationDate: string; // ISO DateTime
  applicationMethodId: number;
  productsUsed: Record<number, number>; // Product ID -> quantity in kg/ha
  applicationPlanId?: number | null;
  notes?: string | null;
  temperature?: number | null; // Celsius
  windSpeed?: number | null; // km/h
  humidity?: number | null; // %
}
