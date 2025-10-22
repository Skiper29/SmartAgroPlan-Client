import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FieldFormData } from '../../schemas/fieldFormSchema';

interface FieldNameInputProps {
  register: UseFormRegister<FieldFormData>;
  errors: FieldErrors<FieldFormData>;
}

const FieldNameInput: React.FC<FieldNameInputProps> = ({
  register,
  errors,
}) => {
  return (
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
  );
};

export default FieldNameInput;
