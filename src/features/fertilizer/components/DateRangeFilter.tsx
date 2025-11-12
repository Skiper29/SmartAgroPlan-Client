import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Calendar, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateRangeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onApply: () => void;
  isLoading?: boolean;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
  isLoading = false,
}) => {
  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          Фільтр за періодом
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-sm font-medium">
              Дата початку
            </Label>
            <DateTimePicker
              date={startDate}
              onDateChange={onStartDateChange}
              placeholder="Оберіть дату початку"
              modal={true}
              disabled={(date) =>
                // Disable dates after end date if end date is set
                endDate ? date > endDate : false
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-sm font-medium">
              Дата завершення
            </Label>
            <DateTimePicker
              date={endDate}
              onDateChange={onEndDateChange}
              placeholder="Оберіть дату завершення"
              modal={true}
              disabled={(date) =>
                // Disable dates before start date if start date is set
                startDate ? date < startDate : false
              }
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onApply}
              disabled={isLoading}
              className={cn(
                'w-full md:w-auto',
                'shadow-sm hover:shadow transition-shadow',
              )}
            >
              <Filter
                className={cn('h-4 w-4 mr-2', isLoading && 'animate-pulse')}
              />
              Застосувати
            </Button>
          </div>
        </div>

        {startDate && endDate && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Період:{' '}
              <span className="font-medium text-foreground">
                {startDate.toLocaleDateString('uk-UA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {' — '}
              <span className="font-medium text-foreground">
                {endDate.toLocaleDateString('uk-UA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateRangeFilter;
