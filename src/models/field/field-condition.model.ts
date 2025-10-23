export interface FieldCondition {
  id: number;
  fieldId: number;
  recordedAt: Date | string;
  soilMoisture?: number | null;
  soilPh?: number | null;
  nitrogen?: number | null;
  phosphorus?: number | null;
  potassium?: number | null;
  sulfur?: number | null;
  calcium?: number | null;
  magnesium?: number | null;
  temperature?: number | null;
  rainfall?: number | null;
  notes?: string | null;
}

export interface FieldConditionCreate {
  fieldId: number;
  recordedAt?: Date | string | null;
  soilMoisture?: number | null;
  soilPh?: number | null;
  nitrogen?: number | null;
  phosphorus?: number | null;
  potassium?: number | null;
  sulfur?: number | null;
  calcium?: number | null;
  magnesium?: number | null;
  temperature?: number | null;
  rainfall?: number | null;
  notes?: string | null;
}
