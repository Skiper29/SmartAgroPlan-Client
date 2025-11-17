import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle, RefreshCw, Info } from 'lucide-react';
import {
  useNutrientBalance,
  useNutrientDeficit,
} from '@/features/fertilizer/hooks';
import { useField } from '@/features/fields/hooks/fields.hooks';
import ErrorDisplay from '@/components/ErrorDisplay';
import { cn } from '@/lib/utils';
import NutrientBalanceStatusCard from '@/features/fertilizer/components/nutrient/NutrientBalanceStatusCard.tsx';
import NutrientBalanceDetailCard from '@/features/fertilizer/components/nutrient/NutrientBalanceDetailCard.tsx';
import NutrientDeficitAnalysisSection from '@/features/fertilizer/components/nutrient/NutrientDeficitAnalysisSection.tsx';
import RecommendationItem from '@/features/fertilizer/components/RecommendationItem.tsx';
import WarningItem from '@/features/fertilizer/components/WarningItem.tsx';

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
      <NutrientBalanceDetailCard balance={balance} />

      {/* Deficit Analysis */}
      {deficitAnalysis && (
        <NutrientDeficitAnalysisSection deficitAnalysis={deficitAnalysis} />
      )}

      {/* Recommendations */}
      {balance.recommendations && balance.recommendations.length > 0 && (
        <section>
          <Card className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <Info className="h-5 w-5 mr-2" />
                Рекомендації
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 divide-y divide-green-200 dark:divide-green-800/50">
                {balance.recommendations.map((recommendation, index) => (
                  <RecommendationItem
                    key={index}
                    recommendation={recommendation}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Warnings */}
      {balance.warnings && balance.warnings.length > 0 && (
        <section>
          <Card className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Попередження
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 divide-y divide-yellow-200 dark:divide-yellow-800/50">
                {balance.warnings.map((warning, index) => (
                  <WarningItem key={index} warning={warning} />
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
