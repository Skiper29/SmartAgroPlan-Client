import React from 'react';
import type {
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from 'react-hook-form';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { FieldFormData } from '../../schemas/fieldFormSchema';

interface SowingDatePickerProps {
  watch: UseFormWatch<FieldFormData>;
  setValue: UseFormSetValue<FieldFormData>;
  errors: FieldErrors<FieldFormData>;
  onClearError: (field: keyof FieldFormData) => void;
}

const SowingDatePicker: React.FC<SowingDatePickerProps> = ({
  watch,
  setValue,
  errors,
  onClearError,
}) => {
  const currentCropId = watch('currentCropId');
  const sowingDate = watch('sowingDate');

  if (!currentCropId) {
    return null;
  }

  return (
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
              !sowingDate && 'text-muted-foreground',
              errors.sowingDate && 'border-red-500',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {sowingDate ? (
              format(sowingDate, 'PPP', { locale: uk })
            ) : (
              <span>Оберіть дату посіву</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={sowingDate}
            onSelect={(date) => {
              setValue('sowingDate', date, {
                shouldDirty: true,
                shouldValidate: false,
              });
              onClearError('sowingDate');
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
  );
};

export default SowingDatePicker;
