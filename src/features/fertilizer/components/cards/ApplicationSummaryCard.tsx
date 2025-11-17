import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import SimpleNutrientTable from '../tables/SimpleNutrientTable.tsx';
import { getPrimaryNutrientsString } from '../../utils/fertilizerUtils.ts';
import type { NutrientApplicationSummary } from '@/models/fertilizer';

interface ApplicationSummaryCardProps {
  summary: NutrientApplicationSummary;
}

const ApplicationSummaryCard: React.FC<ApplicationSummaryCardProps> = ({
  summary,
}) => {
  return (
    <Card className="border-l-4 border-primary shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Підсумок за період
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  Виконано
                </p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">
                  {summary.completedApplications}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  внесень завершено
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 rounded-full p-2">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  Заплановано
                </p>
                <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100 mt-1">
                  {summary.pendingApplications}
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  внесень попереду
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrients Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Вже внесено:
            </p>
            <p className="font-mono text-lg font-bold text-green-900 dark:text-green-100">
              {getPrimaryNutrientsString(summary.totalApplied)}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Заплановано:
            </p>
            <p className="font-mono text-lg font-bold text-orange-900 dark:text-orange-100">
              {getPrimaryNutrientsString(summary.plannedToApply)}
            </p>
          </div>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
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
  );
};

export default ApplicationSummaryCard;
