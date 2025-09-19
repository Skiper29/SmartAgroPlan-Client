import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FieldType, type FieldUpdate } from '@/models/field/field.model';
import type Field from '@/models/field/field.model';
import { useUpdateField } from '../hooks/fields.hooks';
import FieldTypeSelect from './FieldTypeSelect';
import CropSelect from './CropSelect';
import SoilSelect from './SoilSelect';
import FieldMapEditor from './FieldMapEditor';

// Form validation schema
const valuesAsTuple = <T extends string>(obj: Record<string, T>) =>
  Object.values(obj) as [T, ...T[]];

const editFieldSchema = z.object({
  name: z
    .string()
    .min(1, "Назва поля обов'язкова")
    .max(100, 'Назва занадто довга'),
  location: z.string().optional(),
  fieldType: z.enum(valuesAsTuple(FieldType), "Тип поля обов'язковий"),
  currentCropId: z.number().min(1, "Поточна культура обов'язкова"),
  soilId: z.number().min(1, "Тип ґрунту обов'язковий"),
  boundaryGeoJson: z.string().min(1, "Межі поля обов'язкові"),
});

type EditFieldFormData = z.infer<typeof editFieldSchema>;

interface EditFieldModalProps {
  field: Field | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditFieldModal: React.FC<EditFieldModalProps> = ({
  field,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [boundaryGeoJson, setBoundaryGeoJson] = useState<string>('');
  const updateField = useUpdateField();

  const {
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
  });

  const watchedFieldType = watch('fieldType');
  const watchedCurrentCropId = watch('currentCropId');
  const watchedSoilId = watch('soilId');

  // Initialize form when field changes
  useEffect(() => {
    if (field && isOpen) {
      reset({
        name: field.name,
        location: field.location || '',
        fieldType: field.fieldType,
        currentCropId: field.currentCrop?.id || 0,
        soilId: field.soil?.id || 0,
        boundaryGeoJson: field.boundaryGeoJson,
      });
      setBoundaryGeoJson(field.boundaryGeoJson);
    }
  }, [field, isOpen, reset]);

  // Update boundary in form when it changes from map
  useEffect(() => {
    setValue('boundaryGeoJson', boundaryGeoJson);
  }, [boundaryGeoJson, setValue]);

  const onSubmit = async (data: EditFieldFormData) => {
    if (!field) return;

    try {
      const updateData: FieldUpdate = {
        id: field.id,
        name: data.name,
        location: data.location || undefined,
        fieldType: data.fieldType,
        currentCropId: data.currentCropId,
        soilId: data.soilId,
        boundaryGeoJson: data.boundaryGeoJson,
      };

      await updateField.mutateAsync(updateData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  const handleClose = () => {
    reset();
    setBoundaryGeoJson('');
    onClose();
  };

  if (!field) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редагувати поле</DialogTitle>
          <DialogDescription>
            Внесіть зміни до поля "{field.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Form fields */}
            <div className="space-y-4">
              {/* Field Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
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
                <Label htmlFor="location" className="text-sm font-medium">
                  Розташування
                </Label>
                <Input
                  id="location"
                  {...register('location')}
                  placeholder="Введіть адресу або опис розташування"
                />
              </div>

              {/* Field Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Тип поля *</Label>
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
                  <p className="text-sm text-red-500">
                    {errors.fieldType.message}
                  </p>
                )}
              </div>

              {/* Current Crop */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
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
                  <p className="text-sm text-red-500">
                    {errors.currentCropId.message}
                  </p>
                )}
              </div>

              {/* Soil Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Тип ґрунту *</Label>
                <SoilSelect
                  value={watchedSoilId?.toString()}
                  onValueChange={(value) => {
                    setValue('soilId', parseInt(value), {
                      shouldDirty: true,
                      shouldValidate: false,
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
            </div>

            {/* Right column - Map */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Межі поля *</Label>
              <FieldMapEditor
                onBoundaryChange={setBoundaryGeoJson}
                initialBoundary={boundaryGeoJson}
                center={[49.0, 32.0]}
                zoom={8}
              />
              {errors.boundaryGeoJson && (
                <p className="text-sm text-red-500">
                  {errors.boundaryGeoJson.message}
                </p>
              )}
            </div>
          </div>

          {/* Hidden field for boundary */}
          <input type="hidden" {...register('boundaryGeoJson')} />

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateField.isPending}
            >
              Скасувати
            </Button>
            <Button
              type="submit"
              disabled={updateField.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {updateField.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Збереження...
                </div>
              ) : (
                'Зберегти зміни'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFieldModal;
