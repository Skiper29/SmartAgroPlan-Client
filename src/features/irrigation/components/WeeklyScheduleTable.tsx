import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { type DailySchedule } from '@/models/irrigation/schedule.model';
import { parseWeatherSummary } from '../utils/weatherParser';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WeeklyScheduleTableProps {
  schedule: DailySchedule[];
}

const WeeklyScheduleTable: React.FC<WeeklyScheduleTableProps> = ({
  schedule,
}) => {
  // Функція для форматування дати та дня тижня
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayAndMonth = date.toLocaleDateString('uk-UA', {
      month: 'short',
      day: 'numeric',
    });
    let dayOfWeek = date.toLocaleDateString('uk-UA', { weekday: 'long' });
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    return { dayAndMonth, dayOfWeek };
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Дата</TableHead>
            <TableHead className="min-w-[180px]">Статус</TableHead>
            <TableHead>Полив (мм)</TableHead>
            <TableHead className="min-w-[100px]">Погода</TableHead>
            <TableHead className="min-w-[27 0px]">Рекомендований час</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((day) => {
            const weather = parseWeatherSummary(day.weatherSummary);
            const { dayAndMonth, dayOfWeek } = formatDate(day.date);
            return (
              <TableRow
                key={day.date}
                className={cn(
                  day.shouldIrrigate
                    ? 'bg-green-50/50 dark:bg-green-900/20'
                    : '',
                )}
              >
                <TableCell>
                  <div className="font-medium">{dayAndMonth}</div>
                  <div className="text-sm text-muted-foreground">
                    {dayOfWeek}
                  </div>
                </TableCell>
                <TableCell>
                  {day.shouldIrrigate ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Полив потрібен</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <XCircle className="h-5 w-5" />
                      <span>Не потрібно</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-lg font-bold">
                    {day.grossIrrigationRequired.toFixed(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {weather.map((w, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="flex items-center gap-1.5"
                      >
                        <w.icon
                          className={cn('h-3.5 w-3.5', w.colorClassName)}
                        />
                        {w.text}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="whitespace-normal">
                      {day.recommendedTime}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WeeklyScheduleTable;
