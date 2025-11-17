import React from 'react';
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
  Plus,
  Calendar,
  Sparkles,
  Info,
  TrendingUp,
  Package,
} from 'lucide-react';
import { useSavedSeasonPlan } from '@/features/fertilizer/hooks';
import { useField } from '@/features/fields/hooks/fields.hooks';
import ErrorDisplay from '@/components/ErrorDisplay';
import {
  formatDateLong,
  getPrimaryNutrientsString,
  getStatusBadgeColor,
  sortApplicationsByDate,
} from '../utils/fertilizerUtils';
import { ApplicationMethodLabels, CropStageLabels } from '@/models/fertilizer';
import { cn } from '@/lib/utils';
import type { FertilizerApplication } from '@/models/fertilizer';

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
  } = useSavedSeasonPlan(fieldId);

  const handleGenerateNew = () => {
    navigate(`/fertilizer/generate-plan/${fieldId}`);
  };

  const handleRefresh = () => {
    refetchPlan();
  };

  const isLoading = isLoadingField || isLoadingPlan;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження планів...
          </p>
        </div>
      </div>
    );
  }

  if (planError) {
    return <ErrorDisplay error={planError} onRetry={handleRefresh} />;
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

  // No saved plans - show empty state
  if (!plan) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-8 pb-8">
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
                  {field.name} - Сезонний План
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {field.currentCrop?.name || 'Культура'}
                </p>
              </div>
            </div>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw
                className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')}
              />
              Оновити
            </Button>
          </div>
        </header>

        <Card className="shadow-xl border-2 border-dashed border-green-300 dark:border-green-700">
          <CardContent className="text-center py-20">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Немає збережених планів
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Створіть перший сезонний план добрив для цього поля
                </p>
              </div>
              <Button
                onClick={handleGenerateNew}
                size="lg"
                className="text-lg h-14 shadow-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Створити новий план
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sortedApplications: FertilizerApplication[] =
    plan && plan.applications ? sortApplicationsByDate(plan.applications) : [];

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
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
            >
              <RefreshCw
                className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')}
              />
              Оновити
            </Button>
            <Button onClick={handleGenerateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Новий план
            </Button>
          </div>
        </div>
      </header>

      {/* Plan Info Card */}
      <Card className="border-l-4 border-green-500 shadow-md">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <Info className="h-5 w-5 mr-2" />
                Інформація про план
              </CardTitle>
            </div>
            {plan.savedPlanId && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-300 dark:border-green-700">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                ID: {plan.savedPlanId}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Дата посіву</p>
              <p className="text-lg font-semibold">
                {new Date(plan.sowingDate).toLocaleDateString('uk-UA', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Очікуваний збір</p>
              <p className="text-lg font-semibold">
                {new Date(plan.expectedHarvestDate).toLocaleDateString(
                  'uk-UA',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  },
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Цільова врожайність
              </p>
              <p className="text-lg font-semibold">
                {plan.expectedYield.toFixed(1)} т/га
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Площа поля</p>
              <p className="text-lg font-semibold">
                {plan.fieldAreaHa.toFixed(2)} га
              </p>
            </div>
          </div>
          {plan.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-muted-foreground mb-1">Примітки:</p>
              <p className="text-sm">{plan.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nutrient Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Requirement Card */}
        <Card className="border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardTitle className="flex items-center text-blue-700 dark:text-blue-300 text-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Загальна потреба
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Азот (N)</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {plan.totalRequirement.nitrogen.toFixed(1)} кг/га
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Фосфор (P)
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {plan.totalRequirement.phosphorus.toFixed(1)} кг/га
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Калій (K)</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {plan.totalRequirement.potassium.toFixed(1)} кг/га
                </span>
              </div>
              {plan.totalRequirement.sulfur > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-muted-foreground">
                    Сірка (S)
                  </span>
                  <span className="text-base font-semibold text-blue-600 dark:text-blue-400">
                    {plan.totalRequirement.sulfur.toFixed(1)} кг/га
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Already Applied Card */}
        <Card className="border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardTitle className="flex items-center text-green-700 dark:text-green-300 text-lg">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Вже внесено
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Азот (N)</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {plan.alreadyApplied.nitrogen.toFixed(1)} кг/га
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Фосфор (P)
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {plan.alreadyApplied.phosphorus.toFixed(1)} кг/га
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Калій (K)</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {plan.alreadyApplied.potassium.toFixed(1)} кг/га
                </span>
              </div>
              {plan.alreadyApplied.sulfur > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-muted-foreground">
                    Сірка (S)
                  </span>
                  <span className="text-base font-semibold text-green-600 dark:text-green-400">
                    {plan.alreadyApplied.sulfur.toFixed(1)} кг/га
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Remaining to Apply Card */}
        <Card className="border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardTitle className="flex items-center text-orange-700 dark:text-orange-300 text-lg">
              <Package className="h-5 w-5 mr-2" />
              Залишилось внести
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Азот (N)</span>
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {plan.remainingToApply.nitrogen.toFixed(1)} кг/га
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Фосфор (P)
                </span>
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {plan.remainingToApply.phosphorus.toFixed(1)} кг/га
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Калій (K)</span>
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {plan.remainingToApply.potassium.toFixed(1)} кг/га
                </span>
              </div>
              {plan.remainingToApply.sulfur > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-muted-foreground">
                    Сірка (S)
                  </span>
                  <span className="text-base font-semibold text-orange-600 dark:text-orange-400">
                    {plan.remainingToApply.sulfur.toFixed(1)} кг/га
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Applications List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Заплановані внесення ({plan.applications?.length || 0})
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

      {/* Action Buttons */}
      <section className="flex gap-4">
        <Button
          onClick={() => navigate(`/fertilizer/balance/${fieldId}`)}
          variant="outline"
          className="flex-1"
        >
          Переглянути баланс
        </Button>
        <Button
          onClick={() => navigate(`/fertilizer/history/${fieldId}`)}
          variant="outline"
          className="flex-1"
        >
          Історія внесень
        </Button>
      </section>
    </div>
  );
};

export default FertilizerPlanPage;
