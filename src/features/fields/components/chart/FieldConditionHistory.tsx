import React from 'react';
import { useFieldConditions } from '../../hooks/fieldConditions.hooks';
import FieldConditionChart from './FieldConditionChart';
import { Loader2, TrendingUp } from 'lucide-react';
import ErrorDisplay from '@/components/ErrorDisplay.tsx';

interface FieldConditionHistoryProps {
  fieldId: number;
  fieldName: string;
}

const FieldConditionHistory: React.FC<FieldConditionHistoryProps> = ({
  fieldId,
  fieldName,
}) => {
  const { data: conditions, isLoading, error } = useFieldConditions(fieldId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Завантаження історії стану поля...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error || new Error('Не вдалося завантажити історію стану поля.')}
        title="Помилка завантаження історії стану поля"
      />
    );
  }

  if (!conditions || conditions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-8 max-w-lg text-center">
          <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Історія стану поля поки що порожня
          </h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Додайте перший запис стану поля "{fieldName}", щоб побачити графіки
            та аналітику.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Знайдено записів:{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {conditions.length}
            </span>
          </p>
          {conditions.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Останнє оновлення:{' '}
              {new Date(
                conditions[conditions.length - 1].recordedAt,
              ).toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      </div>

      <FieldConditionChart conditions={conditions} />
    </div>
  );
};

export default FieldConditionHistory;
