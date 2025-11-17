import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Save,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  useCalculateSeasonPlan,
  useSaveSeasonPlan,
} from '@/features/fertilizer/hooks';
import { useField } from '@/features/fields/hooks/fields.hooks';
import SeasonPlanCard from '../components/cards/SeasonPlanCard.tsx';
import NutrientTable from '../components/nutrient/NutrientTable.tsx';
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

const GenerateSeasonPlanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = Number(id);

  const [targetYield, setTargetYield] = useState<number | undefined>(undefined);
  const [sowingDate, setSowingDate] = useState<string | undefined>(undefined);
  const [hasGenerated, setHasGenerated] = useState(false);

  const { data: field, isLoading: isLoadingField } = useField(fieldId);

  const {
    data: plan,
    isLoading: isLoadingPlan,
    error: planError,
    refetch: refetchPlan,
  } = useCalculateSeasonPlan(
    fieldId,
    targetYield,
    sowingDate,
    hasGenerated, // Only fetch after user clicks generate
  );

  const { mutate: savePlan, isPending: isSaving } = useSaveSeasonPlan();

  const handleGenerate = () => {
    setHasGenerated(true);
  };

  const handleSavePlan = () => {
    if (!plan) return;

    savePlan(
      {
        fieldId: plan.fieldId,
        targetYield: targetYield || plan.expectedYield,
        sowingDate: sowingDate || plan.sowingDate,
      },
      {
        onSuccess: () => {
          alert('План успішно збережено!');
          // Navigate to the saved plan view
          navigate(`/fertilizer/plan/${fieldId}`);
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

  if (isLoadingField) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження інформації про поле...
          </p>
        </div>
      </div>
    );
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

  const sortedApplications =
    plan && plan.applications ? sortApplicationsByDate(plan.applications) : [];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg px-8 py-6 border-b-2 border-green-600 dark:border-green-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/fertilizer/plan/${fieldId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                Генерувати новий план
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {field.name} • {field.currentCrop?.name || 'Культура'}
              </p>
            </div>
          </div>
          {plan && (
            <div className="flex gap-2">
              <Button
                onClick={handleRegenerate}
                disabled={isLoadingPlan}
                variant="outline"
              >
                <RefreshCw
                  className={cn(
                    'h-4 w-4 mr-2',
                    isLoadingPlan && 'animate-spin',
                  )}
                />
                Перегенерувати
              </Button>
              <Button onClick={handleSavePlan} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Збереження...' : 'Зберегти план'}
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Generation Form */}
      {!hasGenerated && (
        <Card className="shadow-lg border-2 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
              Параметри генерації плану
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="targetYield" className="text-xl">
                  Цільова врожайність (т/га)
                </Label>
                <Input
                  id="targetYield"
                  type="number"
                  step="0.1"
                  placeholder="Залиште порожнім для автоматичного розрахунку"
                  value={targetYield || ''}
                  onChange={(e) =>
                    setTargetYield(
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  className="text-lg"
                />
                <p className="text-xm text-muted-foreground">
                  Опціонально: вкажіть бажану врожайність
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sowingDate" className="text-xl">
                  Дата посіву
                </Label>
                <Input
                  id="sowingDate"
                  type="date"
                  value={sowingDate || ''}
                  onChange={(e) => setSowingDate(e.target.value || undefined)}
                  className="text-lg"
                />
                <p className="text-xm text-muted-foreground">
                  Опціонально: вкажіть дату посіву
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-lg font-medium text-blue-900 dark:text-blue-100">
                    Інформація про генерацію
                  </p>
                  <p className="text-xm text-blue-700 dark:text-blue-300">
                    Система автоматично розрахує оптимальний план внесення
                    добрив на основі стану ґрунту, культури та погодних умов. Ви
                    можете вказати додаткові параметри або залишити поля
                    порожніми для автоматичного розрахунку.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              size="lg"
              className="w-full text-lg h-14 shadow-lg"
              disabled={isLoadingPlan}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Генерувати план
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {hasGenerated && isLoadingPlan && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
            <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
              Генерую оптимальний план...
            </p>
            <p className="text-sm text-muted-foreground">
              Аналізую дані про ґрунт, культуру та погоду
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasGenerated && planError && (
        <ErrorDisplay error={planError} onRetry={handleRegenerate} />
      )}

      {/* Generated Plan */}
      {hasGenerated && plan && (
        <>
          {/* Season Plan Overview */}
          <section>
            <SeasonPlanCard plan={plan} />
          </section>

          {/* Detailed Nutrient Table */}
          <section>
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardTitle>Детальний баланс поживних речовин</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Заплановані внесення ({plan.applications.length})
              </h2>
            </div>

            {sortedApplications.length > 0 ? (
              <div className="space-y-4">
                {sortedApplications.map((application, index) => {
                  const statusBadgeColor = getStatusBadgeColor(
                    application.isCompleted,
                    application.recommendedDate,
                  );

                  return (
                    <Card
                      key={application.id || index}
                      className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800/50 dark:to-green-900/20">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge
                                className={`${statusBadgeColor} text-white`}
                              >
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
                                🌱 {application.daysAfterPlanting} днів після
                                посіву
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
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded p-3">
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
                                    className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded p-3 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
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
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
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
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
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
        </>
      )}
    </div>
  );
};

export default GenerateSeasonPlanPage;
