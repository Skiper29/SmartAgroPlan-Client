import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import {
  useBatchIrrigationRecommendations,
  useBatchIrrigationRecommendationsMutation,
} from '../hooks/irrigation.hooks';
import IrrigationFieldCard from '../components/IrrigationFieldCard';
import { RefreshCw } from 'lucide-react';
import { IrrigationAction } from '../utils/irrigationUtils';
import { cn } from '@/lib/utils.ts';
import ErrorDisplay from '@/components/ErrorDisplay';
import IrrigationSummaryCards from '@/features/irrigation/components/IrrigationSummaryCards.tsx';

const IrrigationDashboardPage: React.FC = () => {
  const { data: fields = [], isLoading: isLoadingFields } = useFields();

  // Get field IDs - memoized to prevent unnecessary recalculations
  const fieldIds = useMemo(() => fields.map((f) => f.id), [fields]);

  // Use the cached query - this will reuse data from Dashboard if already fetched
  const {
    data: recommendations = [],
    isLoading: isLoadingRecommendations,
    error,
  } = useBatchIrrigationRecommendations(fieldIds, null, fieldIds.length > 0);

  // Use mutation for manual refresh (bypasses cache)
  const { mutate: forceRefresh, isPending: isRefreshing } =
    useBatchIrrigationRecommendationsMutation();

  const handleRefresh = () => {
    if (fieldIds.length > 0) {
      // Use mutation to force a fresh API call
      forceRefresh({ fieldIds });
    }
  };

  const { fieldsToIrrigate, totalWaterNeeded } = useMemo(() => {
    const fieldsToIrrigate = recommendations.filter(
      (rec) => rec.recommendedAction !== IrrigationAction.None,
    );
    const totalWaterNeeded = fieldsToIrrigate.reduce(
      (sum, rec) => sum + rec.grossIrrigationRequirement,
      0,
    );
    return {
      fieldsToIrrigate: fieldsToIrrigate.length,
      totalWaterNeeded: totalWaterNeeded.toFixed(1),
    };
  }, [recommendations]);

  const isLoading = isLoadingFields || isLoadingRecommendations || isRefreshing;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження рекомендацій...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleRefresh} />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
          Огляд Зрошення
        </h1>
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          variant="outline"
          size="lg"
        >
          <RefreshCw
            className={cn('h-5 w-5 mr-2', isLoading && 'animate-spin')}
          />
          Оновити
        </Button>
      </header>

      {/* Summary Cards */}
      <IrrigationSummaryCards
        fieldsNeedingIrrigation={fieldsToIrrigate}
        generalSoilMoistureDeficit={Number(totalWaterNeeded)}
        criticalSoilMoistureLevels={
          recommendations.filter(
            (rec) => rec.recommendedAction === IrrigationAction.VeryIntensive,
          ).length
        }
      />

      {/* Fields List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
          Рекомендації по полях
        </h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {recommendations.map((rec) => (
              <IrrigationFieldCard key={rec.fieldId} recommendation={rec} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Немає полів для відображення.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default IrrigationDashboardPage;
