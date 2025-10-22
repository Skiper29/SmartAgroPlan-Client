import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import FieldTypeSelect from './FieldTypeSelect';
import type { FieldFormData } from '../../schemas/fieldFormSchema';

interface FieldTypeSelectFieldProps {
  control: Control<FieldFormData>;
  errors: FieldErrors<FieldFormData>;
  onClearError: (field: keyof FieldFormData) => void;
}

const FieldTypeSelectField: React.FC<FieldTypeSelectFieldProps> = ({
  control,
  errors,
  onClearError,
}) => {
  return (
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
              field.onChange(value);
              onClearError('fieldType');
            }}
          />
        )}
      />
      {errors.fieldType && (
        <p className="text-sm text-red-500">{errors.fieldType.message}</p>
      )}
    </div>
  );
};

export default FieldTypeSelectField;
