import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningItemProps {
  warning: string;
}

const WarningItem: React.FC<WarningItemProps> = ({ warning }) => {
  return (
    <li className="flex items-start gap-3 py-2">
      <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-500" />
      <span className="text-sm text-yellow-800 dark:text-yellow-200">
        {warning}
      </span>
    </li>
  );
};

export default WarningItem;
