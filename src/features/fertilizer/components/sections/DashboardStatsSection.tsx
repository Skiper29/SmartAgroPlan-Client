import React, { useMemo } from 'react';
import { Leaf, AlertTriangle, Calendar, Activity } from 'lucide-react';
import StatCard from '@/components/StatCard';
import type {
  NutrientBalance,
  NutrientDeficitAnalysis,
} from '@/models/fertilizer';
import type { FertilizerApplication } from '@/models/fertilizer';

interface DashboardStatsSectionProps {
  nutrientBalances: NutrientBalance[];
  deficitAnalyses: NutrientDeficitAnalysis[];
  upcomingApplications: FertilizerApplication[][];
  isLoading?: boolean;
}

export const DashboardStatsSection: React.FC<DashboardStatsSectionProps> = ({
  nutrientBalances,
  deficitAnalyses,
  upcomingApplications,
  isLoading = false,
}) => {
  const stats = useMemo(() => {
    // Count fields needing attention (deficit or critical deficit)
    const fieldsNeedingAttention = nutrientBalances.filter(
      (balance) =>
        balance.overallStatus === 'Помірний дефіцит' ||
        balance.overallStatus === 'Дефіцитний',
    ).length;

    // Count critical deficits
    const criticalDeficits = deficitAnalyses.reduce((count, analysis) => {
      const criticalCount = analysis.deficits.filter(
        (deficit) =>
          deficit.urgency === 'Critical' || deficit.urgency === 'High',
      ).length;
      return count + (criticalCount > 0 ? 1 : 0);
    }, 0);

    // Count upcoming applications in next 7 days
    const upcomingIn7Days = upcomingApplications.flat().filter((app) => {
      const daysUntil = Math.ceil(
        (new Date(app.recommendedDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      );
      return daysUntil >= 0 && daysUntil <= 7;
    }).length;

    // Calculate average nutrient balance score (0-100)
    const averageBalance =
      nutrientBalances.length > 0
        ? Math.round(
            nutrientBalances.reduce((sum, balance) => {
              // Simple scoring: Balanced = 100, Deficit = 60, Surplus = 80, Critical = 30
              let score = 100;
              if (balance.overallStatus === 'Deficit') score = 60;
              if (balance.overallStatus === 'Surplus') score = 80;
              if (balance.overallStatus === 'Critical Deficit') score = 30;
              return sum + score;
            }, 0) / nutrientBalances.length,
          )
        : 0;

    return {
      fieldsNeedingAttention,
      criticalDeficits,
      upcomingIn7Days,
      averageBalance,
    };
  }, [nutrientBalances, deficitAnalyses, upcomingApplications]);

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Потребують уваги"
        value={stats.fieldsNeedingAttention}
        description="полів з дефіцитом поживних речовин"
        Icon={Leaf}
        theme="green"
      />
      <StatCard
        title="Критичні ситуації"
        value={stats.criticalDeficits}
        description="полів з критичним дефіцитом"
        Icon={AlertTriangle}
        theme="red"
      />
      <StatCard
        title="Наступні внесення"
        value={stats.upcomingIn7Days}
        description="запланованих на 7 днів"
        Icon={Calendar}
        theme="blue"
      />
      <StatCard
        title="Середній баланс"
        value={`${stats.averageBalance}%`}
        description="рівень забезпечення поживними речовинами"
        Icon={Activity}
        theme={
          stats.averageBalance >= 80
            ? 'green'
            : stats.averageBalance >= 50
              ? 'blue'
              : 'red'
        }
      />
    </section>
  );
};

export default DashboardStatsSection;
