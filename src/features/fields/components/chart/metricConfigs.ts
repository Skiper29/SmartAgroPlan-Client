// Metric configurations for field conditions
// Metric configurations for field conditions
import type { MetricConfig } from './types';

export const METRIC_CONFIGS: MetricConfig[] = [
  {
    key: 'soilMoisture',
    label: 'Вологість ґрунту',
    color: '#3b82f6', // blue-500
    unit: 'm³/m³',
    yAxisId: 'left',
    type: 'line',
  },
  {
    key: 'soilPh',
    label: 'pH ґрунту',
    color: '#8b5cf6', // violet-500
    unit: 'pH',
    yAxisId: 'left',
    type: 'line',
  },
  {
    key: 'nitrogen',
    label: 'Азот (N)',
    color: '#10b981', // emerald-500
    unit: 'кг/га',
    yAxisId: 'right',
    type: 'line',
  },
  {
    key: 'phosphorus',
    label: 'Фосфор (P)',
    color: '#f59e0b', // amber-500
    unit: 'кг/га',
    yAxisId: 'right',
    type: 'line',
  },
  {
    key: 'potassium',
    label: 'Калій (K)',
    color: '#ef4444', // red-500
    unit: 'кг/га',
    yAxisId: 'right',
    type: 'line',
  },
  {
    key: 'sulfur',
    label: 'Сірка (S)',
    color: '#eab308', // yellow-500
    unit: 'кг/га',
    yAxisId: 'right',
    type: 'line',
  },
  {
    key: 'calcium',
    label: 'Кальцій (Ca)',
    color: '#06b6d4', // cyan-500
    unit: 'кг/га',
    yAxisId: 'right',
    type: 'line',
  },
  {
    key: 'magnesium',
    label: 'Магній (Mg)',
    color: '#ec4899', // pink-500
    unit: 'кг/га',
    yAxisId: 'right',
    type: 'line',
  },
  {
    key: 'temperature',
    label: 'Температура',
    color: '#f97316', // orange-500
    unit: '°C',
    yAxisId: 'left',
    type: 'line',
  },
  {
    key: 'rainfall',
    label: 'Опади',
    color: '#0ea5e9', // sky-500
    unit: 'мм',
    yAxisId: 'left',
    type: 'bar',
  },
];

// Group metrics by category for better UX
export const METRIC_CATEGORIES = {
  soil: ['soilMoisture', 'soilPh'],
  nutrients: [
    'nitrogen',
    'phosphorus',
    'potassium',
    'sulfur',
    'calcium',
    'magnesium',
  ],
  weather: ['temperature', 'rainfall'],
} as const;

export const CATEGORY_LABELS = {
  soil: 'Ґрунт',
  nutrients: 'Поживні речовини',
  weather: 'Погода',
} as const;
