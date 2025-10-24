export interface FieldCondition {
  id: number;
  fieldId: number;
  recordedAt: Date | string;
  soilMoisture?: number | null; // m³/m³
  soilPh?: number | null; // pH value
  nitrogen?: number | null; // kg/ha
  phosphorus?: number | null; // kg/ha
  potassium?: number | null; // kg/ha
  sulfur?: number | null; // kg/ha
  calcium?: number | null; // kg/ha
  magnesium?: number | null; // kg/ha
  temperature?: number | null; // °C
  rainfall?: number | null; // mm
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
