import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { NutrientRequirement } from '@/models/fertilizer';
import {
  getNutrientNameUA,
  formatNutrientValue,
  getNutrientBalanceStyling,
} from '../utils/fertilizerUtils';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NutrientTableProps {
  required: NutrientRequirement;
  available: NutrientRequirement;
  applied: NutrientRequirement;
  deficit: NutrientRequirement;
  surplus: NutrientRequirement;
}

const NutrientTable: React.FC<NutrientTableProps> = ({
  required,
  available,
  applied,
  deficit,
  surplus,
}) => {
  const nutrientKeys = Object.keys(deficit) as Array<keyof NutrientRequirement>;
  const primaryNutrients = ['nitrogen', 'phosphorus', 'potassium'];

  // Calculate the actual balance for each nutrient (negative = deficit, positive = surplus)
  const calculateBalance = (key: keyof NutrientRequirement): number => {
    const deficitValue = deficit[key] ?? 0;
    const surplusValue = surplus[key] ?? 0;

    // If there's surplus, it's positive; if deficit, it's negative
    if (surplusValue > 0) return surplusValue;
    if (deficitValue > 0) return -deficitValue;
    return 0;
  };

  // Фільтруємо ключі: показуємо N, P, K, а також будь-які інші поживні речовини,
  // які або потрібні, або мають баланс (дефіцит/надлишок)
  const displayKeys = nutrientKeys.filter(
    (key) =>
      primaryNutrients.includes(key) ||
      (required[key] ?? 0) > 0 ||
      calculateBalance(key) !== 0,
  );

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
          <TableRow>
            <TableHead className="w-[180px] font-semibold text-muted-foreground">
              Елемент
            </TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">
              Потрібно (Ціль)
            </TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">
              Доступно (Ґрунт)
            </TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">
              Внесено
            </TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">
              Баланс (Дефіцит/Надлишок)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayKeys.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-8"
              >
                Немає даних для відображення
              </TableCell>
            </TableRow>
          )}
          {displayKeys.map((key) => {
            const balanceValue = calculateBalance(key);
            const styling = getNutrientBalanceStyling(balanceValue);
            const isPrimary = primaryNutrients.includes(key);

            // Use centralized styling
            const BalanceIcon = styling.icon;
            const iconColor = styling.iconColor;

            return (
              <TableRow
                key={key}
                className={cn(
                  'transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30',
                  isPrimary && 'bg-gray-50/50 dark:bg-gray-800/50',
                )}
              >
                <TableCell
                  className={cn(
                    'text-base font-semibold',
                    isPrimary
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {getNutrientNameUA(key)}
                </TableCell>
                <TableCell className="text-right text-base font-mono text-muted-foreground">
                  {formatNutrientValue(required[key])}
                </TableCell>
                <TableCell className="text-right text-base font-mono text-muted-foreground">
                  {formatNutrientValue(available[key])}
                </TableCell>
                <TableCell className="text-right text-base font-mono text-gray-800 dark:text-gray-200">
                  {formatNutrientValue(applied[key])}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <BalanceIcon className={cn('h-4 w-4', iconColor)} />
                    <Badge
                      className={cn(
                        'text-base font-bold border px-3 py-1.5 flex items-center gap-1.5 w-35',
                        styling.bg,
                        styling.text,
                        styling.border,
                      )}
                    >
                      <span>
                        {balanceValue > 0 ? '+' : ''}
                        {formatNutrientValue(Math.abs(balanceValue))}
                      </span>
                      <span className="text-xs font-medium opacity-70">
                        кг/га
                      </span>
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default NutrientTable;
