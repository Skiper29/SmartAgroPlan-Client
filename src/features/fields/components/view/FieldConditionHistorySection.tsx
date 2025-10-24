import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import FieldConditionHistory from '../chart/FieldConditionHistory';

interface FieldConditionHistorySectionProps {
  fieldId: number;
  fieldName: string;
}

const FieldConditionHistorySection: React.FC<
  FieldConditionHistorySectionProps
> = ({ fieldId, fieldName }) => {
  return (
    <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700">
      <CardHeader className="text-green-700 dark:text-green-300">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <BarChart3 className="h-6 w-6" />
          </div>
          Історія стану поля
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <FieldConditionHistory fieldId={fieldId} fieldName={fieldName} />
      </CardContent>
    </Card>
  );
};

export default FieldConditionHistorySection;
