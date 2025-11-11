import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';
import {
  useNutrientBalance,
  useNutrientDeficit,
} from '../hooks/fertilizer.hooks';
import { useField } from '@/features/fields/hooks/fields.hooks';
import NutrientTable from '../components/NutrientTable';
import ErrorDisplay from '@/components/ErrorDisplay';
import { getNutrientNameUA } from '../utils/fertilizerUtils';
import { cn } from '@/lib/utils';
import { DeficitUrgencyLabels } from '@/models/fertilizer';
import NutrientBalanceStatusCard from '@/features/fertilizer/components/NutrientBalanceStatusCard.tsx';

const FertilizerBalancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = Number(id);

  const { data: field, isLoading: isLoadingField } = useField(fieldId);
  const {
    data: balance,
    isLoading: isLoadingBalance,
    error: balanceError,
    refetch: refetchBalance,
  } = useNutrientBalance(fieldId);

  const {
    data: deficitAnalysis,
    isLoading: isLoadingDeficit,
    refetch: refetchDeficit,
  } = useNutrientDeficit(fieldId);

  const handleRefresh = () => {
    refetchBalance();
    refetchDeficit();
  };

  const isLoading = isLoadingField || isLoadingBalance || isLoadingDeficit;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження балансу...
          </p>
        </div>
      </div>
    );
  }

  if (balanceError) {
    return <ErrorDisplay error={balanceError} onRetry={handleRefresh} />;
  }

  if (!balance || !field) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Баланс не знайдено</p>
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
                {balance.fieldName} - Баланс Поживних Речовин
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {balance.cropName}
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

      {/* Overall Status */}
      <NutrientBalanceStatusCard balance={balance} />

      {/* Nutrient Balance Table */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Баланс поживних речовин
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NutrientTable
              nutrients={balance.deficit}
              showComparison={true}
              comparison={{
                required: balance.requiredForTargetYield,
                available: balance.availableInSoil,
                applied: balance.alreadyApplied,
              }}
            />
          </CardContent>
        </Card>
      </section>

      {/* Deficit Analysis */}
      {deficitAnalysis && deficitAnalysis.deficits.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-orange-500" />
            Виявлені дефіцити
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {deficitAnalysis.deficits.map((deficit, index) => {
              const urgencyColor =
                deficit.urgency === 'Critical'
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : deficit.urgency === 'High'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';

              return (
                <Card key={index} className={`border-l-4 ${urgencyColor}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {getNutrientNameUA(deficit.nutrientName)}
                      </CardTitle>
                      <Badge variant="outline">
                        {DeficitUrgencyLabels[
                          deficit.urgency as keyof typeof DeficitUrgencyLabels
                        ] || deficit.urgency}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Дефіцит:{' '}
                      </span>
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                        {Math.abs(deficit.deficitAmount).toFixed(1)} кг/га
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Симптоми:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {deficit.symptoms}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {balance.recommendations && balance.recommendations.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Рекомендації</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {balance.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">
                      ✓
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {recommendation}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Warnings */}
      {balance.warnings && balance.warnings.length > 0 && (
        <section>
          <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Попередження
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {balance.warnings.map((warning, index) => (
                  <li
                    key={index}
                    className="text-sm text-yellow-700 dark:text-yellow-300"
                  >
                    • {warning}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Action Buttons */}
      <section className="flex gap-4">
        <Button
          onClick={() => navigate(`/fertilizer/plan/${fieldId}`)}
          className="flex-1"
        >
          Переглянути план внесень
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

export default FertilizerBalancePage;
