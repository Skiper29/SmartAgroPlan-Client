import React from 'react';
import { Button } from '@/components/ui/button';
import { METRIC_CATEGORIES, CATEGORY_LABELS } from './metricConfigs';
import type { MetricVisibility } from './types';
import { Sprout, FlaskConical, CloudRain } from 'lucide-react';

interface CategorySelectorProps {
  visibility: MetricVisibility;
  onToggleCategory: (category: keyof typeof METRIC_CATEGORIES) => void;
  hasDataInCategory: (category: keyof typeof METRIC_CATEGORIES) => boolean;
}

const CATEGORY_ICONS = {
  soil: FlaskConical,
  nutrients: Sprout,
  weather: CloudRain,
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  visibility,
  onToggleCategory,
  hasDataInCategory,
}) => {
  const isCategoryActive = (category: keyof typeof METRIC_CATEGORIES) => {
    const metrics = METRIC_CATEGORIES[category];
    return metrics.some((metric) => visibility[metric]);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-4">
      {(
        Object.keys(METRIC_CATEGORIES) as Array<keyof typeof METRIC_CATEGORIES>
      ).map((category) => {
        const Icon = CATEGORY_ICONS[category];
        const isActive = isCategoryActive(category);
        const hasData = hasDataInCategory(category);

        return (
          <Button
            key={category}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => hasData && onToggleCategory(category)}
            disabled={!hasData}
            className="flex items-center gap-2 transition-all duration-200"
          >
            <Icon className="h-4 w-4" />
            {CATEGORY_LABELS[category]}
          </Button>
        );
      })}
    </div>
  );
};

export default CategorySelector;
