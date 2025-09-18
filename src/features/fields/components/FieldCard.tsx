import React from 'react';
import type Field from '@/models/field/field.model';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import FieldTypeBadge from './FieldTypeBadge';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model';
import { CropType, CropTypeLabels } from '@/models/crop/crop.model';

interface FieldCardProps {
  field: Field;
  className?: string;
}

export const FieldCard: React.FC<FieldCardProps> = ({ field, className }) => {
  // Process soil type from backend (handle integer enum values)
  const getSoilTypeLabel = () => {
    if (!field.soil?.type) return '—';

    const soilType =
      typeof field.soil.type === 'number'
        ? (Object.values(SoilType)[field.soil.type] as SoilType)
        : field.soil.type;

    return SoilTypeLabels[soilType] || '—';
  };

  // Process crop type from backend (handle integer enum values)
  const getCropInfo = () => {
    if (!field.currentCrop) return { name: '—', type: '' };

    const cropType =
      typeof field.currentCrop.cropType === 'number'
        ? (Object.values(CropType)[field.currentCrop.cropType] as CropType)
        : field.currentCrop.cropType;

    const typeLabel = CropTypeLabels[cropType] || '';

    return {
      name: field.currentCrop.name,
      type: typeLabel,
    };
  };

  const cropInfo = getCropInfo();

  return (
    <Card className={`w-full max-w-md ${className ?? ''}`.trim()}>
      <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
        <FieldTypeBadge fieldType={field.fieldType} />
        <CardTitle className="text-lg font-bold flex-1">{field.name}</CardTitle>
      </CardHeader>
      <div className="px-6 py-4 flex flex-col gap-2">
        <CardDescription className="text-sm text-muted-foreground">
          <span className="font-medium">Локація:</span> {field.location ?? '—'}
        </CardDescription>
        <CardDescription className="text-sm">
          <span className="font-medium">Культура:</span>{' '}
          {cropInfo.name}
          {cropInfo.type && (
            <span className="text-xs text-muted-foreground ml-2">
              ({cropInfo.type})
            </span>
          )}
        </CardDescription>
        <CardDescription className="text-sm">
          <span className="font-medium">Ґрунт:</span>{' '}
          {getSoilTypeLabel()}
        </CardDescription>
        <CardDescription className="text-xs text-gray-500">
          <span className="font-medium">Створено:</span>{' '}
          {field.createdDate
            ? new Date(field.createdDate).toLocaleDateString()
            : '—'}
        </CardDescription>
        <CardDescription className="text-xs text-gray-500">
          <span className="font-medium">Оновлено:</span>{' '}
          {field.updatedDate
            ? new Date(field.updatedDate).toLocaleDateString()
            : '—'}
        </CardDescription>
      </div>
    </Card>
  );
};

export default FieldCard;
