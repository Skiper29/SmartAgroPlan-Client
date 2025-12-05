import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sprout } from 'lucide-react';

const CropsEmptyState: React.FC = () => {
  return (
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
      <CardContent className="p-12 text-center">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <Sprout className="h-12 w-12 text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
          Культури не знайдено
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Спробуйте змінити параметри пошуку або фільтрування
        </p>
      </CardContent>
    </Card>
  );
};

export default CropsEmptyState;
