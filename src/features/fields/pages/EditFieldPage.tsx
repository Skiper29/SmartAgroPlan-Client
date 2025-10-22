import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FieldMapEditor from '../components/FieldMapEditor';
import FieldTypeSelect from '../components/FieldTypeSelect';
import CropSelect from '../components/CropSelect';
import SoilSelect from '../components/SoilSelect';
import { useUpdateField, useField } from '../hooks/fields.hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { FieldType, type FieldUpdate } from '@/models/field/field.model';
import { Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';

// Form validation schema
const valuesAsTuple = <T extends string>(obj: Record<string, T>) =>
  Object.values(obj) as [T, ...T[]];

const editFieldSchema = z
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

type EditFieldFormData = z.infer<typeof editFieldSchema>;

const EditFieldPage: React.FC = () => {
  const [boundaryGeoJson, setBoundaryGeoJson] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fieldId = id ? parseInt(id) : 0;
  const { data: field, isLoading, error } = useField(fieldId);
  const updateFieldMutation = useUpdateField();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<EditFieldFormData>({
    resolver: zodResolver(editFieldSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      location: '',
      fieldType: FieldType.Arable, // безпечний дефолт, щоби не було undefined на старті
      currentCropId: undefined,
      sowingDate: undefined,
      soilId: 0,
      boundaryGeoJson: '',
    },
  });

  const watchedCurrentCropId = watch('currentCropId');
  const watchedSoilId = watch('soilId');
  const watchedSowingDate = watch('sowingDate');

  const convertFieldType = (fieldType: FieldType): FieldType => {
    return fieldType as FieldType;
  };

  // Initialize form when field is loaded
  useEffect(() => {
    if (field) {
      // Convert integer fieldType from backend to string enum value

      const formData = {
        name: field.name,
        location: field.location || '',
        fieldType: convertFieldType(field.fieldType),
        currentCropId: field.currentCrop?.id || undefined,
        sowingDate: field.sowingDate ? new Date(field.sowingDate) : undefined,
        soilId: field.soil?.id || 0,
        boundaryGeoJson: field.boundaryGeoJson,
      };

      reset(formData);
      setBoundaryGeoJson(field.boundaryGeoJson);

      // Explicitly set the converted values after reset to ensure they stick
      setTimeout(() => {
        setValue('fieldType', convertFieldType(field.fieldType));
        setValue('currentCropId', field.currentCrop?.id || undefined);
        setValue(
          'sowingDate',
          field.sowingDate ? new Date(field.sowingDate) : undefined,
        );
        setValue('soilId', field.soil?.id || 0);
      }, 0);
    }
  }, [field, reset, setValue]);

  // Update boundary in form when it changes from map
  useEffect(() => {
    if (boundaryGeoJson) {
      setValue('boundaryGeoJson', boundaryGeoJson, { shouldValidate: true });
    }
  }, [boundaryGeoJson, setValue]);

  const handleBoundaryChange = (geoJson: string) => {
    setBoundaryGeoJson(geoJson);
  };

  const onSubmit = async (data: EditFieldFormData) => {
    if (!field) return;

    try {
      const updateData: FieldUpdate = {
        id: field.id,
        name: data.name,
        location: data.location || undefined,
        fieldType: data.fieldType,
        currentCropId: data.currentCropId,
        sowingDate: data.sowingDate,
        soilId: data.soilId,
        boundaryGeoJson: data.boundaryGeoJson,
      };

      await updateFieldMutation.mutateAsync(updateData);
      toast.success('Поле успішно оновлено!');
      navigate('/fields');
    } catch (error) {
      console.error('Error updating field:', error);
      toast.error('Помилка при оновленні поля. Спробуйте ще раз.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження поля...
          </p>
        </div>
      </div>
    );
  }

  if (error || !field) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="text-red-600 dark:text-red-400">
            <svg
              className="h-12 w-12 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.598 0L4.216 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-lg font-medium">Поле не знайдено</p>
            <p className="text-sm text-gray-500">
              Перевірте правильність посилання
            </p>
          </div>
          <Button onClick={() => navigate('/fields')} className="mt-4">
            Повернутися до списку полів
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
      <div className="w-full max-w-7xl space-y-8">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
            Редагувати поле "{field.name}"
          </h1>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/fields')}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Назад
          </Button>
        </header>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 lg:col-span-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
                  Інформація про поле
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Редагуйте параметри поля у формі нижче.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
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

                  <Controller
                    name="fieldType"
                    control={control}
                    render={({ field }) => (
                      <FieldTypeSelect
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value); // оновлює RHF
                          clearErrors('fieldType'); // чистимо помилку при зміні
                        }}
                      />
                    )}
                  />

                  {errors.fieldType && (
                    <p className="text-sm text-red-500">
                      {errors.fieldType.message}
                    </p>
                  )}
                </div>

                {/* Current Crop */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Поточна культура (необов'язково)
                  </Label>
                  <CropSelect
                    value={watchedCurrentCropId || undefined}
                    onValueChange={(cropId) => {
                      if (cropId === undefined) {
                        // Clear both crop and sowing date when crop is cleared
                        setValue('currentCropId', undefined, {
                          shouldDirty: true,
                          shouldValidate: false,
                        });
                        setValue('sowingDate', undefined, {
                          shouldDirty: true,
                          shouldValidate: false,
                        });
                      } else {
                        setValue('currentCropId', cropId, {
                          shouldDirty: true,
                          shouldValidate: false,
                        });
                      }
                      clearErrors('currentCropId');
                      clearErrors('sowingDate');
                    }}
                    error={errors.currentCropId?.message}
                  />
                  {errors.currentCropId && (
                    <p className="text-sm text-red-500">
                      {errors.currentCropId.message}
                    </p>
                  )}
                </div>

                {/* Sowing Date - Only visible when crop is selected */}
                {watchedCurrentCropId && (
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
                      <p className="text-sm text-red-500">
                        {errors.sowingDate.message}
                      </p>
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
                    value={watchedSoilId?.toString()}
                    onValueChange={(value) => {
                      setValue('soilId', parseInt(value), {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      clearErrors('soilId');
                    }}
                    error={errors.soilId?.message}
                  />
                  {errors.soilId && (
                    <p className="text-sm text-red-500">
                      {errors.soilId.message}
                    </p>
                  )}
                </div>

                {/* Hidden field for boundary */}
                <input type="hidden" {...register('boundaryGeoJson')} />

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={updateFieldMutation.isPending}
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  {updateFieldMutation.isPending ? (
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
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                      Зберегти зміни
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </section>

          {/* Right Side - Interactive Map */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 lg:col-span-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
                  Межі поля
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Використовуйте інструменти карти для редагування меж поля.
                </p>
              </div>

              {/* Map Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                  Інструкції:
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>
                    • Використовуйте інструмент редагування для зміни існуючих
                    меж
                  </li>
                  <li>• Перетягуйте вершини для коригування форми поля</li>
                  <li>
                    • Натисніть на іконку видалення для повного перемалювання
                  </li>
                  <li>
                    • Натисніть на іконку многокутника для створення нових меж
                  </li>
                </ul>
              </div>

              <FieldMapEditor
                onBoundaryChange={handleBoundaryChange}
                initialBoundary={field.boundaryGeoJson}
                center={[49.0, 32.0]} // Ukraine coordinates
                zoom={8}
              />

              {/* Boundary Status */}
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-3 h-3 rounded-full ${boundaryGeoJson ? 'bg-green-500' : 'bg-gray-300'}`}
                />
                <span
                  className={
                    boundaryGeoJson
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500'
                  }
                >
                  {boundaryGeoJson
                    ? 'Межі поля визначено'
                    : 'Межі поля не визначено'}
                </span>
              </div>

              {errors.boundaryGeoJson && (
                <p className="text-sm text-red-500">
                  {errors.boundaryGeoJson.message}
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditFieldPage;
