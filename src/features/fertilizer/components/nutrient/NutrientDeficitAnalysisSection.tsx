import React from 'react';
import type { NutrientDeficitAnalysis } from '@/models/fertilizer';
import NutrientDeficitAnalysisCard from './NutrientDeficitAnalysisCard.tsx';
import { AlertTriangle } from 'lucide-react';

interface NutrientDeficitAnalysisSectionProps {
  deficitAnalysis: NutrientDeficitAnalysis;
}

const NutrientDeficitAnalysisSection: React.FC<
  NutrientDeficitAnalysisSectionProps
> = ({ deficitAnalysis }) => {
  if (!deficitAnalysis || deficitAnalysis.deficits.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
        <AlertTriangle className="h-6 w-6 mr-2 text-orange-500" />
        Виявлені дефіцити
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deficitAnalysis.deficits.map((deficit, index) => (
          <NutrientDeficitAnalysisCard key={index} deficit={deficit} />
        ))}
      </div>
    </section>
  );
};

export default NutrientDeficitAnalysisSection;
