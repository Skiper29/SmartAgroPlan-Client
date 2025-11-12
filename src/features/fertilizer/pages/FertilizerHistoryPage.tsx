import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  useApplicationSummary,
  useApplicationsByDateRange,
} from '../hooks/fertilizer.hooks';
import { useField } from '@/features/fields/hooks/fields.hooks';
import SimpleNutrientTable from '../components/SimpleNutrientTable';
import DateRangeFilter from '../components/DateRangeFilter';
import ErrorDisplay from '@/components/ErrorDisplay';
import {
  formatDateLong,
  getPrimaryNutrientsString,
  getStatusBadgeColor,
  sortApplicationsByDate,
} from '../utils/fertilizerUtils';
import { cn } from '@/lib/utils';
import { CropStageLabels } from '@/models/fertilizer';

const FertilizerHistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = Number(id);

  // Date range for filtering
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3); // 3 months ago
    date.setHours(0, 0, 0, 0); // Start of day
    return date;
  });
  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3); // 3 months ahead
    date.setHours(23, 59, 59, 999); // End of day
    return date;
  });

  const { data: field, isLoading: isLoadingField } = useField(fieldId);

  // Convert dates to ISO strings for API calls
  const startDateStr = startDate ? startDate.toISOString().split('T')[0] : '';
  const endDateStr = endDate ? endDate.toISOString().split('T')[0] : '';

  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: summaryError,
    refetch: refetchSummary,
  } = useApplicationSummary(fieldId, startDateStr, endDateStr);

  const {
    data: applications = [],
    isLoading: isLoadingApplications,
    refetch: refetchApplications,
  } = useApplicationsByDateRange(fieldId, startDateStr, endDateStr);

  const handleRefresh = () => {
    refetchSummary();
    refetchApplications();
  };

  const sortedApplications = useMemo(() => {
    return sortApplicationsByDate(applications, false); // Most recent first
  }, [applications]);

  const isLoading = isLoadingField || isLoadingSummary || isLoadingApplications;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження історії...
          </p>
        </div>
      </div>
    );
  }

  if (summaryError) {
    return <ErrorDisplay error={summaryError} onRetry={handleRefresh} />;
  }

  if (!field) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Поле не знайдено</p>
        <Button onClick={() => navigate('/fertilizer')} className="mt-4">
          Повернутися до огляду
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/fertilizer')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {field.name} - Історія Внесень
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {field.currentCrop?.name || 'Немає культури'}
              </p>
            </div>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
          >
            <RefreshCw
              className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')}
            />
            Оновити
          </Button>
        </div>
      </header>

      {/* Date Filter */}
      <section>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApply={handleRefresh}
          isLoading={isLoading}
        />
      </section>

      {/* Summary */}
      {summary && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Підсумок за період</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Виконано
                    </p>
                    <p className="text-xl font-bold">
                      {summary.completedApplications}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Заплановано
                    </p>
                    <p className="text-xl font-bold">
                      {summary.pendingApplications}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nutrients Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                    Вже внесено:
                  </p>
                  <p className="font-mono text-sm">
                    {getPrimaryNutrientsString(summary.totalApplied)}
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-3">
                  <p className="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-1">
                    Заплановано:
                  </p>
                  <p className="font-mono text-sm">
                    {getPrimaryNutrientsString(summary.plannedToApply)}
                  </p>
                </div>
              </div>

              {/* Detailed Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <SimpleNutrientTable
                  nutrients={summary.totalApplied}
                  title="Внесено (детально)"
                />
                <SimpleNutrientTable
                  nutrients={summary.plannedToApply}
                  title="Заплановано (детально)"
                />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Applications List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Внесення ({sortedApplications.length})
        </h2>

        {sortedApplications.length > 0 ? (
          <div className="space-y-4">
            {sortedApplications.map((application, index) => {
              const statusBadgeColor = getStatusBadgeColor(
                application.isCompleted,
                application.recommendedDate,
              );

              return (
                <Card key={application.id || index} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${statusBadgeColor} text-white`}>
                            {application.isCompleted ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Виконано
                              </>
                            ) : new Date(application.recommendedDate) <
                              new Date() ? (
                              <>
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Прострочено
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Заплановано
                              </>
                            )}
                          </Badge>
                          <span className="text-lg font-semibold">
                            {formatDateLong(application.recommendedDate)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {CropStageLabels[
                            application.cropStage as keyof typeof CropStageLabels
                          ] || application.cropStage}{' '}
                          • {application.daysAfterPlanting} днів після посіву
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nutrients */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Поживні речовини:
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                          <p className="font-mono text-sm">
                            {getPrimaryNutrientsString(
                              application.nutrientsToApply,
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Products */}
                      {application.products &&
                        application.products.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Добрива:
                            </h4>
                            <div className="space-y-1">
                              {application.products.map((product) => (
                                <div
                                  key={product.id}
                                  className="text-sm bg-blue-50 dark:bg-blue-900/20 rounded px-2 py-1"
                                >
                                  {product.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Rationale */}
                    {application.rationale && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Обґрунтування:
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.rationale}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Немає внесень за вибраний період
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default FertilizerHistoryPage;
