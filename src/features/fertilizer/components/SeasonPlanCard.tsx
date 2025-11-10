import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SeasonFertilizerPlan } from '@/models/fertilizer';
import {
  formatDate,
  getPrimaryNutrientsString,
  groupApplicationsByStatus,
} from '../utils/fertilizerUtils';
import { Calendar, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

interface SeasonPlanCardProps {
  plan: SeasonFertilizerPlan;
}

const SeasonPlanCard: React.FC<SeasonPlanCardProps> = ({ plan }) => {
  const { completed, upcoming, overdue } = groupApplicationsByStatus(
    plan.applications,
  );
  const totalApplications = plan.applications.length;
  const progress =
    totalApplications > 0 ? (completed.length / totalApplications) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Загальна інформація</span>
          {plan.isSaved && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-300"
            >
              Збережено
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Field and Crop Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Поле</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {plan.fieldName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Культура</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {plan.cropName}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <span className="text-gray-500 dark:text-gray-400">Посів: </span>
              <span className="font-medium">{formatDate(plan.sowingDate)}</span>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <span className="text-gray-500 dark:text-gray-400">Збір: </span>
              <span className="font-medium">
                {formatDate(plan.expectedHarvestDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Area and Yield */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Площа</p>
            <p className="text-base font-semibold">{plan.fieldAreaHa} га</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Очікуваний врожай
            </p>
            <p className="text-base font-semibold">{plan.expectedYield} т/га</p>
          </div>
        </div>

        {/* Nutrient Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Поживні речовини
            </p>
          </div>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Загальна потреба:
              </span>
              <span className="font-mono font-medium">
                {getPrimaryNutrientsString(plan.totalSeasonRequirement)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                З ґрунту:
              </span>
              <span className="font-mono font-medium">
                {getPrimaryNutrientsString(plan.soilSupply)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Потрібно з добрив:
              </span>
              <span className="font-mono font-medium">
                {getPrimaryNutrientsString(plan.requiredFromFertilizer)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Вже внесено:
              </span>
              <span className="font-mono font-medium text-green-600 dark:text-green-400">
                {getPrimaryNutrientsString(plan.alreadyApplied)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-1 mt-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Залишилось внести:
              </span>
              <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">
                {getPrimaryNutrientsString(plan.remainingToApply)}
              </span>
            </div>
          </div>
        </div>

        {/* Application Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Прогрес внесень
            </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {completed.length} / {totalApplications}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">
                Виконано: {completed.length}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-yellow-500" />
              <span className="text-gray-600 dark:text-gray-400">
                Заплановано: {upcoming.length}
              </span>
            </div>
            {overdue.length > 0 && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Прострочено: {overdue.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {plan.notes && (
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
            <p className="font-semibold mb-1">Примітки:</p>
            <p>{plan.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeasonPlanCard;
