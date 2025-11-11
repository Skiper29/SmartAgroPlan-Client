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
  balance: NutrientRequirement;
  required: NutrientRequirement;
  available: NutrientRequirement;
  applied: NutrientRequirement;
}

const NutrientTable: React.FC<NutrientTableProps> = ({
  balance,
  required,
  available,
  applied,
}) => {
  const nutrientKeys = Object.keys(balance) as Array<keyof NutrientRequirement>;
  const primaryNutrients = ['nitrogen', 'phosphorus', 'potassium'];

  // Фільтруємо ключі: показуємо N, P, K, а також будь-які інші поживні речовини,
  // які або потрібні, або мають баланс (дефіцит/надлишок)
  const displayKeys = nutrientKeys.filter(
    (key) =>
      primaryNutrients.includes(key) ||
      (required[key] ?? 0) > 0 ||
      (balance[key] ?? 0) !== 0,
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
            const balanceValue = balance[key];
            const styling = getNutrientBalanceStyling(balanceValue);
            const isPrimary = primaryNutrients.includes(key);

            return (
              <TableRow
                key={key}
                className={cn(isPrimary && 'bg-gray-50 dark:bg-gray-800/50')}
              >
                <TableCell
                  className={cn(
                    'text-lg font-semibold',
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
                  <Badge
                    className={cn(
                      'text-lg font-bold border px-3 py-1',
                      styling.bg,
                      styling.text,
                      styling.border,
                    )}
                  >
                    {balanceValue >= 0 ? '+' : ''}
                    {formatNutrientValue(balanceValue)}
                    <span className="ml-1.5 text-xs font-medium opacity-80">
                      кг/га
                    </span>
                  </Badge>
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
