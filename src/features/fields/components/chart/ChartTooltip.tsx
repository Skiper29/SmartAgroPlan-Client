import React from 'react';
import type { MetricConfig } from './types';

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
  payload: Record<string, unknown>;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  metrics: MetricConfig[];
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  metrics,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 shadow-xl">
      <p className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-base border-b border-gray-200 dark:border-gray-700 pb-2">
        {label}
      </p>
      <div className="space-y-2">
        {payload.map((entry) => {
          const metric = metrics.find((m) => m.key === entry.dataKey);
          if (!metric || entry.value == null) return null;

          return (
            <div
              key={entry.dataKey}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {metric.label}:
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white tabular-nums">
                {typeof entry.value === 'number'
                  ? entry.value.toFixed(2)
                  : entry.value}{' '}
                <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                  {metric.unit}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTooltip;
