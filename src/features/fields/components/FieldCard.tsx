import React from 'react';
import type Field from '@/models/field/field.model';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import FieldTypeBadge from './FieldTypeBadge';
import { SoilTypeLabels } from '@/models/field/soil.model';

interface FieldCardProps {
  field: Field;
  className?: string;
}

export const FieldCard: React.FC<FieldCardProps> = ({ field, className }) => {
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
          {field.currentCrop?.name ?? '—'}
        </CardDescription>
        <CardDescription className="text-sm">
          <span className="font-medium">Ґрунт:</span>{' '}
          {field.soil?.type ? SoilTypeLabels[field.soil.type] : '—'}
        </CardDescription>
        <CardDescription className="text-xs text-gray-500">
          <span className="font-medium">Створено:</span>{' '}
          {field.createdDate?.toLocaleDateString()}
        </CardDescription>
        <CardDescription className="text-xs text-gray-500">
          <span className="font-medium">Оновлено:</span>{' '}
          {field.updatedDate?.toLocaleDateString()}
        </CardDescription>
      </div>
    </Card>
  );
};

export default FieldCard;
