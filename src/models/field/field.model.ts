import type { Crop } from '@/models/crop/crop.model';
import type Soil from '@/models/field/soil.model';

export const FieldType = {
  Arable: 'Arable',
  Pasture: 'Pasture',
  Orchard: 'Orchard',
  Vineyard: 'Vineyard',
  Greenhouse: 'Greenhouse',
  Fallow: 'Fallow',
} as const;

export type FieldType = (typeof FieldType)[keyof typeof FieldType];

export const FieldTypeLabels: Record<FieldType, string> = {
  [FieldType.Arable]: 'Рілля',
  [FieldType.Pasture]: 'Пасовище',
  [FieldType.Orchard]: 'Сад',
  [FieldType.Vineyard]: 'Виноградник',
  [FieldType.Greenhouse]: 'Теплиця',
  [FieldType.Fallow]: 'Поле під паром',
};

export default interface Field {
  id: number;
  name: string;
  location?: string;
  boundaryGeoJson: string;
  fieldType: FieldType;
  currentCrop?: Crop;
  sowingDate?: Date;
  soil: Soil;
  createdAt: Date;
  updatedAt: Date;
}

export interface FieldCreate {
  name?: string;
  location?: string;
  boundaryGeoJson?: string;
  fieldType: FieldType;
  currentCropId?: number;
  sowingDate?: Date;
  soilId: number;
}

export interface FieldUpdate extends FieldCreate {
  id: number;
}

export interface FieldCropHistory {
  id: number;
  field: Field;
  crop: Crop;
  plantedDate: Date;
  harvestedDate: Date;
  yield: number; // tons per hectare
  notes?: string;
}

export interface FieldCropHistoryCreateUpdate {
  fieldId: number;
  cropId: number;
  sowingDate: Date;
  harvestDate: Date;
  yield: number;
  notes?: string;
}
