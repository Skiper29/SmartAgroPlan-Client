import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Save,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  useCalculateSeasonPlan,
  useSaveSeasonPlan,
} from '@/features/fertilizer/hooks';
import { useField } from '@/features/fields/hooks/fields.hooks';
import SeasonPlanCard from '../components/SeasonPlanCard';
import NutrientTable from '../components/NutrientTable';
import ErrorDisplay from '@/components/ErrorDisplay';
import { extractErrorMessage } from '@/types/api-error.type';
import {
  formatDateLong,
  getPrimaryNutrientsString,
  getStatusBadgeColor,
  sortApplicationsByDate,
} from '../utils/fertilizerUtils';
import { ApplicationMethodLabels, CropStageLabels } from '@/models/fertilizer';
import { createEmptyNutrientRequirement } from '@/models/fertilizer/nutrient-requirement.model';
import { cn } from '@/lib/utils';

const FertilizerPlanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = Number(id);

  const { data: field, isLoading: isLoadingField } = useField(fieldId);
  const {
    data: plan,
    isLoading: isLoadingPlan,
    error: planError,
    refetch: refetchPlan,
  } = useCalculateSeasonPlan(fieldId, undefined, undefined);

  const { mutate: savePlan, isPending: isSaving } = useSaveSeasonPlan();

  const handleSavePlan = () => {
    if (!plan) return;

    savePlan(
      {
        fieldId: plan.fieldId,
        targetYield: plan.expectedYield,
        sowingDate: plan.sowingDate,
      },
      {
        onSuccess: () => {
          alert('План успішно збережено!');
          refetchPlan();
        },
        onError: (error) => {
          alert(`Помилка збереження плану: ${extractErrorMessage(error)}`);
        },
      },
    );
  };

  const handleRegenerate = () => {
    refetchPlan();
  };

  const isLoading = isLoadingField || isLoadingPlan;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження плану...
          </p>
        </div>
      </div>
    );
  }

  if (planError) {
    return <ErrorDisplay error={planError} onRetry={handleRegenerate} />;
  }

  if (!plan || !field) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">План не знайдено</p>
        <Button onClick={() => navigate('/fertilizer')} className="mt-4">
          Повернутися до огляду
        </Button>
      </div>
    );
  }

  const sortedApplications = sortApplicationsByDate(plan.applications);

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
                {plan.fieldName} - Сезонний План
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {plan.cropName}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRegenerate}
              disabled={isLoading}
              variant="outline"
            >
              <RefreshCw
                className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')}
              />
              Перегенерувати
            </Button>
            {!plan.isSaved && (
              <Button onClick={handleSavePlan} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Збереження...' : 'Зберегти план'}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Season Plan Overview */}
      <section>
        <SeasonPlanCard plan={plan} />
      </section>

      {/* Detailed Nutrient Table */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Детальний баланс поживних речовин</CardTitle>
          </CardHeader>
          <CardContent>
            <NutrientTable
              required={plan.totalSeasonRequirement}
              available={plan.soilSupply}
              applied={plan.alreadyApplied}
              deficit={plan.remainingToApply}
              surplus={createEmptyNutrientRequirement()}
            />
          </CardContent>
        </Card>
      </section>

      {/* Applications List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Заплановані внесення ({plan.applications.length})
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
                            ) : (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Заплановано
                              </>
                            )}
                          </Badge>
                          <CardTitle className="text-lg">
                            {index + 1}.{' '}
                            {CropStageLabels[
                              application.cropStage as keyof typeof CropStageLabels
                            ] || application.cropStage}
                          </CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            📅 {formatDateLong(application.recommendedDate)}
                          </span>
                          <span>
                            🌱 {application.daysAfterPlanting} днів після посіву
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-4">
                    {/* Nutrients */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Поживні речовини:
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                        <p className="font-mono text-sm font-semibold">
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
                            Рекомендовані добрива:
                          </h4>
                          <div className="space-y-2">
                            {application.products.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded p-2"
                              >
                                <span className="text-sm font-medium">
                                  {product.name}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  NPK: {product.nitrogenContent}-
                                  {product.phosphorusContent}-
                                  {product.potassiumContent}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Application Method */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Метод внесення:
                      </h4>
                      <p className="text-sm">
                        {ApplicationMethodLabels[
                          application.applicationMethod as keyof typeof ApplicationMethodLabels
                        ] || application.applicationMethod}
                      </p>
                    </div>

                    {/* Rationale */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Обґрунтування:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {application.rationale}
                      </p>
                    </div>

                    {/* Weather Considerations */}
                    {application.weatherConsiderations && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                          Погодні умови:
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {application.weatherConsiderations}
                        </p>
                      </div>
                    )}

                    {/* Warnings */}
                    {application.warnings && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-3">
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                              Попередження:
                            </h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              {application.warnings}
                            </p>
                          </div>
                        </div>
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
                Немає запланованих внесень для цього поля
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default FertilizerPlanPage;
