import React from 'react';
import type { MetricConfig, MetricVisibility } from './types';
import { cn } from '@/lib/utils';

interface ChartLegendProps {
  metrics: MetricConfig[];
  visibility: MetricVisibility;
  onToggle: (metricKey: string) => void;
  hasData: (metricKey: string) => boolean;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  metrics,
  visibility,
  onToggle,
  hasData,
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {metrics.map((metric) => {
        const isVisible = visibility[metric.key];
        const hasMetricData = hasData(metric.key);

        return (
          <button
            key={metric.key}
            onClick={() => hasMetricData && onToggle(metric.key)}
            disabled={!hasMetricData}
            className={cn(
              'group relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200',
              'border-2 hover:shadow-md active:scale-95',
              hasMetricData
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-40',
              isVisible && hasMetricData
                ? 'border-current shadow-sm scale-105'
                : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-90',
            )}
            style={{
              color: isVisible && hasMetricData ? metric.color : undefined,
              backgroundColor:
                isVisible && hasMetricData ? `${metric.color}15` : undefined,
            }}
            title={
              hasMetricData
                ? `Клікніть, щоб ${isVisible ? 'приховати' : 'показати'} ${metric.label}`
                : 'Немає даних'
            }
          >
            <span
              className={cn(
                'w-3 h-3 rounded-full transition-transform duration-200',
                isVisible &&
                  hasMetricData &&
                  'ring-2 ring-offset-2 ring-current',
              )}
              style={{
                backgroundColor: hasMetricData ? metric.color : '#9ca3af',
              }}
            />
            <span
              className={cn(
                'transition-colors duration-200',
                isVisible && hasMetricData
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400',
              )}
            >
              {metric.label}
            </span>
            {isVisible && hasMetricData && (
              <span className="text-xs opacity-70">({metric.unit})</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ChartLegend;
