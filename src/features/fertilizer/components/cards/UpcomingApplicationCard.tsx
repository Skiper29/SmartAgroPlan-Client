import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FertilizerApplication } from '@/models/fertilizer';

interface UpcomingApplicationCardProps {
  application: FertilizerApplication;
  fieldName: string;
  onClick?: () => void;
}

const UpcomingApplicationCard: React.FC<UpcomingApplicationCardProps> = ({
  application,
  fieldName,
  onClick,
}) => {
  // Calculate days until application
  const daysUntil = Math.ceil(
    (new Date(application.recommendedDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const isUrgent = daysUntil <= 3;
  const isUpcoming = daysUntil > 3 && daysUntil <= 7;

  const urgencyStyle = isUrgent
    ? 'border-l-red-600'
    : isUpcoming
      ? 'border-l-orange-600'
      : 'border-l-green-600';

  const dateBadgeStyle = isUrgent
    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700'
    : isUpcoming
      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700'
      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700';

  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-md border-l-4',
        urgencyStyle,
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {fieldName}
            </CardTitle>
            {application.cropStage && (
              <Badge
                variant="outline"
                className="mt-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
              >
                {application.cropStage}
              </Badge>
            )}
          </div>
          <Badge
            className={cn('gap-1.5 px-2 py-1 text-xs border', dateBadgeStyle)}
          >
            <Clock className="h-3 w-3" />
            {daysUntil === 0
              ? 'Сьогодні'
              : daysUntil === 1
                ? 'Завтра'
                : `${daysUntil} днів`}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(application.recommendedDate).toLocaleDateString('uk-UA', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Nutrients to Apply */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            Рекомендовано внести (кг/га):
          </p>
          <div className="grid grid-cols-3 gap-2">
            {application.nutrientsToApply.nitrogen > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">N</div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {application.nutrientsToApply.nitrogen.toFixed(0)}
                </div>
              </div>
            )}
            {application.nutrientsToApply.phosphorus > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">P</div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                  {application.nutrientsToApply.phosphorus.toFixed(0)}
                </div>
              </div>
            )}
            {application.nutrientsToApply.potassium > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">K</div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300">
                  {application.nutrientsToApply.potassium.toFixed(0)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Application Method */}
        {application.applicationMethod && (
          <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Метод: {application.applicationMethod}
            </span>
          </div>
        )}

        {/* Products count */}
        {application.products && application.products.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {application.products.length} продукт(и)
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingApplicationCard;
