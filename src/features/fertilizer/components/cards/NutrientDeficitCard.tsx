import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NutrientDeficit } from '@/models/fertilizer';

interface NutrientDeficitCardProps {
  fieldId: number;
  fieldName: string;
  deficit: NutrientDeficit;
  onClick?: () => void;
}

const urgencyStyles = {
  Critical: {
    border: 'border-l-red-600',
    badge:
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700',
    icon: 'text-red-600 dark:text-red-400',
    label: 'Критично',
  },
  High: {
    border: 'border-l-orange-600',
    badge:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700',
    icon: 'text-orange-600 dark:text-orange-400',
    label: 'Високо',
  },
  Medium: {
    border: 'border-l-yellow-600',
    badge:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
    icon: 'text-yellow-600 dark:text-yellow-400',
    label: 'Середньо',
  },
  Low: {
    border: 'border-l-green-600',
    badge:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700',
    icon: 'text-green-600 dark:text-green-400',
    label: 'Низько',
  },
};

const NutrientDeficitCard: React.FC<NutrientDeficitCardProps> = ({
  fieldName,
  deficit,
  onClick,
}) => {
  const urgency =
    urgencyStyles[deficit.urgency as keyof typeof urgencyStyles] ||
    urgencyStyles.Medium;

  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-md border-l-4 cursor-pointer',
        urgency.border,
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingDown className={cn('h-5 w-5', urgency.icon)} />
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {deficit.nutrientName}
            </CardTitle>
          </div>
          <Badge
            className={cn('gap-1.5 px-2 py-1 text-xs border', urgency.badge)}
          >
            <AlertTriangle className="h-3 w-3" />
            {urgency.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{fieldName}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">Дефіцит:</span>
          <span className={cn('text-2xl font-bold', urgency.icon)}>
            {deficit.deficitAmount.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">кг/га</span>
        </div>

        {deficit.symptoms && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Симптоми:
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {deficit.symptoms}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutrientDeficitCard;
