import * as z from 'zod';
import { FieldType } from '@/models/field/field.model';

const valuesAsTuple = <T extends string>(obj: Record<string, T>) =>
  Object.values(obj) as [T, ...T[]];

export const fieldFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Назва поля обов'язкова")
      .max(100, 'Назва занадто довга'),
    location: z.string().optional(),
    fieldType: z.enum(valuesAsTuple(FieldType), "Тип поля обов'язковий"),
    currentCropId: z.number().optional(),
    sowingDate: z.date().optional(),
    soilId: z.number().min(1, "Тип ґрунту обов'язковий"),
    boundaryGeoJson: z.string().min(1, "Межі поля обов'язкові"),
  })
  .refine(
    (data) => {
      // If crop is selected, sowing date should be provided
      return !data.currentCropId || !!data.sowingDate;
    },
    {
      message: "Дата посіву обов'язкова при виборі культури",
      path: ['sowingDate'],
    },
  );

export type FieldFormData = z.infer<typeof fieldFormSchema>;

// Helper function to convert field data to form data
export const convertFieldToFormData = (field: {
  name: string;
  location?: string;
  fieldType: FieldType | string;
  currentCrop?: { id: number };
  sowingDate?: string | Date;
  soil?: { id: number };
  boundaryGeoJson: string;
}): FieldFormData => {
  const fieldTypeValue = (Object.values(FieldType) as string[]).includes(
    field.fieldType as string,
  )
    ? (field.fieldType as FieldType)
    : FieldType.Arable;

  return {
    name: field.name,
    location: field.location || '',
    fieldType: fieldTypeValue,
    currentCropId: field.currentCrop?.id,
    sowingDate: field.sowingDate ? new Date(field.sowingDate) : undefined,
    soilId: field.soil?.id || 1,
    boundaryGeoJson: field.boundaryGeoJson,
  };
};
