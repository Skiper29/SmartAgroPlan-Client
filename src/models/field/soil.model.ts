import type { Field } from 'react-hook-form';
import type { Crop } from '@/models/crop/crop.model.ts';

export const SoilType = {
  Clay: 'Clay',
  Sandy: 'Sandy',
  Loamy: 'Loamy',
  Peaty: 'Peaty',
  Saline: 'Saline',
  Chalky: 'Chalky',
  Silty: 'Silty',
  Rocky: 'Rocky',
} as const;

export type SoilType = (typeof SoilType)[keyof typeof SoilType];

export const SoilTypeLabels: Record<SoilType, string> = {
  [SoilType.Clay]: 'Глинистий',
  [SoilType.Sandy]: 'Піщаний',
  [SoilType.Loamy]: 'Супіщаний',
  [SoilType.Peaty]: "Торф'яний",
  [SoilType.Saline]: 'Засолений',
  [SoilType.Chalky]: 'Крейдяний',
  [SoilType.Silty]: 'Мулистий',
  [SoilType.Rocky]: "Кам'янистий",
};

export default interface Soil {
  id: number;
  type: SoilType;
  waterRetention: number; // %
  acidity: number; // pH
  nutrientContent: number; // mg/kg
  organicMatter: number; // %
  soilDensity: number; // g/cm³
  erosionRisk: number; // %
  optimalCrops?: Crop[];
  fields?: Field[];
}
