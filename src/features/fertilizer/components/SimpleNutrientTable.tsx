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
} from '../utils/fertilizerUtils';
import { cn } from '@/lib/utils';

interface SimpleNutrientTableProps {
  nutrients: NutrientRequirement;
  title?: string;
}

/**
 * A simple table to display nutrient values without balance calculations
 * Used for displaying summary data like total applied or planned nutrients
 */
const SimpleNutrientTable: React.FC<SimpleNutrientTableProps> = ({
  nutrients,
  title,
}) => {
  const nutrientKeys = Object.keys(nutrients) as Array<
    keyof NutrientRequirement
  >;
  const primaryNutrients = ['nitrogen', 'phosphorus', 'potassium'];

  // Filter keys: show N, P, K, and any other nutrients with values > 0
  const displayKeys = nutrientKeys.filter(
    (key) => primaryNutrients.includes(key) || (nutrients[key] ?? 0) > 0,
  );

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {title && (
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
      )}
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
          <TableRow>
            <TableHead className="font-semibold text-muted-foreground">
              Елемент
            </TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">
              Кількість (кг/га)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayKeys.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground py-8"
              >
                Немає даних для відображення
              </TableCell>
            </TableRow>
          )}
          {displayKeys.map((key) => {
            const isPrimary = primaryNutrients.includes(key);
            const value = nutrients[key];

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
                    'text-base font-medium',
                    isPrimary
                      ? 'text-gray-900 dark:text-gray-100 font-semibold'
                      : 'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {getNutrientNameUA(key)}
                </TableCell>
                <TableCell className="text-right text-base font-mono text-gray-800 dark:text-gray-200">
                  {formatNutrientValue(value)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SimpleNutrientTable;
