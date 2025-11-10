import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  BarChartHorizontal,
} from 'lucide-react';
import type { CurrentRecommendation } from '@/models/fertilizer';
import {
  getPrimaryNutrientsArray,
  getPriorityStyling,
  formatDateLong,
  isUpcoming,
} from '../utils/fertilizerUtils';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FertilizerFieldCardProps {
  recommendation: CurrentRecommendation;
}

const FertilizerFieldCard: React.FC<FertilizerFieldCardProps> = ({
  recommendation,
}) => {
  const navigate = useNavigate();
  const priority = getPriorityStyling(recommendation.priority);
  const nutrients = getPrimaryNutrientsArray(
    recommendation.recommendedNutrients,
  );

  // Check if the recommendation date is within the next 7 days
  const isUrgentDate =
    recommendation.shouldApplyNow && isUpcoming(recommendation.date, 7);

  return (
    <Card
      className={cn(
        'flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg border-l-4',
        priority.borderClasses,
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle
            className="text-2xl font-bold text-green-800 dark:text-green-200 cursor-pointer hover:underline"
            onClick={() =>
              navigate(`/fertilizer/plan/${recommendation.fieldId}`)
            }
          >
            {recommendation.fieldName}
          </CardTitle>
          <Badge
            className={cn(
              'flex-shrink-0 gap-1.5 px-3 py-1 text-sm border',
              priority.badgeClasses,
            )}
          >
            <priority.icon className="h-4 w-4" />
            {priority.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-5 flex flex-col justify-between">
        {/* Nutrients Section */}
        {recommendation.shouldApplyNow ? (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Рекомендовано (кг/га):
            </p>
            <div className="flex justify-around text-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              {nutrients.map((n) => (
                <div key={n.name}>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {n.name}
                  </p>
                  <p
                    className={cn(
                      'text-3xl font-extrabold',
                      priority.textClasses,
                    )}
                  >
                    {n.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="font-medium text-green-700 dark:text-green-300">
              Наразі внесення не потрібне
            </p>
          </div>
        )}

        {/* Stage Info */}
        {recommendation.currentStage !== 'Після збору врожаю' && (
          <div className="space-y-3 text-md">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <TrendingUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <span>Стадія: {recommendation.currentStage}</span>
            </div>
          </div>
        )}

        {/* Warnings */}
        {recommendation.warnings && recommendation.warnings.length > 0 && (
          <div className="flex items-start text-sm text-amber-700 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/50">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{recommendation.warnings[0]}</span>
          </div>
        )}

        {/* Date */}
        {recommendation.nextRecommendedDate && (
          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            Наступна рекомендована дата внесення:{' '}
            {formatDateLong(recommendation.nextRecommendedDate)}
          </div>
        )}
        {recommendation.shouldApplyNow && (
          <div
            className={cn(
              'flex items-center gap-3 font-semibold',
              isUrgentDate
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-gray-700 dark:text-gray-300',
            )}
          >
            <Calendar
              className={cn(
                'h-5 w-5 flex-shrink-0',
                isUrgentDate ? 'text-orange-500' : 'text-muted-foreground',
              )}
            />
            <span>
              Дата рекомендації: {formatDateLong(recommendation.date)}
            </span>
          </div>
        )}
      </CardContent>

      {/* Footer Buttons */}
      <CardFooter className="pt-5 border-t dark:border-gray-700/50">
        <div className="flex gap-3 w-full">
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            onClick={() =>
              navigate(`/fertilizer/balance/${recommendation.fieldId}`)
            }
          >
            <BarChartHorizontal className="h-4 w-4 mr-2" />
            Баланс
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() =>
              navigate(`/fertilizer/plan/${recommendation.fieldId}`)
            }
          >
            Детальний План
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FertilizerFieldCard;
