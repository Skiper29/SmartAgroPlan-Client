import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  TrendingUp,
  Droplets,
  Leaf,
  Snowflake,
  Thermometer,
} from 'lucide-react';
import type { Crop } from '@/models/crop/crop.model';
import { CropTypeLabels } from '@/models/crop/crop.model';
import { getCropColor } from '@/utils/fieldColors';

interface CropCardProps {
  crop: Crop;
  onClick?: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onClick }) => {
  const cropColorConfig = getCropColor(crop.cropType);
  const cropColor = cropColorConfig.color;

  const formatSowingPeriod = (crop: Crop) => {
    const monthNames = [
      'Січ',
      'Лют',
      'Бер',
      'Кві',
      'Тра',
      'Чер',
      'Лип',
      'Сер',
      'Вер',
      'Жов',
      'Лис',
      'Гру',
    ];
    return `${crop.sowingStart.day} ${monthNames[crop.sowingStart.month - 1]} - ${crop.sowingEnd.day} ${monthNames[crop.sowingEnd.month - 1]}`;
  };

  return (
    <Card
      onClick={onClick}
      className="border-2 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group bg-white dark:bg-gray-800"
      style={{
        borderColor: cropColor + '60',
      }}
    >
      <CardContent className="p-6 space-y-4">
        {/* Name and Sowing Period */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {crop.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatSowingPeriod(crop)}</span>
            </div>
            <Badge
              className="shadow-md backdrop-blur-sm font-semibold"
              style={{
                backgroundColor: cropColor + '20',
                color: cropColor,
                borderColor: cropColor + '40',
                borderWidth: '1px',
              }}
            >
              {CropTypeLabels[crop.cropType]}
            </Badge>
          </div>
        </div>

        {/* Stats Grid - 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-gray-100 dark:border-gray-700">
          {/* Growing Duration */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-blue-500 p-1.5 rounded-md">
                <Calendar className="h-3.5 w-3.5 text-white" />
              </div>
              <p className="text-xs font-medium text-blue-700 dark:text-blue-400">
                Тривалість
              </p>
            </div>
            <p className="text-xl font-bold text-blue-900 dark:text-blue-300 ml-7">
              {crop.growingDuration} <span className="text-sm">днів</span>
            </p>
          </div>

          {/* Yield */}
          <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-3 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-yellow-500 p-1.5 rounded-md">
                <TrendingUp className="h-3.5 w-3.5 text-white" />
              </div>
              <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                Врожайність
              </p>
            </div>
            <p className="text-xl font-bold text-yellow-900 dark:text-yellow-300 ml-7">
              {crop.harvestYield} <span className="text-sm">т/га</span>
            </p>
          </div>

          {/* Water Requirement */}
          <div className="bg-cyan-50 dark:bg-cyan-950/30 rounded-lg p-3 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-cyan-500 p-1.5 rounded-md">
                <Droplets className="h-3.5 w-3.5 text-white" />
              </div>
              <p className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                Вода
              </p>
            </div>
            <p className="text-xl font-bold text-cyan-900 dark:text-cyan-300 ml-7">
              {crop.waterRequirement} <span className="text-sm">мм</span>
            </p>
          </div>

          {/* Fertilizer */}
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-green-500 p-1.5 rounded-md">
                <Leaf className="h-3.5 w-3.5 text-white" />
              </div>
              <p className="text-xs font-medium text-green-700 dark:text-green-400">
                Добрива
              </p>
            </div>
            <p className="text-xl font-bold text-green-900 dark:text-green-300 ml-7">
              {crop.fertilizerRequirement}{' '}
              <span className="text-sm">кг/га</span>
            </p>
          </div>
        </div>

        {/* Temperature Range */}
        <div className="pt-4 border-t-2 border-gray-100 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-50 via-gray-50 to-red-50 dark:from-blue-950/20 dark:via-gray-800 dark:to-red-950/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Snowflake className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Мін.
                  </p>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-400">
                    {crop.minTemperature}°C
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

              <div className="flex items-center gap-2">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-right">
                    Макс.
                  </p>
                  <p className="text-sm font-bold text-red-700 dark:text-red-400">
                    {crop.maxTemperature}°C
                  </p>
                </div>
                <div className="bg-red-500 p-1.5 rounded-md">
                  <Thermometer className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        {crop.additionalNotes && (
          <div className="pt-4 border-t-2 border-gray-100 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                {crop.additionalNotes}
              </p>
            </div>
          </div>
        )}

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
};

export default CropCard;
