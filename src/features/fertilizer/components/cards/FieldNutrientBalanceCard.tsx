import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChartHorizontal, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NutrientBalance } from '@/models/fertilizer';

interface FieldNutrientBalanceCardProps {
  balance: NutrientBalance;
  compact?: boolean;
  onClick?: () => void;
}

const statusStyles = {
  Balanced: {
    border: 'border-l-green-600',
    badge:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700',
    icon: 'text-green-600 dark:text-green-400',
    label: 'Збалансовано',
  },
  Deficit: {
    border: 'border-l-yellow-600',
    badge:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
    icon: 'text-yellow-600 dark:text-yellow-400',
    label: 'Дефіцит',
  },
  Surplus: {
    border: 'border-l-blue-600',
    badge:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    icon: 'text-blue-600 dark:text-blue-400',
    label: 'Надлишок',
  },
  'Critical Deficit': {
    border: 'border-l-red-600',
    badge:
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700',
    icon: 'text-red-600 dark:text-red-400',
    label: 'Критичний дефіцит',
  },
};

const FieldNutrientBalanceCard: React.FC<FieldNutrientBalanceCardProps> = ({
  balance,
  compact = false,
  onClick,
}) => {
  const status =
    statusStyles[balance.overallStatus as keyof typeof statusStyles] ||
    statusStyles.Balanced;

  // Calculate completion percentage based on available vs required
  const calculateCompletion = (available: number, required: number): number => {
    if (required === 0) return 100;
    return Math.min(100, Math.round((available / required) * 100));
  };

  const nCompletion = calculateCompletion(
    balance.availableInSoil.nitrogen + balance.alreadyApplied.nitrogen,
    balance.requiredForTargetYield.nitrogen,
  );
  const pCompletion = calculateCompletion(
    balance.availableInSoil.phosphorus + balance.alreadyApplied.phosphorus,
    balance.requiredForTargetYield.phosphorus,
  );
  const kCompletion = calculateCompletion(
    balance.availableInSoil.potassium + balance.alreadyApplied.potassium,
    balance.requiredForTargetYield.potassium,
  );

  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-md border-l-4',
        status.border,
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Leaf className={cn('h-5 w-5', status.icon)} />
              {balance.fieldName || `Поле #${balance.fieldId}`}
            </CardTitle>
            {balance.cropName && (
              <p className="text-sm text-muted-foreground mt-1">
                {balance.cropName}
              </p>
            )}
          </div>
          <Badge
            className={cn('gap-1.5 px-2 py-1 text-xs border', status.badge)}
          >
            <BarChartHorizontal className="h-3 w-3" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Crop Progress */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>День {balance.daysAfterPlanting} від посіву</span>
          <span>{balance.daysToHarvest} днів до збору</span>
        </div>

        {/* Nutrient Progress Bars */}
        {!compact && (
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Азот (N)
                </span>
                <span className="text-muted-foreground">{nCompletion}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    nCompletion >= 80
                      ? 'bg-green-500'
                      : nCompletion >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500',
                  )}
                  style={{ width: `${nCompletion}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Фосфор (P)
                </span>
                <span className="text-muted-foreground">{pCompletion}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    pCompletion >= 80
                      ? 'bg-green-500'
                      : pCompletion >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500',
                  )}
                  style={{ width: `${pCompletion}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Калій (K)
                </span>
                <span className="text-muted-foreground">{kCompletion}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    kCompletion >= 80
                      ? 'bg-green-500'
                      : kCompletion >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500',
                  )}
                  style={{ width: `${kCompletion}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Deficit Summary */}
        {compact && (
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xs text-muted-foreground">N</div>
              <div
                className={cn(
                  'text-lg font-bold',
                  balance.deficit.nitrogen > 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400',
                )}
              >
                {balance.deficit.nitrogen > 0
                  ? `-${balance.deficit.nitrogen.toFixed(0)}`
                  : '✓'}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">P</div>
              <div
                className={cn(
                  'text-lg font-bold',
                  balance.deficit.phosphorus > 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400',
                )}
              >
                {balance.deficit.phosphorus > 0
                  ? `-${balance.deficit.phosphorus.toFixed(0)}`
                  : '✓'}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">K</div>
              <div
                className={cn(
                  'text-lg font-bold',
                  balance.deficit.potassium > 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400',
                )}
              >
                {balance.deficit.potassium > 0
                  ? `-${balance.deficit.potassium.toFixed(0)}`
                  : '✓'}
              </div>
            </div>
          </div>
        )}

        {/* Recommendations count */}
        {balance.recommendations && balance.recommendations.length > 0 && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-muted-foreground">
              {balance.recommendations.length} рекомендацій
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldNutrientBalanceCard;
