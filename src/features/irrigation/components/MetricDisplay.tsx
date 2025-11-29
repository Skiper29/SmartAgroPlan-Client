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
  const colorMap: Record<string, string> = {
    'text-red-500': 'bg-red-100 dark:bg-red-900/20',
    'text-red-600': 'bg-red-100 dark:bg-red-900/20',
    'text-blue-500': 'bg-blue-100 dark:bg-blue-900/20',
    'text-blue-600': 'bg-blue-100 dark:bg-blue-900/20',
    'text-indigo-500': 'bg-indigo-100 dark:bg-indigo-900/20',
    'text-indigo-600': 'bg-indigo-100 dark:bg-indigo-900/20',
    'text-green-500': 'bg-green-100 dark:bg-green-900/20',
    'text-green-600': 'bg-green-100 dark:bg-green-900/20',
    'text-yellow-500': 'bg-yellow-100 dark:bg-yellow-900/20',
    'text-yellow-600': 'bg-yellow-100 dark:bg-yellow-900/20',
    'text-purple-500': 'bg-purple-100 dark:bg-purple-900/20',
    'text-purple-600': 'bg-purple-100 dark:bg-purple-900/20',
    'text-orange-500': 'bg-orange-100 dark:bg-orange-900/20',
    'text-orange-600': 'bg-orange-100 dark:bg-orange-900/20',
  };

  const bgColorClass = iconClassName ? colorMap[iconClassName] : '';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg',
          bgColorClass || 'bg-gray-100 dark:bg-gray-800',
        )}
      >
        <Icon className={cn('h-6 w-6', iconClassName || 'text-gray-600')} />
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
