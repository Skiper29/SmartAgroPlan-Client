import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getIrrigationActionStyle } from '@/features/irrigation/utils/irrigationUtils';
import { cn } from '@/lib/utils';

interface IrrigationStatusBadgeProps {
  action: string;
  className?: string;
}

const IrrigationStatusBadge: React.FC<IrrigationStatusBadgeProps> = ({
  action,
  className,
}) => {
  const {
    icon: Icon,
    label,
    colorClassName,
    bgColorClassName,
  } = getIrrigationActionStyle(action);

  return (
    <Badge
      className={cn(
        'flex items-center gap-2 border-none text-sm font-semibold',
        colorClassName,
        bgColorClassName,
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Badge>
  );
};

export default IrrigationStatusBadge;
