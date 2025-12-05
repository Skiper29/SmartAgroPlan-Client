import StatCard from '@/components/StatCard';
import { Sprout, Droplets, MapPin, Activity } from 'lucide-react';
import React from 'react';

interface DashboardStatsProps {
  totalFields: number;
  activeCrops: number;
  irrigationActive: number;
  fertilizerPlans: number;
  isLoading?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalFields,
  activeCrops,
  irrigationActive,
  fertilizerPlans,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Всього полів"
        value={totalFields}
        description="Активні сільськогосподарські поля"
        Icon={MapPin}
        theme="green"
      />
      <StatCard
        title="Активні культури"
        value={activeCrops}
        description="Поля з поточними посівами"
        Icon={Sprout}
        theme="blue"
      />
      <StatCard
        title="Зрошення сьогодні"
        value={irrigationActive}
        description="Поля що потребують поливу"
        Icon={Droplets}
        theme="blue"
      />
      <StatCard
        title="Плани удобрення"
        value={fertilizerPlans}
        description="Активні плани підживлення"
        Icon={Activity}
        theme="green"
      />
    </div>
  );
};

export default DashboardStats;
