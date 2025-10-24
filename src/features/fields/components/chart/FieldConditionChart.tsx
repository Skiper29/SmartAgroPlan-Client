import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
} from 'recharts';
import { useTheme } from '@/app/providers/ThemeContext';
import type { FieldCondition } from '@/models/field/field-condition.model';
import { METRIC_CONFIGS, METRIC_CATEGORIES } from './metricConfigs';
import type { ChartDataPoint, MetricVisibility } from './types';
import ChartLegend from './ChartLegend';
import ChartTooltip from './ChartTooltip';
import CategorySelector from './CategorySelector';

interface FieldConditionChartProps {
  conditions: FieldCondition[];
  className?: string;
}

const FieldConditionChart: React.FC<FieldConditionChartProps> = ({
  conditions,
  className = '',
}) => {
  const { theme } = useTheme();

  // Initialize visibility state - show soil metrics by default
  const [visibility, setVisibility] = useState<MetricVisibility>(() => {
    const initial: MetricVisibility = {};
    METRIC_CONFIGS.forEach((metric) => {
      initial[metric.key] = METRIC_CATEGORIES.soil.includes(
        metric.key as never,
      );
    });
    return initial;
  });

  // Prepare chart data
  const chartData: ChartDataPoint[] = useMemo(() => {
    return conditions
      .map((condition) => ({
        date: new Date(condition.recordedAt).toISOString(),
        formattedDate: new Date(condition.recordedAt).toLocaleDateString(
          'uk-UA',
          {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        ),
        recordedAt: condition.recordedAt,
        soilMoisture: condition.soilMoisture,
        soilPh: condition.soilPh,
        nitrogen: condition.nitrogen,
        phosphorus: condition.phosphorus,
        potassium: condition.potassium,
        sulfur: condition.sulfur,
        calcium: condition.calcium,
        magnesium: condition.magnesium,
        temperature: condition.temperature,
        rainfall: condition.rainfall,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [conditions]);

  // Check if metric has data
  const hasData = (metricKey: string): boolean => {
    return chartData.some(
      (item) => item[metricKey as keyof ChartDataPoint] != null,
    );
  };

  // Check if category has data
  const hasDataInCategory = (
    category: keyof typeof METRIC_CATEGORIES,
  ): boolean => {
    const metrics = METRIC_CATEGORIES[category];
    return metrics.some((metric) => hasData(metric));
  };

  // Toggle individual metric
  const handleToggleMetric = (metricKey: string) => {
    setVisibility((prev) => ({
      ...prev,
      [metricKey]: !prev[metricKey],
    }));
  };

  // Toggle entire category
  const handleToggleCategory = (category: keyof typeof METRIC_CATEGORIES) => {
    const metrics = METRIC_CATEGORIES[category];
    const anyVisible = metrics.some((metric) => visibility[metric]);

    setVisibility((prev) => {
      const updated = { ...prev };
      metrics.forEach((metric) => {
        if (hasData(metric)) {
          updated[metric] = !anyVisible;
        }
      });
      return updated;
    });
  };

  // Get visible metrics
  const visibleMetrics = METRIC_CONFIGS.filter(
    (metric) => visibility[metric.key] && hasData(metric.key),
  );

  const tickColor = theme === 'dark' ? '#a1a1aa' : '#71717a';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  if (conditions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Немає даних для відображення
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Category Quick Select */}
      <CategorySelector
        visibility={visibility}
        onToggleCategory={handleToggleCategory}
        hasDataInCategory={hasDataInCategory}
      />

      {/* Interactive Legend */}
      <ChartLegend
        metrics={METRIC_CONFIGS}
        visibility={visibility}
        onToggle={handleToggleMetric}
        hasData={hasData}
      />

      {/* Chart */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              opacity={0.5}
            />
            <XAxis
              dataKey="formattedDate"
              tick={{ fill: tickColor, fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fill: tickColor, fontSize: 12 }}
              label={{
                value: 'Значення',
                angle: -90,
                position: 'insideLeft',
                fill: tickColor,
                offset: 0,
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: tickColor, fontSize: 12 }}
              label={{
                value: 'кг/га',
                angle: 90,
                position: 'insideRight',
                fill: tickColor,
                offset: 0,
              }}
            />
            <Tooltip content={<ChartTooltip metrics={visibleMetrics} />} />

            {/* Render visible metrics */}
            {visibleMetrics.map((metric) => {
              if (metric.type === 'bar') {
                return (
                  <Bar
                    key={metric.key}
                    yAxisId={metric.yAxisId || 'left'}
                    dataKey={metric.key}
                    fill={metric.color}
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                    opacity={0.8}
                  />
                );
              }

              return (
                <Line
                  key={metric.key}
                  yAxisId={metric.yAxisId || 'left'}
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: metric.color }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      {visibleMetrics.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {visibleMetrics.map((metric) => {
            const values = chartData
              .map((d) => d[metric.key])
              .filter((v): v is number => v != null);

            if (values.length === 0) return null;

            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            const min = Math.min(...values);
            const max = Math.max(...values);
            const latest = values[values.length - 1];

            return (
              <div
                key={metric.key}
                className="p-3 rounded-lg border-2 transition-colors"
                style={{
                  borderColor: metric.color,
                  backgroundColor: `${metric.color}10`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: metric.color }}
                  />
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">
                    {metric.label}
                  </p>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Останнє:
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {latest.toFixed(2)} {metric.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Середнє:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {avg.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-500">
                    <span>Мін/Макс:</span>
                    <span>
                      {min.toFixed(1)} / {max.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FieldConditionChart;
