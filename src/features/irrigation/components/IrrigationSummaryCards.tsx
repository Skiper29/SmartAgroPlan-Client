import { AlertTriangle, CloudDrizzle, Droplet } from 'lucide-react';
import StatCard from '@/components/StatCard.tsx';
import React from 'react';

interface IrrigationSummaryCardsProps {
  fieldsNeedingIrrigation: number;
  generalSoilMoistureDeficit: number;
  criticalSoilMoistureLevels: number;
}

export const IrrigationSummaryCards: React.FC<IrrigationSummaryCardsProps> = ({
  fieldsNeedingIrrigation,
  generalSoilMoistureDeficit,
  criticalSoilMoistureLevels,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Потребують зрошення"
        value={fieldsNeedingIrrigation}
        description="полів потребують зрошення"
        Icon={CloudDrizzle}
        theme="green"
      />
      <StatCard
        title="Загальний дефіцит"
        value={`${generalSoilMoistureDeficit} мм`}
        description="необхідно для всіх полів"
        Icon={Droplet}
        theme="blue"
      />
      <StatCard
        title="Критичні рівні вологості ґрунту"
        value={criticalSoilMoistureLevels}
        description="полів з критично низькою вологістю"
        Icon={AlertTriangle}
        theme="red"
      />
    </section>
  );
};

export default IrrigationSummaryCards;
