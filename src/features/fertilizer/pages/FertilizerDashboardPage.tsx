import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import { fertilizerApi } from '../api/fertilizer.api';
import FertilizerFieldCard from '../components/FertilizerFieldCard';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import ErrorDisplay from '@/components/ErrorDisplay';
import type { CurrentRecommendation } from '@/models/fertilizer';
import { FertilizerSummaryCards } from '@/features/fertilizer/components/FertilizerSummaryCards';

const FertilizerDashboardPage: React.FC = () => {
  const {
    data: fields = [],
    isLoading: isLoadingFields,
    error: fieldsError,
  } = useFields();

  const [recommendations, setRecommendations] = useState<
    CurrentRecommendation[]
  >([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [recommendationsError, setRecommendationsError] =
    useState<Error | null>(null);

  // Fetch recommendations for all fields
  const fetchRecommendations = async () => {
    if (fields.length === 0) return;

    setIsLoadingRecommendations(true);
    setRecommendationsError(null);

    try {
      const promises = fields.map((field) =>
        fertilizerApi.getCurrentRecommendation(field.id).catch(() => null),
      );
      const results = await Promise.all(promises);
      setRecommendations(
        results.filter((rec) => rec !== null) as CurrentRecommendation[],
      );
    } catch (error) {
      setRecommendationsError(error as Error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length]);

  const handleRefresh = () => {
    fetchRecommendations();
  };

  const { needsAttention, upcomingApplications, criticalFields } =
    useMemo(() => {
      const needsAttention = recommendations.filter(
        (rec) => rec.shouldApplyNow,
      ).length;
      const upcomingApplications = recommendations.filter(
        (rec) => rec.shouldApplyNow && rec.priority !== 'Low',
      ).length;
      const criticalFields = recommendations.filter(
        (rec) => rec.priority === 'Critical',
      ).length;

      return {
        needsAttention,
        upcomingApplications,
        criticalFields,
      };
    }, [recommendations]);

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

  if (recommendationsError && recommendations.length === 0) {
    return (
      <ErrorDisplay error={recommendationsError} onRetry={handleRefresh} />
    );
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
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <FertilizerFieldCard key={rec.fieldId} recommendation={rec} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Немає доступних рекомендацій. Додайте поля та посіви для початку.
            </p>
          </div>
        )}
      </section>

      {/* Errors notice */}
      {recommendationsError && recommendations.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Помилка завантаження деяких полів
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Деякі рекомендації можуть бути недоступні. Дані можуть бути
                неповними.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerDashboardPage;
