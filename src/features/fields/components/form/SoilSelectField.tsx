import React from 'react';
import type {
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import SoilSelect from './SoilSelect';
import type { FieldFormData } from '../../schemas/fieldFormSchema';

interface SoilSelectFieldProps {
  watch: UseFormWatch<FieldFormData>;
  setValue: UseFormSetValue<FieldFormData>;
  errors: FieldErrors<FieldFormData>;
  onClearError: (field: keyof FieldFormData) => void;
}

const SoilSelectField: React.FC<SoilSelectFieldProps> = ({
  watch,
  setValue,
  errors,
  onClearError,
}) => {
  const soilId = watch('soilId');

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Тип ґрунту *
      </Label>
      <SoilSelect
        value={soilId?.toString()}
        onValueChange={(value) => {
          setValue('soilId', parseInt(value), {
            shouldDirty: true,
            shouldValidate: true,
          });
          onClearError('soilId');
        }}
        error={errors.soilId?.message}
      />
      {errors.soilId && (
        <p className="text-sm text-red-500">{errors.soilId.message}</p>
      )}
    </div>
  );
};

export default SoilSelectField;
