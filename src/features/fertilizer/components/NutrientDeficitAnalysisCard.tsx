import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { NutrientDeficit } from '@/models/fertilizer';
import {
  getDeficitUrgencyStyling,
  getNutrientNameUA,
} from '../utils/fertilizerUtils';
import { cn } from '@/lib/utils';

interface NutrientDeficitAnalysisCardProps {
  deficit: NutrientDeficit;
}

const NutrientDeficitAnalysisCard: React.FC<
  NutrientDeficitAnalysisCardProps
> = ({ deficit }) => {
  const style = getDeficitUrgencyStyling(deficit.urgency);
  const Icon = style.icon;

  return (
    <Card className={cn('border-l-4 transition-all', style.border, style.bg)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Icon className={cn('h-5 w-5', style.text)} />
            {getNutrientNameUA(deficit.nutrientName)}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn('text-xs font-semibold', style.badge)}
          >
            {style.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-baseline gap-2">
          <span className={cn('text-3xl font-bold', style.text)}>
            {Math.abs(deficit.deficitAmount).toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">кг/га дефіциту</span>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Можливі симптоми:
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {deficit.symptoms}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutrientDeficitAnalysisCard;
