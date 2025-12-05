import { useMemo } from 'react';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import { useBatchIrrigationRecommendations } from '@/features/irrigation/hooks/irrigation.hooks';
import DashboardStats from '../components/DashboardStats';
import QuickActionsPanel from '../components/QuickActionsPanel';
import FieldsOverview from '../components/FieldsOverview';
import WeatherWidget from '../components/WeatherWidget';
import UpcomingTasksCard from '../components/UpcomingTasksCard';
import AlertsNotificationsCard from '../components/AlertsNotificationsCard';
import ErrorDisplay from '@/components/ErrorDisplay';
import { IrrigationAction } from '@/features/irrigation/utils/irrigationUtils';
import { Tractor } from 'lucide-react';

export function DashboardPage() {
  const { data: fields = [], isLoading: isLoadingFields, error } = useFields();

  // Get field IDs for batch recommendations
  const fieldIds = useMemo(() => fields.map((f) => f.id), [fields]);

  // Fetch irrigation recommendations - now uses React Query cache automatically
  const {
    data: irrigationRecommendations = [],
    isLoading: isLoadingIrrigation,
  } = useBatchIrrigationRecommendations(fieldIds, null, fieldIds.length > 0);

  const stats = useMemo(() => {
    const totalFields = fields.length;
    const activeCrops = fields.filter((f) => f.currentCrop).length;

    // Real irrigation data from API
    const irrigationActive = irrigationRecommendations.filter(
      (rec) => rec.recommendedAction !== IrrigationAction.None,
    ).length;

    // Count fields with saved fertilizer plans
    const fertilizerPlans = fields.filter((f) => f.currentCrop).length;

    return {
      totalFields,
      activeCrops,
      irrigationActive,
      fertilizerPlans,
    };
  }, [fields, irrigationRecommendations]);

  const isLoading = isLoadingFields || isLoadingIrrigation;

  if (error) {
    return (
      <div className="min-h-screen w-full p-8">
        <ErrorDisplay error={error} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 pb-8">
      {/* Header Section */}

      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-between px-4 sm:px-6 lg:px-8 py-8 border-b-2 border-green-600 dark:border-green-500">
        <div>
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
              <Tractor className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
                Панель керування
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ласкаво просимо до SmartAgroPlan! 🚜🌱
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto py-8">
        <div className="space-y-8">
          {/* Stats Section */}
          <section>
            <DashboardStats
              totalFields={stats.totalFields}
              activeCrops={stats.activeCrops}
              irrigationActive={stats.irrigationActive}
              fertilizerPlans={stats.fertilizerPlans}
              isLoading={isLoading}
            />
          </section>

          {/* Quick Actions & Weather Row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuickActionsPanel />
            </div>
            <div className="lg:col-span-1 h-full">
              <WeatherWidget />
            </div>
          </section>

          {/* Alerts & Notifications */}
          <section>
            <AlertsNotificationsCard />
          </section>

          {/* Fields Overview & Tasks Row */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FieldsOverview fields={fields} isLoading={isLoading} />
            <UpcomingTasksCard />
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
