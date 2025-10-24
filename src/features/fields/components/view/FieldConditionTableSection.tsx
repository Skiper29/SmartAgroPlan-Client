import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { List } from 'lucide-react';
import FieldConditionsTable from '@/features/fields/components/table/FieldConditionsTable.tsx';
import React from 'react';

interface FieldConditionTableSectionProps {
  fieldId: number;
  fieldName: string;
}

const FieldConditionTableSection: React.FC<FieldConditionTableSectionProps> = ({
  fieldId,
  fieldName,
}) => {
  return (
    <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700">
      <CardHeader className="text-green-700 dark:text-green-300">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <List className="h-6 w-6" />
          </div>
          Таблиця Записів Стану Поля
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <FieldConditionsTable fieldId={fieldId} fieldName={fieldName} />
      </CardContent>
    </Card>
  );
};

export default FieldConditionTableSection;
