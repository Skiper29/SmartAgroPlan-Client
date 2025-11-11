import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NutrientBalance } from '@/models/fertilizer';
import {
  getBalanceStatusStyling,
  formatDate,
} from '@/features/fertilizer/utils/fertilizerUtils';
import { Calendar, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NutrientBalanceStatusCardProps {
  balance: NutrientBalance;
}

/**
 * A styled card component to display the overall nutrient balance status and key dates.
 */
const NutrientBalanceStatusCard: React.FC<NutrientBalanceStatusCardProps> = ({
  balance,
}) => {
  const statusStyle = getBalanceStatusStyling(balance.overallStatus);
  const StatusIcon = statusStyle.icon;

  return (
    <Card className={cn('border-l-4', statusStyle.border)}>
      <CardHeader
        className={cn(
          'pb-3 text-3xl font-bold',
          statusStyle.headerBg,
          statusStyle.headerText,
        )}
      >
        <CardTitle className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-lg', statusStyle.iconBg)}>
            <StatusIcon className="h-4 w-4 text-white" />
          </div>
          Загальний статус
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* 1. Hero Section for the status itself */}
        <div
          className={cn(
            'p-4 rounded-lg text-center shadow-inner',
            statusStyle.bg,
          )}
        >
          <StatusIcon
            className={cn('h-7 w-7 mx-auto mb-2', statusStyle.text)}
          />
          <p className={cn('text-2xl font-bold', statusStyle.text)}>
            {balance.overallStatus}
          </p>
        </div>

        {/* 2. Secondary Info Section (the key-value pairs) */}
        <div className="space-y-2.5 text-sm font-medium">
          <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Дата аналізу:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatDate(balance.analysisDate)}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Днів після посіву:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {balance.daysAfterPlanting}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Target className="h-4 w-4" />
              Днів до збирання:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {balance.daysToHarvest}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutrientBalanceStatusCard;
