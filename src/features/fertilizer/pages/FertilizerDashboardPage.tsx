import React, { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import { FERTILIZER_PLANNING_KEYS } from '@/features/fertilizer/hooks';
import { fertilizerPlanningApi } from '@/features/fertilizer/api';
import FertilizerFieldCard from '../components/FertilizerFieldCard';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import ErrorDisplay from '@/components/ErrorDisplay';
import type { CurrentRecommendation } from '@/models/fertilizer';
import { FertilizerSummaryCards } from '@/features/fertilizer/components/FertilizerSummaryCards';

const FertilizerDashboardPage: React.FC = () => {
  const {
    data: fields = [],
    isLoading: isLoadingFields,
    error: fieldsError,
    refetch: refetchFields,
  } = useFields();

  // Fetch recommendations for all fields using useQueries
  const recommendationQueries = useQueries({
    queries: fields.map((field) => ({
      queryKey: FERTILIZER_PLANNING_KEYS.currentRecommendation(field.id),
      queryFn: () => fertilizerPlanningApi.getCurrentRecommendation(field.id),
      staleTime: 2 * 60 * 1000, // 2 minutes
      enabled: !!field.id,
    })),
  });

  // Extract successful recommendations
  const recommendationsArray = useMemo(() => {
    return recommendationQueries
      .filter((query) => query.data)
      .map((query) => query.data as CurrentRecommendation);
  }, [recommendationQueries]);

  // Check if any queries are still loading
  const isLoadingRecommendations = recommendationQueries.some(
    (query) => query.isLoading,
  );

  const handleRefresh = () => {
    refetchFields();
    recommendationQueries.forEach((query) => query.refetch());
  };

  // Calculate summary statistics
  const { needsAttention, upcomingApplications, criticalFields } =
    useMemo(() => {
      const needsAttention = recommendationsArray.filter(
        (rec) => rec.shouldApplyNow,
      ).length;
      const upcomingApplications = recommendationsArray.filter(
        (rec) => rec.shouldApplyNow && rec.priority !== 'Low',
      ).length;
      const criticalFields = recommendationsArray.filter(
        (rec) => rec.priority === 'Critical',
      ).length;

      return {
        needsAttention,
        upcomingApplications,
        criticalFields,
      };
    }, [recommendationsArray]);

  const isLoading = isLoadingFields || isLoadingRecommendations;

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

  if (fieldsError) {
    return <ErrorDisplay error={fieldsError} onRetry={handleRefresh} />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
          Планування Добрив
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
      <FertilizerSummaryCards
        needsAttention={needsAttention}
        upcomingApplications={upcomingApplications}
        criticalFields={criticalFields}
      />

      {/* Fields List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
          Рекомендації по полях
        </h2>
        {recommendationsArray.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendationsArray.map((rec) => (
              <FertilizerFieldCard key={rec.fieldId} recommendation={rec} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              {fields.length === 0
                ? 'Немає доступних рекомендацій. Додайте поля та посіви для початку.'
                : 'Завантаження рекомендацій...'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default FertilizerDashboardPage;
