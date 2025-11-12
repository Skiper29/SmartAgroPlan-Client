import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';
import type { NutrientBalance } from '@/models/fertilizer';
import NutrientTable from './NutrientTable';
import { cn } from '@/lib/utils';

interface NutrientBalanceDetailCardProps {
  balance: NutrientBalance;
}

/**
 * A styled card component to display the detailed nutrient balance table.
 */
const NutrientBalanceDetailCard: React.FC<NutrientBalanceDetailCardProps> = ({
  balance,
}) => {
  return (
    <Card id="balance" className="border-l-4 border-l-blue-500">
      <CardHeader
        className={cn('pb-4 text-lg', ' text-blue-700 dark:text-blue-300')}
      >
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="p-1.5 bg-blue-500 rounded-lg">
            <Scale className="h-5 w-5 text-white" />
          </div>
          Детальний Баланс Поживних Речовин
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <NutrientTable
          required={balance.requiredForTargetYield}
          available={balance.availableInSoil}
          applied={balance.alreadyApplied}
          deficit={balance.deficit}
          surplus={balance.surplus}
        />
      </CardContent>
    </Card>
  );
};

export default NutrientBalanceDetailCard;
