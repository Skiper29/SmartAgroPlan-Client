export interface RecordApplicationRequest {
  fieldId: number;
  applicationDate: string;
  applicationMethodId: number;
  productsUsed: Record<string, number>; // Product ID -> quantity in kg/ha
  applicationPlanId?: number;
  notes?: string;
  temperature?: number;
  windSpeed?: number;
  humidity?: number;
}

export interface ApplicationRecord {
  id: number;
  fieldId: number;
  applicationDate: string;
  applicationMethodId: number;
  productsUsed: Record<string, number>;
  applicationPlanId?: number;
  notes?: string;
  temperature?: number;
  windSpeed?: number;
  humidity?: number;
  createdAt: string;
}
