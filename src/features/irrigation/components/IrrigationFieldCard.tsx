import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Droplets, Calendar, ChevronRight } from 'lucide-react';
import type { IrrigationRecommendation } from '@/models/irrigation/recommendation.model';
import IrrigationStatusBadge from './IrrigationStatusBadge';
import RecommendationNotes from './RecommendationNotes'; // <--- Імпортуємо новий компонент

interface IrrigationFieldCardProps {
  recommendation: IrrigationRecommendation;
}

const IrrigationFieldCard: React.FC<IrrigationFieldCardProps> = ({
  recommendation,
}) => {
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex-row items-center justify-between gap-4 pb-4">
        <CardTitle className="text-xl font-bold text-green-800 dark:text-green-200">
          {recommendation.fieldName}
        </CardTitle>
        <IrrigationStatusBadge action={recommendation.recommendedAction} />
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <RecommendationNotes notes={recommendation.notes} />

        <div className="grid grid-cols-2 gap-4 text-sm pt-2">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-muted-foreground">Вологість</p>
              <p className="font-semibold">
                {(recommendation.currentSoilMoisture * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-muted-foreground">Стадія</p>
              <p className="font-semibold">{recommendation.cropStage}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:from-green-700 dark:to-green-900 dark:hover:from-green-800 dark:hover:to-green-900"
        >
          <Link to={`/irrigation/${recommendation.fieldId}`}>
            Детальний План
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IrrigationFieldCard;
