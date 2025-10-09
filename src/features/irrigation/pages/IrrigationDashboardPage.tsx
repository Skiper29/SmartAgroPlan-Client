import React, { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import { useBatchIrrigationRecommendations } from '../hooks/irrigation.hooks';
import IrrigationFieldCard from '../components/IrrigationFieldCard';
import { AlertTriangle, Droplets, CloudDrizzle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IrrigationAction } from '../utils/irrigationUtils';
import { cn } from '@/lib/utils.ts';

const IrrigationDashboardPage: React.FC = () => {
  const { data: fields = [], isLoading: isLoadingFields } = useFields();
  const {
    mutate: getRecommendations,
    data: recommendations = [],
    isPending: isLoadingRecommendations,
    error,
  } = useBatchIrrigationRecommendations();

  useEffect(() => {
    if (fields.length > 0) {
      const fieldIds = fields.map((f) => f.id);
      getRecommendations({ fieldIds });
    }
  }, [fields, getRecommendations]);

  const handleRefresh = () => {
    const fieldIds = fields.map((f) => f.id);
    if (fieldIds.length > 0) {
      getRecommendations({ fieldIds });
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

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Помилка завантаження даних: {error.message}
      </div>
    );
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Потребують зрошення
            </CardTitle>
            <CloudDrizzle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fieldsToIrrigate}</div>
            <p className="text-xs text-muted-foreground">
              полів потребують уваги
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Загальна потреба
            </CardTitle>
            <Droplets className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWaterNeeded} мм</div>
            <p className="text-xs text-muted-foreground">
              сумарно для всіх полів
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Критичні поля</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                recommendations.filter(
                  (rec) =>
                    rec.recommendedAction === IrrigationAction.VeryIntensive,
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              з дуже інтенсивним поливом
            </p>
          </CardContent>
        </Card>
      </section>

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
