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

interface NutrientTableProps {
  nutrients: NutrientRequirement;
  title?: string;
  showComparison?: boolean;
  comparison?: {
    required?: NutrientRequirement;
    available?: NutrientRequirement;
    applied?: NutrientRequirement;
  };
}

const NutrientTable: React.FC<NutrientTableProps> = ({
  nutrients,
  title = 'Поживні речовини',
  showComparison = false,
  comparison,
}) => {
  const nutrientKeys = Object.keys(nutrients) as Array<
    keyof NutrientRequirement
  >;

  // Filter out nutrients with zero values if not showing comparison
  const displayKeys = showComparison
    ? nutrientKeys
    : nutrientKeys.filter(
        (key) => nutrients[key] > 0 || (comparison?.required?.[key] ?? 0) > 0,
      );

  return (
    <div className="space-y-2">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Елемент</TableHead>
              {showComparison && comparison?.required && (
                <TableHead className="text-right">Потрібно</TableHead>
              )}
              {showComparison && comparison?.available && (
                <TableHead className="text-right">Доступно</TableHead>
              )}
              {showComparison && comparison?.applied && (
                <TableHead className="text-right">Внесено</TableHead>
              )}
              <TableHead className="text-right">
                {showComparison ? 'Дефіцит  ' : 'Кількість'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayKeys.map((key) => {
              const value = nutrients[key];
              const isDeficit = showComparison && value < 0;
              const isSurplus = showComparison && value > 0;

              return (
                <TableRow key={key}>
                  <TableCell className="font-medium">
                    {getNutrientNameUA(key)}
                  </TableCell>
                  {showComparison && comparison?.required && (
                    <TableCell className="text-right">
                      {formatNutrientValue(comparison.required[key])}
                    </TableCell>
                  )}
                  {showComparison && comparison?.available && (
                    <TableCell className="text-right">
                      {formatNutrientValue(comparison.available[key])}
                    </TableCell>
                  )}
                  {showComparison && comparison?.applied && (
                    <TableCell className="text-right">
                      {formatNutrientValue(comparison.applied[key])}
                    </TableCell>
                  )}
                  <TableCell
                    className={`text-right font-semibold ${
                      isDeficit
                        ? 'text-red-600 dark:text-red-400'
                        : isSurplus
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {formatNutrientValue(value)} кг/га
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NutrientTable;
