import React, { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import { FERTILIZER_PLANNING_KEYS } from '@/features/fertilizer/hooks';
import { fertilizerPlanningApi } from '@/features/fertilizer/api';
import FertilizerFieldCard from '../components/cards/FertilizerFieldCard.tsx';
import NutrientDeficitCard from '../components/cards/NutrientDeficitCard.tsx';
import FieldNutrientBalanceCard from '../components/cards/FieldNutrientBalanceCard.tsx';
import UpcomingApplicationCard from '../components/cards/UpcomingApplicationCard.tsx';
import DashboardStatsSection from '../components/sections/DashboardStatsSection.tsx';
import {
  RefreshCw,
  TrendingDown,
  Activity,
  Calendar,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ErrorDisplay from '@/components/ErrorDisplay';
import type {
  CurrentRecommendation,
  NutrientBalance,
  NutrientDeficitAnalysis,
  FertilizerApplication,
} from '@/models/fertilizer';
import { useNavigate } from 'react-router-dom';

const FertilizerDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: fields = [],
    isLoading: isLoadingFields,
    error: fieldsError,
    refetch: refetchFields,
  } = useFields();

  // Fetch recommendations for all fields
  const recommendationQueries = useQueries({
    queries: fields.map((field) => ({
      queryKey: FERTILIZER_PLANNING_KEYS.currentRecommendation(field.id),
      queryFn: () => fertilizerPlanningApi.getCurrentRecommendation(field.id),
      staleTime: 2 * 60 * 1000,
      enabled: !!field.id,
    })),
  });

  // Fetch nutrient balance for all fields
  const balanceQueries = useQueries({
    queries: fields.map((field) => ({
      queryKey: ['fertilizer', 'analysis', 'balances', field.id],
      queryFn: () =>
        import('@/features/fertilizer/api').then((api) =>
          api.fertilizerAnalysisApi.getNutrientBalance(field.id),
        ),
      staleTime: 2 * 60 * 1000,
      enabled: !!field.id,
    })),
  });

  // Fetch deficit analysis for all fields
  const deficitQueries = useQueries({
    queries: fields.map((field) => ({
      queryKey: ['fertilizer', 'analysis', 'deficits', field.id],
      queryFn: () =>
        import('@/features/fertilizer/api').then((api) =>
          api.fertilizerAnalysisApi.analyzeNutrientDeficit(field.id),
        ),
      staleTime: 2 * 60 * 1000,
      enabled: !!field.id,
    })),
  });

  // Fetch upcoming applications for all fields (next 30 days)
  const upcomingQueries = useQueries({
    queries: fields.map((field) => ({
      queryKey: [
        'fertilizer',
        'applications',
        'upcoming',
        { fieldId: field.id, daysAhead: 30 },
      ],
      queryFn: () =>
        import('@/features/fertilizer/api').then((api) =>
          api.fertilizerApplicationsApi.getUpcomingApplications(field.id, 30),
        ),
      staleTime: 2 * 60 * 1000,
      enabled: !!field.id,
    })),
  });

  // Extract data from queries
  const recommendationsArray = useMemo(() => {
    return recommendationQueries
      .filter((query) => query.data)
      .map((query) => query.data as CurrentRecommendation);
  }, [recommendationQueries]);

  const balancesArray = useMemo(() => {
    return balanceQueries
      .filter((query) => query.data)
      .map((query) => query.data as NutrientBalance);
  }, [balanceQueries]);

  const deficitsArray = useMemo(() => {
    return deficitQueries
      .filter((query) => query.data)
      .map((query) => query.data as NutrientDeficitAnalysis);
  }, [deficitQueries]);

  const upcomingArray = useMemo(() => {
    return upcomingQueries
      .filter((query) => query.data)
      .map((query) => query.data as FertilizerApplication[]);
  }, [upcomingQueries]);

  // Collect all urgent deficits
  const urgentDeficits = useMemo(() => {
    return deficitsArray.flatMap((analysis) =>
      analysis.deficits
        .filter(
          (deficit) =>
            deficit.urgency === 'Critical' || deficit.urgency === 'High',
        )
        .map((deficit) => ({
          fieldId: analysis.fieldId,
          fieldName: analysis.fieldName,
          deficit,
        })),
    );
  }, [deficitsArray]);

  // Get all upcoming applications sorted by date
  const allUpcoming = useMemo(() => {
    return upcomingArray
      .flatMap((apps, index) =>
        apps.map((app) => ({
          application: app,
          fieldName: fields[index]?.name || `Поле #${fields[index]?.id}`,
          fieldId: fields[index]?.id,
        })),
      )
      .sort(
        (a, b) =>
          new Date(a.application.recommendedDate).getTime() -
          new Date(b.application.recommendedDate).getTime(),
      )
      .slice(0, 6); // Show only first 6
  }, [upcomingArray, fields]);

  const isLoading =
    isLoadingFields ||
    recommendationQueries.some((q) => q.isLoading) ||
    balanceQueries.some((q) => q.isLoading) ||
    deficitQueries.some((q) => q.isLoading) ||
    upcomingQueries.some((q) => q.isLoading);

  const handleRefresh = () => {
    refetchFields();
    recommendationQueries.forEach((query) => query.refetch());
    balanceQueries.forEach((query) => query.refetch());
    deficitQueries.forEach((query) => query.refetch());
    upcomingQueries.forEach((query) => query.refetch());
  };

  if (isLoading && fields.length === 0) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження даних...
          </p>
        </div>
      </div>
    );
  }

  if (fieldsError) {
    return <ErrorDisplay error={fieldsError} onRetry={handleRefresh} />;
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-between px-8 py-6 border-b-2 border-green-600 dark:border-green-500">
        <div>
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
            Планування Добрив
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Комплексний аналіз поживних речовин та рекомендації
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          variant="outline"
          size="lg"
          className="shadow-md"
        >
          <RefreshCw
            className={cn('h-5 w-5 mr-2', isLoading && 'animate-spin')}
          />
          Оновити
        </Button>
      </header>

      {/* Dashboard Stats Section */}
      <DashboardStatsSection
        nutrientBalances={balancesArray}
        deficitAnalyses={deficitsArray}
        upcomingApplications={upcomingArray}
        isLoading={isLoading}
      />

      {/* Urgent Deficits Section */}
      {urgentDeficits.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Критичні дефіцити
            </h2>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-semibold">
              {urgentDeficits.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {urgentDeficits.slice(0, 8).map((item, index) => (
              <NutrientDeficitCard
                key={`${item.fieldId}-${index}`}
                fieldId={item.fieldId}
                fieldName={item.fieldName}
                deficit={item.deficit}
                onClick={() => navigate(`/fertilizer/plan/${item.fieldId}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Field Nutrient Balance Analysis Section */}
      {balancesArray.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Баланс поживних речовин
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {balancesArray.map((balance) => (
              <FieldNutrientBalanceCard
                key={balance.fieldId}
                balance={balance}
                onClick={() => navigate(`/fertilizer/plan/${balance.fieldId}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Applications Timeline Section */}
      {allUpcoming.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Наступні внесення
            </h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold">
              {allUpcoming.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUpcoming.map((item, index) => (
              <UpcomingApplicationCard
                key={`${item.fieldId}-${index}`}
                application={item.application}
                fieldName={item.fieldName}
                onClick={() => navigate(`/fertilizer/plan/${item.fieldId}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Current Recommendations Section */}
      {recommendationsArray.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Поточні рекомендації по полях
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendationsArray.map((rec) => (
              <FertilizerFieldCard key={rec.fieldId} recommendation={rec} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Почніть з додавання поля
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Додайте поля та посіви, щоб отримати рекомендації з планування
              добрив
            </p>
            <Button
              onClick={() => navigate('/fields')}
              className="mt-4"
              size="lg"
            >
              Додати поле
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerDashboardPage;
