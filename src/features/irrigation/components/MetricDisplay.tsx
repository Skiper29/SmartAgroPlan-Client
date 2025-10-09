import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricDisplayProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  iconClassName?: string;
  className?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
  icon: Icon,
  label,
  value,
  unit,
  iconClassName,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800',
          iconClassName
            ?.replace('text-', 'bg-')
            .replace('600', '100 dark:bg-opacity-20'),
        )}
      >
        <Icon className={cn('h-6 w-6 text-gray-600', iconClassName)} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-bold">
          {value}
          {unit && (
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              {unit}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MetricDisplay;
