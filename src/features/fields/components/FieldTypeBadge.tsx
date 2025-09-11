import React from 'react';
import { FieldType, FieldTypeLabels } from '@/models/field/field.model';
import { Badge } from '@/components/ui/badge';

interface FieldTypeBadgeProps {
  fieldType: FieldType;
  className?: string;
}

const fieldTypeColors: Partial<Record<FieldType, string>> = {
  Arable: 'bg-green-100 text-green-800',
  Pasture: 'bg-lime-100 text-lime-800',
  Orchard: 'bg-orange-100 text-orange-800',
  Vineyard: 'bg-purple-100 text-purple-800',
  Greenhouse: 'bg-teal-100 text-teal-800',
  Fallow: 'bg-gray-100 text-gray-800',
};

export const FieldTypeBadge: React.FC<FieldTypeBadgeProps> = ({
  fieldType,
  className,
}) => {
  const label = FieldTypeLabels[fieldType] ?? fieldType;
  const colorClass = fieldTypeColors[fieldType] ?? 'bg-gray-100 text-gray-800';

  return (
    <Badge
      variant="secondary"
      className={`border-none ${colorClass} ${className ?? ''}`.trim()}
      aria-label={`Тип поля: ${label}`}
    >
      {label}
    </Badge>
  );
};

export default FieldTypeBadge;
