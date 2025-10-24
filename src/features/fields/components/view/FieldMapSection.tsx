import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Map } from 'lucide-react';
import FieldMap from '../map/FieldMap';
import type Field from '@/models/field/field.model';

interface FieldMapSectionProps {
  field: Field;
}

const FieldMapSection: React.FC<FieldMapSectionProps> = ({ field }) => {
  return (
    <Card className="overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700">
      <CardHeader className="text-green-700 dark:text-green-300">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Map className="h-6 w-6" />
          </div>
          Розташування поля на карті
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div
          data-map-section
          className="h-[650px] w-full rounded-lg overflow-hidden relative border-2 border-gray-300 dark:border-gray-600"
        >
          <FieldMap fields={[field]} className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldMapSection;

