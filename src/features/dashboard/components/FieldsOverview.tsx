import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type Field from '@/models/field/field.model';
import { CropTypeLabels } from '@/models/crop/crop.model';

interface FieldsOverviewProps {
  fields: Field[];
  isLoading?: boolean;
}

const FieldsOverview: React.FC<FieldsOverviewProps> = ({
  fields,
  isLoading,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="border-2 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Поля</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayFields = fields.slice(0, 5);

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            Огляд полів
          </CardTitle>
          {fields.length > 5 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/fields')}
              className="text-green-600 hover:text-green-700 border-green-600"
            >
              Всі поля
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {displayFields.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              У вас ще немає полів
            </p>
            <Button
              onClick={() => navigate('/fields/new')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Додати перше поле
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayFields.map((field) => (
              <div
                key={field.id}
                onClick={() => navigate(`/fields/view/${field.id}`)}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {field.name}
                    </h3>
                    {field.currentCrop && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      >
                        <Sprout className="h-3 w-3 mr-1" />
                        {CropTypeLabels[field.currentCrop.cropType]}
                      </Badge>
                    )}
                  </div>
                  {field.location && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      📍 {field.location}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldsOverview;
