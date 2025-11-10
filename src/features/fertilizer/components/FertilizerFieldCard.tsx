import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import type { CurrentRecommendation } from '@/models/fertilizer';
import {
  getPrimaryNutrientsString,
  getPriorityBadgeColor,
  formatDateLong,
  isUpcoming,
} from '../utils/fertilizerUtils';
import { useNavigate } from 'react-router-dom';

interface FertilizerFieldCardProps {
  recommendation: CurrentRecommendation;
}

const FertilizerFieldCard: React.FC<FertilizerFieldCardProps> = ({
  recommendation,
}) => {
  const navigate = useNavigate();
  const priorityColor = getPriorityBadgeColor(recommendation.priority);
  const isUrgent = isUpcoming(recommendation.date, 7);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">
            {recommendation.fieldName}
          </CardTitle>
          <Badge className={`${priorityColor} text-white`}>
            {recommendation.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Stage */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <TrendingUp className="h-4 w-4 mr-2" />
          <span>Стадія: {recommendation.currentStage}</span>
        </div>

        {/* Days Info */}
        <div className="text-xs text-gray-500 dark:text-gray-500">
          {recommendation.daysAfterPlanting} днів після посіву •{' '}
          {recommendation.daysToHarvest} днів до збирання
        </div>

        {/* Next Application Date */}
        {recommendation.shouldApplyNow && (
          <div
            className={`flex items-center text-sm ${isUrgent ? 'text-orange-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDateLong(recommendation.date)}</span>
          </div>
        )}

        {/* Nutrients Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Поживні речовини:
          </p>
          <p className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">
            {getPrimaryNutrientsString(recommendation.recommendedNutrients)}
          </p>
        </div>

        {/* Warnings */}
        {recommendation.warnings && recommendation.warnings.length > 0 && (
          <div className="flex items-start text-xs text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
            <AlertCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
            <span>{recommendation.warnings[0]}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() =>
              navigate(`/fertilizer/plan/${recommendation.fieldId}`)
            }
          >
            Переглянути план
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() =>
              navigate(`/fertilizer/balance/${recommendation.fieldId}`)
            }
          >
            Баланс
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FertilizerFieldCard;
