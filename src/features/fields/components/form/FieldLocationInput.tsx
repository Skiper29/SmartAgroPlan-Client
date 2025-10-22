import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FieldFormData } from '../../schemas/fieldFormSchema';

interface FieldLocationInputProps {
  register: UseFormRegister<FieldFormData>;
}

const FieldLocationInput: React.FC<FieldLocationInputProps> = ({
  register,
}) => {
  return (
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
  );
};

export default FieldLocationInput;
