import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useIrrigationRecommendation,
  useWeeklyIrrigationSchedule,
} from '../hooks/irrigation.hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronLeft,
  Pencil,
  AlertCircle,
  BarChart2,
  CalendarDays,
} from 'lucide-react';
import RecommendationNotes from '../components/RecommendationNotes';
import MetricDisplay from '../components/MetricDisplay';
import { weatherIcons } from '../utils/irrigationUtils';
import WeeklyScheduleTable from '../components/WeeklyScheduleTable';
import IrrigationStatusBadge from '../components/IrrigationStatusBadge';
import ForecastChart from '@/features/irrigation/components/ForecastChart.tsx';

const IrrigationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = parseInt(id || '0', 10);

  const {
    data: recommendation,
    isLoading: isLoadingRec,
    error: errorRec,
  } = useIrrigationRecommendation(fieldId);
  const {
    data: schedule,
    isLoading: isLoadingSchedule,
    error: errorSchedule,
  } = useWeeklyIrrigationSchedule(fieldId);

  const isLoading = isLoadingRec || isLoadingSchedule;
  const error = errorRec || errorSchedule;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження детального плану...
          </p>
        </div>
      </div>
    );
  }

  if (error || !recommendation || !schedule) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center text-center">
        <div>
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold">Помилка завантаження</h2>
          <p className="mt-2 text-muted-foreground">
            {error?.message || 'Не вдалося завантажити дані для цього поля.'}
          </p>
          <Button onClick={() => navigate('/irrigation')} className="mt-6">
            Повернутися до огляду
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-muted-foreground">План зрошення</p>
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
            {recommendation.fieldName}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/fields/edit/${fieldId}`)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Редагувати поле
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/irrigation')}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Назад до огляду
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Current State */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Рекомендація на сьогодні</span>
                <IrrigationStatusBadge
                  action={recommendation.recommendedAction}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecommendationNotes notes={recommendation.notes} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Поточні погодні умови</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricDisplay
                icon={weatherIcons.temperature}
                label="Температура"
                value={recommendation.weatherConditions.temperature.toFixed(1)}
                unit="°C"
                iconClassName="text-red-500"
              />
              <MetricDisplay
                icon={weatherIcons.humidity}
                label="Вологість"
                value={recommendation.weatherConditions.relativeHumidity}
                unit="%"
                iconClassName="text-blue-500"
              />
              <MetricDisplay
                icon={weatherIcons.wind}
                label="Швидкість вітру"
                value={recommendation.weatherConditions.windSpeed.toFixed(1)}
                unit="м/с"
                iconClassName="text-indigo-500"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Weekly Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-green-600" />
                Тижневий графік зрошення
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyScheduleTable schedule={schedule.dailySchedule} />
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Підсумкові рекомендації на тиждень:
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {schedule.recommendations}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-blue-600" />
                Прогноз показників на 7 днів
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendation.forecast ? (
                <ForecastChart forecast={recommendation.forecast} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Прогноз недоступний.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IrrigationDetailPage;
