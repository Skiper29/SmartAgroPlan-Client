import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.tsx';
import {
  Info,
  MapPin,
  Tag,
  BarChart3,
  Map,
  Clock,
  RefreshCw,
} from 'lucide-react';
import type Field from '@/models/field/field.model.ts';
import { FieldTypeLabels } from '@/models/field/field.model.ts';

interface BasicInformationCardProps {
  field: Field;
  fieldArea: string | null;
}

const BasicInformationCard: React.FC<BasicInformationCardProps> = ({
  field,
  fieldArea,
}) => {
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 hover:scale-[1.02]">
      <CardHeader className="bg-blue-50 dark:bg-gray-800 pb-3 text-blue-700 dark:text-blue-300">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 bg-blue-500 rounded-lg">
            <Info className="h-4 w-4 text-white" />
          </div>
          Основна інформація
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
        <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Назва:
          </span>
          <span className="font-bold text-gray-900 dark:text-white">
            {field.name}
          </span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Tag className="h-3 w-3" />
            Тип поля:
          </span>
          <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
            {FieldTypeLabels[field.fieldType]}
          </span>
        </div>
        {fieldArea && (
          <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
            <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Площа:
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">
              {fieldArea} га
            </span>
          </div>
        )}
        <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
          <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Map className="h-3 w-3" />
            Локація:
          </span>
          <span
            className="text-gray-900 dark:text-white text-right max-w-[70%] truncate"
            title={field.location || '—'}
          >
            {field.location || '—'}
          </span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
          <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Створено:
          </span>
          <span className="text-gray-900 dark:text-white">
            {field.createdAt
              ? new Date(field.createdAt).toLocaleDateString('uk-UA')
              : '—'}
          </span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            Оновлено:
          </span>
          <span className="text-gray-900 dark:text-white">
            {field.updatedAt
              ? new Date(field.updatedAt).toLocaleDateString('uk-UA')
              : '—'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformationCard;
