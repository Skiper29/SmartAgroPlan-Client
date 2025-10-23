import { useState } from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  placeholder?: string;
  className?: string;
  error?: boolean;
  modal?: boolean;
}

export function DateTimePicker({
  date,
  onDateChange,
  disabled,
  placeholder = 'Оберіть дату та час',
  className,
  error,
  modal,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  // Extract hours and minutes from the selected date
  const hours = selectedDate ? selectedDate.getHours() : 0;
  const minutes = selectedDate ? selectedDate.getMinutes() : 0;

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      // Preserve the time when selecting a new date
      const updatedDate = new Date(newDate);
      updatedDate.setHours(hours, minutes);
      setSelectedDate(updatedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleTimeChange = (type: 'hours' | 'minutes', value: string) => {
    if (!selectedDate) {
      // If no date selected, use today
      const newDate = new Date();
      setSelectedDate(newDate);
    }

    const currentDate = selectedDate || new Date();
    const newDate = new Date(currentDate);

    if (type === 'hours') {
      const numValue = parseInt(value) || 0;
      newDate.setHours(Math.min(23, Math.max(0, numValue)));
    } else {
      const numValue = parseInt(value) || 0;
      newDate.setMinutes(Math.min(59, Math.max(0, numValue)));
    }

    setSelectedDate(newDate);
  };

  const handleApply = () => {
    onDateChange(selectedDate);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    onDateChange(undefined);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            error && 'border-red-500',
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP HH:mm', { locale: uk })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={disabled}
          />

          <div className="border-t pt-3 space-y-2">
            <Label className="text-sm font-medium">Час</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={hours.toString().padStart(2, '0')}
                  onChange={(e) => handleTimeChange('hours', e.target.value)}
                  className="text-center"
                  placeholder="ГГ"
                />
              </div>
              <span className="text-lg font-semibold">:</span>
              <div className="flex-1">
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes.toString().padStart(2, '0')}
                  onChange={(e) => handleTimeChange('minutes', e.target.value)}
                  className="text-center"
                  placeholder="ХХ"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-t pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleClear}
            >
              Очистити
            </Button>
            <Button
              type="button"
              size="sm"
              className="flex-1"
              onClick={handleApply}
            >
              Застосувати
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
