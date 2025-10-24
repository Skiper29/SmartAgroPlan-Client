// Types for Field Condition Chart Components

export interface MetricConfig {
  key: keyof MetricData;
  label: string;
  color: string;
  unit: string;
  yAxisId?: 'left' | 'right';
  type?: 'line' | 'bar';
}

export interface MetricData {
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
}

export interface ChartDataPoint extends MetricData {
  date: string;
  formattedDate: string;
  recordedAt: Date | string;
}

export interface MetricVisibility {
  [key: string]: boolean;
}
