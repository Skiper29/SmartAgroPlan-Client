import React, { useState } from 'react';
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
import { cn } from '@/lib/utils';

interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  placeholder?: string;
  className?: string;
  error?: boolean;
  modal?: boolean;
  fromYear?: number;
  toYear?: number;
}

export function DatePicker({
  date,
  onDateChange,
  disabled,
  placeholder = 'Оберіть дату',
  className,
  error,
  modal,
  fromYear,
  toYear,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (newDate: Date | undefined) => {
    onDateChange(newDate);
    setIsOpen(false);
  };

  // Build calendar props conditionally
  const calendarProps: React.ComponentProps<typeof Calendar> = {
    mode: 'single',
    selected: date,
    onSelect: handleDateSelect,
    disabled,
    captionLayout: 'dropdown',
    ...(fromYear !== undefined && { fromYear }),
    ...(toYear !== undefined && { toYear }),
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
            format(date, 'PPP', { locale: uk })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar {...calendarProps} />
      </PopoverContent>
    </Popover>
  );
}
