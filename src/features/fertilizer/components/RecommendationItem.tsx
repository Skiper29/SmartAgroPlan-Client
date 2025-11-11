import React from 'react';
import { CheckCircle } from 'lucide-react';

interface RecommendationItemProps {
  recommendation: string;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  recommendation,
}) => {
  return (
    <li className="flex items-start gap-3 py-2">
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {recommendation}
      </span>
    </li>
  );
};

export default RecommendationItem;
