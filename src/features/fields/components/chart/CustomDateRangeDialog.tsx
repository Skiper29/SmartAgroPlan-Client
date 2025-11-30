import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';

interface CustomDateRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (startDate: Date, endDate: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  currentStartDate?: Date;
  currentEndDate?: Date;
}

const CustomDateRangeDialog: React.FC<CustomDateRangeDialogProps> = ({
  open,
  onOpenChange,
  onApply,
  minDate,
  maxDate,
  currentStartDate,
  currentEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    currentStartDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(currentEndDate);
  const [error, setError] = useState<string>('');

  const handleApply = () => {
    setError('');

    if (!startDate || !endDate) {
      setError('Будь ласка, оберіть обидві дати');
      return;
    }

    if (startDate > endDate) {
      setError('Початкова дата має бути меншою за кінцеву');
      return;
    }

    if (minDate && startDate < minDate) {
      setError('Початкова дата виходить за межі доступних даних');
      return;
    }

    if (maxDate && endDate > maxDate) {
      setError('Кінцева дата виходить за межі доступних даних');
      return;
    }

    onApply(startDate, endDate);
    onOpenChange(false);
  };

  const handleReset = () => {
    setStartDate(minDate);
    setEndDate(maxDate);
    setError('');
  };

  // Disable dates function for start date picker
  const isStartDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return !!(endDate && date > endDate);
  };

  // Disable dates function for end date picker
  const isEndDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return !!(startDate && date < startDate);
  };

  // Calculate year range for dropdowns
  const fromYear = minDate
    ? minDate.getFullYear()
    : new Date().getFullYear() - 10;
  const toYear = maxDate
    ? maxDate.getFullYear()
    : new Date().getFullYear() + 10;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Обрати власний період</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Початкова дата</Label>
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              disabled={isStartDateDisabled}
              placeholder="Оберіть початкову дату"
              error={!!error}
              modal={true}
              fromYear={fromYear}
              toYear={toYear}
            />
          </div>

          <div className="space-y-2">
            <Label>Кінцева дата</Label>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              disabled={isEndDateDisabled}
              placeholder="Оберіть кінцеву дату"
              error={!!error}
              modal={true}
              fromYear={fromYear}
              toYear={toYear}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
              {error}
            </div>
          )}

          {minDate && maxDate && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Доступний діапазон: {format(minDate, 'PPP')} до{' '}
              {format(maxDate, 'PPP')}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Скинути
          </Button>
          <Button onClick={handleApply}>Застосувати</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDateRangeDialog;
