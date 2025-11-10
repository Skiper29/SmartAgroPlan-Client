import React from 'react';
import { Sprout, Calendar, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/StatCard.tsx';

interface FertilizerSummaryCardsProps {
  needsAttention: number;
  upcomingApplications: number;
  criticalFields: number;
}

export const FertilizerSummaryCards: React.FC<FertilizerSummaryCardsProps> = ({
  needsAttention,
  upcomingApplications,
  criticalFields,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Потребують уваги"
        value={needsAttention}
        description="полів потребують внесення добрив"
        Icon={Sprout}
        theme="green"
      />
      <StatCard
        title="Наступні внесення"
        value={upcomingApplications}
        description="заплановано найближчим часом"
        Icon={Calendar}
        theme="blue"
      />
      <StatCard
        title="Критичні поля"
        value={criticalFields}
        description="з критичним дефіцитом"
        Icon={AlertTriangle}
        theme="red"
      />
    </section>
  );
};

export default FertilizerSummaryCards;
