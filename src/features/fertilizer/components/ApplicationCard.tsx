import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Leaf,
  Calendar,
  Package,
} from 'lucide-react';
import {
  formatDateLong,
  getAllNutrientsString,
  getStatusBadgeColor,
} from '../utils/fertilizerUtils';
import { CropStageLabels } from '@/models/fertilizer';
import type { FertilizerApplication } from '@/models/fertilizer';

interface ApplicationCardProps {
  application: FertilizerApplication;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const statusBadgeColor = getStatusBadgeColor(
    application.isCompleted,
    application.recommendedDate,
  );

  const isOverdue =
    !application.isCompleted &&
    new Date(application.recommendedDate) < new Date();

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${
        application.isCompleted
          ? 'border-l-4 border-green-500'
          : isOverdue
            ? 'border-l-4 border-red-500'
            : 'border-l-4 border-yellow-500'
      }`}
    >
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Status Badge and Date */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={`${statusBadgeColor} text-white shadow-sm`}>
                {application.isCompleted ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                    Виконано
                  </>
                ) : isOverdue ? (
                  <>
                    <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                    Прострочено
                  </>
                ) : (
                  <>
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    Заплановано
                  </>
                )}
              </Badge>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                <span className="text-lg font-semibold">
                  {formatDateLong(application.recommendedDate)}
                </span>
              </div>
            </div>

            {/* Crop Stage Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-900/30 rounded px-3 py-2 w-fit">
              <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="font-medium">
                {CropStageLabels[
                  application.cropStage as keyof typeof CropStageLabels
                ] || application.cropStage}
              </span>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span>{application.daysAfterPlanting} днів після посіву</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Nutrients */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <Package className="h-4 w-4 mr-2 text-primary" />
              Поживні речовини:
            </h4>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <p className="font-mono text-base font-semibold text-blue-900 dark:text-blue-100">
                {getAllNutrientsString(application.nutrientsToApply)}
              </p>
            </div>
          </div>

          {/* Products */}
          {application.products && application.products.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <Package className="h-4 w-4 mr-2 text-primary" />
                Добрива ({application.products.length}):
              </h4>
              <div className="space-y-2">
                {application.products.map((product) => (
                  <div
                    key={product.id}
                    className="text-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg px-3 py-2 border border-purple-200 dark:border-purple-800 font-medium"
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rationale */}
        {application.rationale && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Обґрунтування:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {application.rationale}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
