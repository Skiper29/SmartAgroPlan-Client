import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FieldMap from '../components/FieldMap';
import { FieldMapProvider } from '../contexts/FieldMapContext';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model';
import { CropType, CropTypeLabels } from '@/models/crop/crop.model';
import { FieldTypeLabels } from '@/models/field/field.model';
import { useField } from '../hooks/fields.hooks';

import {
  ChevronLeft,
  Pencil,
  Info,
  Wheat,
  FlaskConical,
  Map,
  AlertCircle,
} from 'lucide-react';

const FieldViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = parseInt(id || '0', 10);

  const { data: field, isLoading, error } = useField(fieldId);

  // Helper functions for processing data
  const getSoilTypeLabel = () => {
    if (!field?.soil?.type) return '—';

    const soilType =
      typeof field.soil.type === 'number'
        ? (Object.values(SoilType)[field.soil.type] as SoilType)
        : field.soil.type;

    return SoilTypeLabels[soilType] || '—';
  };

  const getCropInfo = () => {
    if (!field?.currentCrop) return { name: '—', type: '', typeLabel: '' };

    const cropType =
      typeof field.currentCrop.cropType === 'number'
        ? (Object.values(CropType)[field.currentCrop.cropType] as CropType)
        : field.currentCrop.cropType;

    const typeLabel = CropTypeLabels[cropType] || '';

    return {
      name: field.currentCrop.name,
      type: cropType,
      typeLabel,
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження інформації про поле...
          </p>
        </div>
      </div>
    );
  }

  if (error || !field) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="text-red-600 dark:text-red-400">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" strokeWidth={2} />
            <p className="text-lg font-medium">Поле не знайдено</p>
            <p className="text-sm text-gray-500">
              Можливо, поле було видалено або не існує
            </p>
            <Button onClick={() => navigate('/fields')} className="mt-4">
              Повернутися до списку полів
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const cropInfo = getCropInfo();

  return (
    <FieldMapProvider>
      <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
        <div className="w-full max-w-7xl space-y-8">
          {/* Header */}
          <header className="sticky top-0 z-100000 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
              Перегляд поля "{field.name}"
            </h1>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/fields/edit/${field.id}`)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Редагувати
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/fields')}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Назад
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Field Details */}
            <div className="xl:col-span-1 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Основна інформація
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Назва поля:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {field.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Тип поля:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {FieldTypeLabels[field.fieldType]}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Локація:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {field.location || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Створено:
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {field.createdDate
                          ? new Date(field.createdDate).toLocaleDateString(
                              'uk-UA',
                            )
                          : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Оновлено:
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {field.updatedDate
                          ? new Date(field.updatedDate).toLocaleDateString(
                              'uk-UA',
                            )
                          : '—'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Crop Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wheat className="h-5 w-5 text-green-600" />
                    Поточна культура
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Назва:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {cropInfo.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Тип культури:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {cropInfo.typeLabel || '—'}
                      </span>
                    </div>
                    {field.currentCrop && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Потреба у воді:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.currentCrop.waterRequirement || '—'} мм
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Потреба в добривах:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.currentCrop.fertilizerRequirement || '—'}{' '}
                            кг/га
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Тривалість росту:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.currentCrop.growingDuration || '—'} днів
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Очікувана врожайність:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.currentCrop.harvestYield || '—'} т/га
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Soil Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-amber-600" />
                    Ґрунт
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Тип ґрунту:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {getSoilTypeLabel()}
                      </span>
                    </div>
                    {field.soil && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Водотримкість:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.soil.waterRetention || '—'}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Кислотність (pH):
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.soil.acidity || '—'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Поживні речовини:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.soil.nutrientContent || '—'} мг/кг
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Органічна речовина:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.soil.organicMatter || '—'}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Щільність ґрунту:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.soil.soilDensity || '—'} г/см³
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Ризик ерозії:
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {field.soil.erosionRisk || '—'}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Map */}
            <div className="xl:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-blue-600" />
                    Розташування на карті
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div data-map-section className="h-[600px]">
                    <FieldMap fields={[field]} className="rounded-b-lg" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FieldMapProvider>
  );
};

export default FieldViewPage;
