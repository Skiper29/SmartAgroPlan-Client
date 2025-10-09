import { CropType } from '@/models/crop/crop.model';

export interface DailySchedule {
  date: string;
  dayOfWeek: string;
  eT0: number;
  eTc: number;
  precipitation: number;
  netIrrigationRequired: number;
  grossIrrigationRequired: number;
  soilMoisture: number;
  shouldIrrigate: boolean;
  recommendedTime: string;
  weatherSummary: string;
}

export interface WeeklyIrrigationSchedule {
  fieldId: number;
  fieldName: string;
  cropType: CropType;
  startDate: string;
  endDate: string;
  dailySchedule: DailySchedule[];
  totalWaterRequirement: number;
  totalExpectedPrecipitation: number;
  irrigationDays: number;
  recommendations: string;
}
