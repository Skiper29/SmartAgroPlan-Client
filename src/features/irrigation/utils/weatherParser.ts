import {
  Thermometer,
  CloudRain,
  Wind,
  type LucideIcon,
  Zap,
  Sun,
  Cloudy,
} from 'lucide-react';

export interface ParsedWeatherSummary {
  text: string;
  icon: LucideIcon;
  colorClassName: string;
}

// Map keywords from the backend to icons and styles
const weatherConditionMap: Record<
  string,
  Omit<ParsedWeatherSummary, 'text'>
> = {
  'дуже спекотно': {
    icon: Zap,
    colorClassName: 'text-red-500',
  },
  жарко: {
    icon: Sun,
    colorClassName: 'text-orange-500',
  },
  тепло: {
    icon: Thermometer,
    colorClassName: 'text-yellow-500',
  },
  помірно: {
    icon: Cloudy,
    colorClassName: 'text-gray-500',
  },
  'сильний дощ': {
    icon: CloudRain,
    colorClassName: 'text-blue-600',
  },
  'легкий дощ': {
    icon: CloudRain,
    colorClassName: 'text-sky-500',
  },
  'без опадів': {
    icon: Sun,
    colorClassName: 'text-gray-400',
  },
  вітряно: {
    icon: Wind,
    colorClassName: 'text-indigo-500',
  },
  спокійно: {
    icon: Wind,
    colorClassName: 'text-gray-400',
  },
};

export const parseWeatherSummary = (
  summary: string,
): ParsedWeatherSummary[] => {
  if (!summary) return [];

  return summary
    .split('\n')
    .map((line) => line.trim().toLowerCase())
    .filter(Boolean)
    .map((line) => {
      const style = weatherConditionMap[line] || {
        icon: Cloudy,
        colorClassName: 'text-gray-500',
      };
      // Capitalize the first letter for display
      const text = line.charAt(0).toUpperCase() + line.slice(1);
      return { ...style, text };
    });
};
