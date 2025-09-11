import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FieldTypeSelect from './FieldTypeSelect';
import CropSelect from './CropSelect';
import { FieldType } from '@/models/field/field.model';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model';

// Form validation schema
const valuesAsTuple = <T extends string>(obj: Record<string, T>) =>
  Object.values(obj) as [T, ...T[]];

const fieldFormSchema = z.object({
  name: z.string().min(1, "Назва поля обов'язкова").max(100, '...'),
  location: z.string().optional(),
  fieldType: z.enum(valuesAsTuple(FieldType), "Тип поля обов'язковий"),
  currentCropId: z.number().min(1, "Поточна культура обов'язкова"),
  soil: z.enum(valuesAsTuple(SoilType), "Тип ґрунту обов'язковий"),
  boundaryGeoJson: z.string().min(1, "Межі поля обов'язкові"),
});

export type FieldFormData = z.infer<typeof fieldFormSchema>;

interface FieldFormProps {
  onSubmit: (data: FieldFormData) => void;
  onBoundaryChange: (geoJson: string) => void;
  boundaryGeoJson: string;
  isSubmitting?: boolean;
}

const FieldForm: React.FC<FieldFormProps> = ({
  onSubmit,
  boundaryGeoJson,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FieldFormData>({
    resolver: zodResolver(fieldFormSchema),
    defaultValues: {
      name: '',
      location: '',
      boundaryGeoJson: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const watchedFieldType = watch('fieldType');
  const watchedCurrentCropId = watch('currentCropId');
  const watchedSoil = watch('soil');

  // Update boundary in form when it changes from map
  React.useEffect(() => {
    setValue('boundaryGeoJson', boundaryGeoJson);
  }, [boundaryGeoJson, setValue]);

  const onFormSubmit = (data: FieldFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Field Name */}
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Назва поля *
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Введіть назву поля"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label
          htmlFor="location"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Розташування (необов'язково)
        </Label>
        <Input
          id="location"
          {...register('location')}
          placeholder="Введіть адресу або опис розташування"
        />
      </div>

      {/* Field Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Тип поля *
        </Label>
        <FieldTypeSelect
          value={watchedFieldType}
          onValueChange={(value) => {
            setValue('fieldType', value, {
              shouldDirty: true,
              shouldValidate: false,
            });
            clearErrors('fieldType');
          }}
        />
        {errors.fieldType && (
          <p className="text-sm text-red-500">{errors.fieldType.message}</p>
        )}
      </div>

      {/* Current Crop */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Поточна культура *
        </Label>
        <CropSelect
          value={watchedCurrentCropId}
          onValueChange={(cropId) => {
            setValue('currentCropId', cropId, {
              shouldDirty: true,
              shouldValidate: false,
            });
            clearErrors('currentCropId');
          }}
          error={errors.currentCropId?.message}
        />
        {errors.currentCropId && (
          <p className="text-sm text-red-500">{errors.currentCropId.message}</p>
        )}
      </div>

      {/* Soil Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Тип ґрунту *
        </Label>
        <Select
          value={watchedSoil}
          onValueChange={(value) => {
            setValue('soil', value as SoilType, {
              shouldDirty: true,
              shouldValidate: false,
            });
            clearErrors('soil');
          }}
        >
          <SelectTrigger className={errors.soil ? 'border-red-500' : ''}>
            <SelectValue placeholder="Оберіть тип ґрунту" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SoilTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.soil && (
          <p className="text-sm text-red-500">{errors.soil.message}</p>
        )}
      </div>

      {/* Boundary GeoJSON (hidden field) */}
      <input type="hidden" {...register('boundaryGeoJson')} />
      {errors.boundaryGeoJson && (
        <p className="text-sm text-red-500">{errors.boundaryGeoJson.message}</p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Збереження...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Додати поле
          </div>
        )}
      </Button>
    </form>
  );
};

export default FieldForm;
