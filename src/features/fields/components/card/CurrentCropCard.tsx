import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.tsx';
import { Wheat, Leaf, Tag, Calendar, Clock, TrendingUp } from 'lucide-react';
import type Field from '@/models/field/field.model.ts';

interface CropInfo {
  name: string;
  type: string;
  typeLabel: string;
}

interface CurrentCropCardProps {
  field: Field;
  cropInfo: CropInfo;
  expectedHarvestDate: Date | null;
}

const CurrentCropCard: React.FC<CurrentCropCardProps> = ({
  field,
  cropInfo,
  expectedHarvestDate,
}) => {
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500 hover:scale-[1.02]">
      <CardHeader className="bg-green-50 dark:bg-gray-800 pb-3 text-green-700 dark:text-green-300">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 bg-green-500 rounded-lg">
            <Wheat className="h-4 w-4 text-white" />
          </div>
          Поточна культура
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
        {field.currentCrop ? (
          <>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Leaf className="h-3 w-3" />
                Назва:
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {cropInfo.name}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Тип:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                {cropInfo.typeLabel}
              </span>
            </div>
            {field.sowingDate && (
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Дата посіву:
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {new Date(field.sowingDate).toLocaleDateString('uk-UA')}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Тривалість:
              </span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {field.currentCrop.growingDuration} днів
              </span>
            </div>
            {expectedHarvestDate && (
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Очік. збір:
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {expectedHarvestDate.toLocaleDateString('uk-UA')}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Врожайність:
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {field.currentCrop.harvestYield} т/га
              </span>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Wheat className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Культура не визначена
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentCropCard;
