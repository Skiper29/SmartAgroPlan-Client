import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle2, Package } from 'lucide-react';
import type { NutrientRequirement } from '@/models/fertilizer';

interface NutrientSummaryCardsProps {
  totalRequirement: NutrientRequirement;
  alreadyApplied: NutrientRequirement;
  remainingToApply: NutrientRequirement;
}

const NutrientSummaryCards: React.FC<NutrientSummaryCardsProps> = ({
  totalRequirement,
  alreadyApplied,
  remainingToApply,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Requirement Card */}
      <Card className="border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700 dark:text-blue-300 text-xl">
            <TrendingUp className="h-5 w-5 mr-2" />
            Загальна потреба
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Азот (N)</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {totalRequirement.nitrogen.toFixed(1)} кг/га
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Фосфор (P)</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {totalRequirement.phosphorus.toFixed(1)} кг/га
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Калій (K)</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {totalRequirement.potassium.toFixed(1)} кг/га
              </span>
            </div>
            {totalRequirement.sulfur > 0 && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-muted-foreground">Сірка (S)</span>
                <span className="text-base font-semibold text-blue-600 dark:text-blue-400">
                  {totalRequirement.sulfur.toFixed(1)} кг/га
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Already Applied Card */}
      <Card className="border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700 dark:text-green-300 text-xl">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Вже внесено
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Азот (N)</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {alreadyApplied.nitrogen.toFixed(1)} кг/га
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Фосфор (P)</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {alreadyApplied.phosphorus.toFixed(1)} кг/га
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Калій (K)</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {alreadyApplied.potassium.toFixed(1)} кг/га
              </span>
            </div>
            {alreadyApplied.sulfur > 0 && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-muted-foreground">Сірка (S)</span>
                <span className="text-base font-semibold text-green-600 dark:text-green-400">
                  {alreadyApplied.sulfur.toFixed(1)} кг/га
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Remaining to Apply Card */}
      <Card className="border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700 dark:text-orange-300 text-xl">
            <Package className="h-5 w-5 mr-2" />
            Залишилось внести
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Азот (N)</span>
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {remainingToApply.nitrogen.toFixed(1)} кг/га
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Фосфор (P)</span>
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {remainingToApply.phosphorus.toFixed(1)} кг/га
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Калій (K)</span>
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {remainingToApply.potassium.toFixed(1)} кг/га
              </span>
            </div>
            {remainingToApply.sulfur > 0 && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-muted-foreground">Сірка (S)</span>
                <span className="text-base font-semibold text-orange-600 dark:text-orange-400">
                  {remainingToApply.sulfur.toFixed(1)} кг/га
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default NutrientSummaryCards;

