import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, CheckCircle2 } from 'lucide-react';

interface PlanInfoCardProps {
  sowingDate: string;
  expectedHarvestDate: string;
  expectedYield: number;
  fieldAreaHa: number;
  savedPlanId?: number | null;
  notes?: string | null;
}

const PlanInfoCard: React.FC<PlanInfoCardProps> = ({
  sowingDate,
  expectedHarvestDate,
  expectedYield,
  fieldAreaHa,
  savedPlanId,
  notes,
}) => {
  return (
    <Card className="border-l-4 border-green-500 shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center text-green-700 dark:text-green-300 text-2xl">
              <Info className="h-5 w-5 mr-2" />
              Інформація про план
            </CardTitle>
          </div>
          {savedPlanId && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-300 dark:border-green-700">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              ID: {savedPlanId}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Дата посіву</p>
            <p className="text-lg font-semibold">
              {new Date(sowingDate).toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Очікуваний збір</p>
            <p className="text-lg font-semibold">
              {new Date(expectedHarvestDate).toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Цільова врожайність</p>
            <p className="text-lg font-semibold">
              {expectedYield.toFixed(1)} т/га
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Площа поля</p>
            <p className="text-lg font-semibold">{fieldAreaHa.toFixed(2)} га</p>
          </div>
        </div>
        {notes && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-muted-foreground mb-1">Примітки:</p>
            <p className="text-sm">{notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanInfoCard;
