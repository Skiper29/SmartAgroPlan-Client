import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.tsx';
import {
  FlaskConical,
  Layers,
  Droplets,
  Beaker,
  Nut,
  Recycle,
  Scaling,
  Wind,
} from 'lucide-react';
import type Field from '@/models/field/field.model.ts';

interface SoilInformationCardProps {
  field: Field;
  soilTypeLabel: string;
}

const SoilInformationCard: React.FC<SoilInformationCardProps> = ({
  field,
  soilTypeLabel,
}) => {
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-amber-500 hover:scale-[1.02]">
      <CardHeader className="bg-amber-50 dark:bg-gray-800 pb-3 text-amber-700 dark:text-amber-300">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 bg-amber-500 rounded-lg">
            <FlaskConical className="h-4 w-4 text-white" />
          </div>
          Характеристики ґрунту
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
        {field.soil ? (
          <>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Layers className="h-3 w-3" />
                Тип:
              </span>
              <span className="font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                {soilTypeLabel}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Droplets className="h-3 w-3 text-blue-500" />
                Водотримкість:
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {field.soil.waterRetention}%
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Beaker className="h-3 w-3" />
                pH:
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {field.soil.acidity}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Nut className="h-3 w-3" />
                Поживні реч.:
              </span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {field.soil.nutrientContent} мг/кг
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Recycle className="h-3 w-3" />
                Орган. речовина:
              </span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {field.soil.organicMatter}%
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Scaling className="h-3 w-3" />
                Щільність:
              </span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {field.soil.soilDensity} г/см³
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Wind className="h-3 w-3" />
                Ризик ерозії:
              </span>
              <span
                className={`font-bold px-2 py-0.5 rounded ${
                  field.soil.erosionRisk > 50
                    ? 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                    : field.soil.erosionRisk > 25
                      ? 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30'
                      : 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                }`}
              >
                {field.soil.erosionRisk}%
              </span>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <FlaskConical className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Інформація недоступна
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SoilInformationCard;
