import React from 'react';
import { Calendar } from 'lucide-react';

export type TimePeriod = '7d' | '30d' | '90d' | '1y' | 'all' | 'custom';

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  onCustomRangeClick?: () => void;
  customRangeActive?: boolean;
  className?: string;
}

const TIME_PERIODS = [
  { value: '7d' as const, label: '7 днів' },
  { value: '30d' as const, label: '30 днів' },
  { value: '90d' as const, label: '90 днів' },
  { value: '1y' as const, label: '1 рік' },
  { value: 'all' as const, label: 'Всі дані' },
];

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  onCustomRangeClick,
  customRangeActive = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        Період:
      </span>

      {TIME_PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-lg transition-all
            ${
              selectedPeriod === period.value && !customRangeActive
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          {period.label}
        </button>
      ))}

      {onCustomRangeClick && (
        <button
          onClick={onCustomRangeClick}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-lg transition-all inline-flex items-center gap-2
            ${
              customRangeActive
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          <Calendar size={16} />
          Власний період
        </button>
      )}
    </div>
  );
};

export default TimePeriodSelector;
