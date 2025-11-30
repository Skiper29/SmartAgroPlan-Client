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
import { Input } from '@/components/ui/input';

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
  const [startDate, setStartDate] = useState<string>(
    currentStartDate ? formatDateForInput(currentStartDate) : '',
  );
  const [endDate, setEndDate] = useState<string>(
    currentEndDate ? formatDateForInput(currentEndDate) : '',
  );
  const [error, setError] = useState<string>('');

  function formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  const handleApply = () => {
    setError('');

    if (!startDate || !endDate) {
      setError('Будь ласка, оберіть обидві дати');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError('Початкова дата має бути меншою за кінцеву');
      return;
    }

    if (minDate && start < minDate) {
      setError('Початкова дата виходить за межі доступних даних');
      return;
    }

    if (maxDate && end > maxDate) {
      setError('Кінцева дата виходить за межі доступних даних');
      return;
    }

    onApply(start, end);
    onOpenChange(false);
  };

  const handleReset = () => {
    setStartDate(minDate ? formatDateForInput(minDate) : '');
    setEndDate(maxDate ? formatDateForInput(maxDate) : '');
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Обрати власний період</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Початкова дата</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDate ? formatDateForInput(minDate) : undefined}
              max={maxDate ? formatDateForInput(maxDate) : undefined}
              className=""
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Кінцева дата</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={minDate ? formatDateForInput(minDate) : undefined}
              max={maxDate ? formatDateForInput(maxDate) : undefined}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
              {error}
            </div>
          )}

          {minDate && maxDate && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Доступний діапазон: {formatDateForInput(minDate)} до{' '}
              {formatDateForInput(maxDate)}
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
