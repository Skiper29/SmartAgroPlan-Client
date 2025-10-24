import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FieldMap from '../components/map/FieldMap';
import { FieldMapProvider } from '../contexts/FieldMapContext';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model';
import { CropType, CropTypeLabels } from '@/models/crop/crop.model';
import { FieldTypeLabels } from '@/models/field/field.model';
import type DayMonth from '@/models/calendar/day-month.model';
import { useField } from '../hooks/fields.hooks';

import {
  ChevronLeft,
  Pencil,
  Info,
  Wheat,
  FlaskConical,
  Map,
  DatabaseZap,
  Calendar,
  Thermometer,
  Droplets,
  Sprout,
  MapPin,
  Clock,
  TrendingUp,
  BarChart3,
  Wind,
  Tag,
  RefreshCw,
  Leaf,
  Layers,
  Beaker,
  Nut,
  Recycle,
  Scaling,
  FileText,
} from 'lucide-react';
import ErrorDisplay from '@/components/ErrorDisplay.tsx';
import AddFieldConditionModal from '@/features/fields/components/modals/AddFieldConditionModal.tsx';
import FieldConditionHistory from '@/features/fields/components/chart/FieldConditionHistory.tsx';
import area from '@turf/area';

const FieldViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = parseInt(id || '0', 10);
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

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

  const calculateFieldArea = () => {
    if (!field?.boundaryGeoJson) return null;

    try {
      const geoJson = JSON.parse(field.boundaryGeoJson);

      if (geoJson.type === 'Polygon' || geoJson.type === 'MultiPolygon') {
        const areaInSquareMeters = area(geoJson);

        const hectares = areaInSquareMeters / 10000;

        return hectares.toFixed(2);
      }
    } catch (e) {
      console.error('Error calculating area with Turf:', e);
    }

    return null;
  };

  const formatDayMonth = (dayMonth: DayMonth | undefined) => {
    if (!dayMonth) return '—';
    return `${dayMonth.day}.${String(dayMonth.month).padStart(2, '0')}`;
  };

  const calculateExpectedHarvestDate = () => {
    if (!field?.sowingDate || !field?.currentCrop?.growingDuration) return null;
    const sowingDate = new Date(field.sowingDate);
    const harvestDate = new Date(sowingDate);
    harvestDate.setDate(
      harvestDate.getDate() + field.currentCrop.growingDuration,
    );
    return harvestDate;
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
      <ErrorDisplay
        error={error || new Error('Поле не знайдено')}
        title="Не вдалося завантажити інформацію про поле"
        showHomeButton
        homeRoute="/fields"
      />
    );
  }

  const cropInfo = getCropInfo();
  const fieldArea = calculateFieldArea();
  const expectedHarvestDate = calculateExpectedHarvestDate();

  return (
    <FieldMapProvider>
      <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
        <div className="w-full max-w-7xl space-y-6">
          {/* Header */}
          <header className="sticky top-0 z-100000 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
              Перегляд поля "{field.name}"
            </h1>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsConditionModalOpen(true)}
                className="flex items-center gap-2 hover:bg-green-50 dark:hover:bg-gray-800"
              >
                <DatabaseZap className="h-4 w-4" />
                Додати стан
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate(`/fields/edit/${field.id}`)}
                className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-gray-800"
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
          {/* Map Section - Now on Top */}
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
          {/* Information Cards Grid - 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Basic Information Card */}
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 hover:scale-[1.02]">
              <CardHeader className="bg-blue-50 dark:bg-gray-800 pb-3 text-blue-700 dark:text-blue-300">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-blue-500 rounded-lg">
                    <Info className="h-4 w-4 text-white" />
                  </div>
                  Основна інформація
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Назва:
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {field.name}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    Тип поля:
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                    {FieldTypeLabels[field.fieldType]}
                  </span>
                </div>
                {fieldArea && (
                  <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                    <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      Площа:
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {fieldArea} га
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Map className="h-3 w-3" />
                    Локація:
                  </span>
                  <span
                    className="text-gray-900 dark:text-white text-right max-w-[70%] truncate"
                    title={field.location || '—'}
                  >
                    {field.location || '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Створено:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {field.createdAt
                      ? new Date(field.createdAt).toLocaleDateString('uk-UA')
                      : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    Оновлено:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {field.updatedAt
                      ? new Date(field.updatedAt).toLocaleDateString('uk-UA')
                      : '—'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Current Crop Basic Info Card */}
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500 hover:scale-[1.02]">
              <CardHeader className="bg-green-50 dark:bg-gray-800 pb-3 text-green-700 dark:text-green-300">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-green-500 rounded-lg">
                    <Wheat className="h-4 w-4 text-white" />
                  </div>
                  Поточна культура
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
                {field.currentCrop ? (
                  <>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        Назва:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {cropInfo.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        Тип:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                        {cropInfo.typeLabel}
                      </span>
                    </div>
                    {field.sowingDate && (
                      <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Дата посіву:
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {new Date(field.sowingDate).toLocaleDateString(
                            'uk-UA',
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Тривалість:
                      </span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {field.currentCrop.growingDuration} днів
                      </span>
                    </div>
                    {expectedHarvestDate && (
                      <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Очік. збір:
                        </span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          {expectedHarvestDate.toLocaleDateString('uk-UA')}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Врожайність:
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {field.currentCrop.harvestYield} т/га
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Wheat className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Культура не визначена
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Crop Requirements Card */}
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-cyan-500 hover:scale-[1.02]">
              <CardHeader className="bg-cyan-50 dark:bg-gray-800 pb-3 text-cyan-700 dark:text-cyan-300">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-cyan-500 rounded-lg">
                    <Droplets className="h-4 w-4 text-white" />
                  </div>
                  Потреби культури
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
                {field.currentCrop ? (
                  <>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        Вода:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {field.currentCrop.waterRequirement} мм
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Sprout className="h-3 w-3 text-green-500" />
                        Добрива:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {field.currentCrop.fertilizerRequirement} кг/га
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3 mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                          <Thermometer className="h-3 w-3" />
                          Температура:
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Мінімум:
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {field.currentCrop.minTemperature}°C
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Максимум:
                        </span>
                        <span className="font-bold text-red-600 dark:text-red-400">
                          {field.currentCrop.maxTemperature}°C
                        </span>
                      </div>
                    </div>
                    {field.currentCrop.sowingStart &&
                      field.currentCrop.sowingEnd && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 mt-3">
                          <div className="flex items-center gap-1 mb-2">
                            <Calendar className="h-3 w-3 text-purple-600" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Період посіву:
                            </span>
                          </div>
                          <div className="text-center font-semibold text-purple-600 dark:text-purple-400">
                            {formatDayMonth(field.currentCrop.sowingStart)} -{' '}
                            {formatDayMonth(field.currentCrop.sowingEnd)}
                          </div>
                        </div>
                      )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Droplets className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Інформація недоступна
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Soil Information Card */}
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-amber-500 hover:scale-[1.02]">
              <CardHeader className="bg-amber-50 dark:bg-gray-800 pb-3 text-amber-700 dark:text-amber-300">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-amber-500 rounded-lg">
                    <FlaskConical className="h-4 w-4 text-white" />
                  </div>
                  Характеристики ґрунту
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-sm font-medium">
                {field.soil ? (
                  <>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        Тип:
                      </span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                        {getSoilTypeLabel()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        Водотримкість:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {field.soil.waterRetention}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Beaker className="h-3 w-3" />
                        pH:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {field.soil.acidity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Nut className="h-3 w-3" />
                        Поживні реч.:
                      </span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {field.soil.nutrientContent} мг/кг
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Recycle className="h-3 w-3" />
                        Орган. речовина:
                      </span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {field.soil.organicMatter}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Scaling className="h-3 w-3" />
                        Щільність:
                      </span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {field.soil.soilDensity} г/см³
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Wind className="h-3 w-3" />
                        Ризик ерозії:
                      </span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          field.soil.erosionRisk > 50
                            ? 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                            : field.soil.erosionRisk > 25
                              ? 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30'
                              : 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                        }`}
                      >
                        {field.soil.erosionRisk}%
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <FlaskConical className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Інформація недоступна
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Additional Notes Card (if exists) */}
          {field.currentCrop?.additionalNotes && (
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500 hover:scale-[1.02]">
              <CardHeader className="bg-purple-50 dark:bg-gray-800 pb-3 text-purple-700 dark:text-purple-300">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-purple-500 rounded-lg">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  Додаткова інформація про культуру
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {field.currentCrop.additionalNotes}
                </p>
              </CardContent>
            </Card>
          )}
          {/* Field Condition History Section */}
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
              <FieldConditionHistory
                fieldId={field.id}
                fieldName={field.name}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddFieldConditionModal
        fieldId={field.id}
        fieldName={field.name}
        isOpen={isConditionModalOpen}
        onClose={() => setIsConditionModalOpen(false)}
      />
    </FieldMapProvider>
  );
};

export default FieldViewPage;
