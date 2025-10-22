import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FieldTypeSelect from './FieldTypeSelect';
import CropSelect from './CropSelect';
import SoilSelect from './SoilSelect';
import { FieldType } from '@/models/field/field.model';
import { cn } from '@/lib/utils';

// Form validation schema
const valuesAsTuple = <T extends string>(obj: Record<string, T>) =>
  Object.values(obj) as [T, ...T[]];

const fieldFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Назва поля обов'язкова")
      .max(100, 'Назва занадто довга'),
    location: z.string().optional(),
    fieldType: z.enum(valuesAsTuple(FieldType), "Тип поля обов'язковий"),
    currentCrop: z.string().optional(),
    sowingDate: z.date().optional(),
    soil: z.string().min(1, "Тип ґрунту обов'язковий"),
    boundaryGeoJson: z.string().min(1, "Межі поля обов'язкові"),
  })
  .refine(
    (data) => {
      // If crop is selected, sowing date should be provided
      return !data.currentCrop || !!data.sowingDate;
    },
    {
      message: "Дата посіву обов'язкова при виборі культури",
      path: ['sowingDate'],
    },
  );

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
      currentCrop: undefined,
      sowingDate: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const watchedFieldType = watch('fieldType');
  const watchedCurrentCrop = watch('currentCrop');
  const watchedSoil = watch('soil');
  const watchedSowingDate = watch('sowingDate');

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
          Поточна культура (необов'язково)
        </Label>
        <CropSelect
          value={watchedCurrentCrop ? parseInt(watchedCurrentCrop) : undefined}
          onValueChange={(cropId) => {
            if (cropId === undefined) {
              // Clear both crop and sowing date when crop is cleared
              setValue('currentCrop', undefined, {
                shouldDirty: true,
                shouldValidate: false,
              });
              setValue('sowingDate', undefined, {
                shouldDirty: true,
                shouldValidate: false,
              });
            } else {
              setValue('currentCrop', cropId.toString(), {
                shouldDirty: true,
                shouldValidate: false,
              });
            }
            clearErrors('currentCrop');
            clearErrors('sowingDate');
          }}
          error={errors.currentCrop?.message}
        />
        {errors.currentCrop && (
          <p className="text-sm text-red-500">{errors.currentCrop.message}</p>
        )}
      </div>

      {/* Sowing Date - Only visible when crop is selected */}
      {watchedCurrentCrop && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Дата посіву *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !watchedSowingDate && 'text-muted-foreground',
                  errors.sowingDate && 'border-red-500',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watchedSowingDate ? (
                  format(watchedSowingDate, 'PPP', { locale: uk })
                ) : (
                  <span>Оберіть дату посіву</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={watchedSowingDate}
                onSelect={(date) => {
                  setValue('sowingDate', date, {
                    shouldDirty: true,
                    shouldValidate: false,
                  });
                  clearErrors('sowingDate');
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                className="rounded-md border border-gray-200 dark:border-gray-700 shadow-lg"
              />
            </PopoverContent>
          </Popover>
          {errors.sowingDate && (
            <p className="text-sm text-red-500">{errors.sowingDate.message}</p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Вкажіть дату, коли культуру було посаджено
          </p>
        </div>
      )}

      {/* Soil Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Тип ґрунту *
        </Label>
        <SoilSelect
          value={watchedSoil}
          onValueChange={(value) => {
            setValue('soil', value, {
              shouldDirty: true,
              shouldValidate: false,
            });
            clearErrors('soil');
          }}
          error={errors.soil?.message}
        />
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
