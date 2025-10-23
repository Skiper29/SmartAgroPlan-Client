import React from 'react';
import type {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from 'react-hook-form';
import type { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { get } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  label: string;
  id: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: React.HTMLInputTypeAttribute;
  unit?: string;
  icon?: LucideIcon;
  step?: number | string;
}

/**
 * A reusable, generic form input component with label, icon, unit, and error display
 * for use with react-hook-form.
 */
export const FormInput = <T extends FieldValues>({
  label,
  id,
  register,
  errors,
  type = 'number',
  unit,
  icon: Icon,
  step,
}: FormInputProps<T>) => {
  const error = get(errors, id);
  const errorMessage = error?.message?.toString();

  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-sm flex items-center gap-1">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        {label}{' '}
        {unit && (
          <span className="text-xs text-muted-foreground">({unit})</span>
        )}
      </Label>
      <Input
        id={id}
        type={type}
        step={
          type === 'number' ? (step !== undefined ? step : 'any') : undefined
        }
        {...register(id, {
          valueAsNumber: type === 'number',
          setValueAs: (value) => {
            if (value === '' || value === null || value === undefined)
              return null;
            if (type === 'number') {
              const num = Number(value);
              return isNaN(num) ? null : num;
            }
            return value;
          },
        })}
        className={errorMessage ? 'border-red-500' : ''}
        aria-invalid={!!errorMessage}
      />
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};
