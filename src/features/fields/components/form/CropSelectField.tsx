import React from 'react';
import type {
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import CropSelect from './CropSelect';
import type { FieldFormData } from '../../schemas/fieldFormSchema';

interface CropSelectFieldProps {
  watch: UseFormWatch<FieldFormData>;
  setValue: UseFormSetValue<FieldFormData>;
  errors: FieldErrors<FieldFormData>;
  onClearError: (field: keyof FieldFormData) => void;
}

const CropSelectField: React.FC<CropSelectFieldProps> = ({
  watch,
  setValue,
  errors,
  onClearError,
}) => {
  const currentCropId = watch('currentCropId');

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Поточна культура (необов'язково)
      </Label>
      <CropSelect
        value={currentCropId || undefined}
        onValueChange={(cropId) => {
          if (cropId === undefined) {
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
          onClearError('currentCropId');
          onClearError('sowingDate');
        }}
        error={errors.currentCropId?.message}
      />
      {errors.currentCropId && (
        <p className="text-sm text-red-500">{errors.currentCropId.message}</p>
      )}
    </div>
  );
};

export default CropSelectField;
