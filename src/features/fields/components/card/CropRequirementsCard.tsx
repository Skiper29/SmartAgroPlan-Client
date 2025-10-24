import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.tsx';
import { Droplets, Sprout, Thermometer, Calendar } from 'lucide-react';
import type Field from '@/models/field/field.model.ts';
import type DayMonth from '@/models/calendar/day-month.model.ts';

interface CropRequirementsCardProps {
  field: Field;
  formatDayMonth: (dayMonth: DayMonth | undefined) => string;
}

const CropRequirementsCard: React.FC<CropRequirementsCardProps> = ({
  field,
  formatDayMonth,
}) => {
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-cyan-500 hover:scale-[1.02]">
      <CardHeader className="bg-cyan-50 dark:bg-gray-800 pb-3 text-cyan-700 dark:text-cyan-300">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 bg-cyan-500 rounded-lg">
            <Droplets className="h-4 w-4 text-white" />
          </div>
          Потреби культури
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
        {field.currentCrop ? (
          <>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Droplets className="h-3 w-3 text-blue-500" />
                Вода:
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {field.currentCrop.waterRequirement} мм
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Sprout className="h-3 w-3 text-green-500" />
                Добрива:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {field.currentCrop.fertilizerRequirement} кг/га
              </span>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3 mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <Thermometer className="h-3 w-3" />
                  Температура:
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-600 dark:text-gray-400">
                  Мінімум:
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {field.currentCrop.minTemperature}°C
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-600 dark:text-gray-400">
                  Максимум:
                </span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {field.currentCrop.maxTemperature}°C
                </span>
              </div>
            </div>
            {field.currentCrop.sowingStart && field.currentCrop.sowingEnd && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 mt-3">
                <div className="flex items-center gap-1 mb-2">
                  <Calendar className="h-3 w-3 text-purple-600" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Період посіву:
                  </span>
                </div>
                <div className="text-center font-semibold text-purple-600 dark:text-purple-400">
                  {formatDayMonth(field.currentCrop.sowingStart)} -{' '}
                  {formatDayMonth(field.currentCrop.sowingEnd)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <Droplets className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Інформація недоступна
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CropRequirementsCard;
