import type DayMonth from '@/models/calendar/day-month.model.ts';
import type Soil from '@/models/field/soil.model.ts';
import type Field from '@/models/field/field.model.ts';
import type { FieldCropHistory } from '@/models/field/field.model.ts';

export const CropType = {
  Wheat: 'Wheat',
  Barley: 'Barley',
  Oats: 'Oats',
  Rye: 'Rye',
  Corn: 'Corn',
  Sunflower: 'Sunflower',
  Soy: 'Soy',
  Rapeseed: 'Rapeseed',
  SugarBeet: 'SugarBeet',
  Potato: 'Potato',
  Tomato: 'Tomato',
  Another: 'Another',
} as const;

export type CropType = (typeof CropType)[keyof typeof CropType];

export const CropTypeLabels: Record<CropType, string> = {
  [CropType.Wheat]: 'Пшениця',
  [CropType.Barley]: 'Ячмінь',
  [CropType.Oats]: 'Овес',
  [CropType.Rye]: 'Жито',
  [CropType.Corn]: 'Кукурудза',
  [CropType.Sunflower]: 'Соняшник',
  [CropType.Soy]: 'Соя',
  [CropType.Rapeseed]: 'Ріпак',
  [CropType.SugarBeet]: 'Цукровий буряк',
  [CropType.Potato]: 'Картопля',
  [CropType.Tomato]: 'Помідор',
  [CropType.Another]: 'Інше',
};

export interface Crop {
  id: number;
  name: string;
  cropType: CropType;
  waterRequirement: number; // mm, per growing season
  fertilizerRequirement: number; // kg per hectare
  growingDuration: number; // days
  sowingStart: DayMonth;
  sowingEnd: DayMonth;
  minTemperature: number; // °C
  maxTemperature: number; // °C
  harvestYield: number; // tons per hectare
  additionalNotes?: string;
  optimalSoil?: Soil;
  fields?: Field[];
  fieldCropHistories?: FieldCropHistory[];
}

export interface CropCreate {
  name?: string;
  cropType: CropType;
  waterRequirement: number;
  fertilizerRequirement: number;
  growingDuration: number;
  sowingStart: DayMonth;
  sowingEnd: DayMonth;
  minTemperature: number;
  maxTemperature: number;
  harvestYield: number;
  additionalNotes?: string;
  optimalSoilId: number;
}

export interface CropUpdate {
  id: number | null;
}
