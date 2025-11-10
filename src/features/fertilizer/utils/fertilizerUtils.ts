import type { NutrientRequirement } from '@/models/fertilizer';

/**
 * Format nutrient value for display
 */
export const formatNutrientValue = (value: number): string => {
  return value.toFixed(1);
};

/**
 * Get primary nutrients (N-P-K) as a formatted string
 */
export const getPrimaryNutrientsString = (nutrients: NutrientRequirement): string => {
  return `N:${formatNutrientValue(nutrients.nitrogen)} P:${formatNutrientValue(nutrients.phosphorus)} K:${formatNutrientValue(nutrients.potassium)}`;
};

/**
 * Calculate total nutrient amount
 */
export const calculateTotalNutrients = (nutrients: NutrientRequirement): number => {
  return Object.values(nutrients).reduce((sum, value) => sum + value, 0);
};

/**
 * Check if nutrient value indicates deficit
 */
export const isNutrientDeficit = (value: number): boolean => {
  return value < 0;
};

/**
 * Get deficit severity level
 */
export const getDeficitSeverity = (
  deficit: number,
  required: number,
): 'none' | 'low' | 'medium' | 'high' | 'critical' => {
  if (deficit >= 0) return 'none';

  const deficitPercent = Math.abs(deficit) / required * 100;

  if (deficitPercent < 10) return 'low';
  if (deficitPercent < 25) return 'medium';
  if (deficitPercent < 50) return 'high';
  return 'critical';
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format date with month name
 */
export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Calculate days between dates
 */
export const daysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Check if date is in the past
 */
export const isPastDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Check if date is upcoming (within specified days)
 */
export const isUpcoming = (dateString: string, daysAhead: number = 7): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead);

  return date >= today && date <= futureDate;
};

/**
 * Get color class based on priority
 */
export const getPriorityColor = (priority: string): string => {
  const priorityLower = priority.toLowerCase();

  if (priorityLower === 'critical') return 'text-red-600 bg-red-100 border-red-300';
  if (priorityLower === 'high') return 'text-orange-600 bg-orange-100 border-orange-300';
  if (priorityLower === 'medium') return 'text-yellow-600 bg-yellow-100 border-yellow-300';
  return 'text-green-600 bg-green-100 border-green-300';
};

/**
 * Get badge color class based on priority
 */
export const getPriorityBadgeColor = (priority: string): string => {
  const priorityLower = priority.toLowerCase();

  if (priorityLower === 'critical') return 'bg-red-500';
  if (priorityLower === 'high') return 'bg-orange-500';
  if (priorityLower === 'medium') return 'bg-yellow-500';
  return 'bg-green-500';
};

/**
 * Get status badge color
 */
export const getStatusBadgeColor = (isCompleted: boolean, date: string): string => {
  if (isCompleted) return 'bg-green-500';
  if (isPastDate(date)) return 'bg-red-500';
  return 'bg-yellow-500';
};

/**
 * Get nutrient balance status color
 */
export const getBalanceStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();

  if (statusLower.includes('critical')) return 'text-red-600 bg-red-100';
  if (statusLower.includes('deficit')) return 'text-yellow-600 bg-yellow-100';
  if (statusLower.includes('surplus')) return 'text-blue-600 bg-blue-100';
  return 'text-green-600 bg-green-100';
};

/**
 * Get nutrient name in Ukrainian
 */
export const getNutrientNameUA = (nutrientKey: string): string => {
  const names: Record<string, string> = {
    nitrogen: 'Азот (N)',
    phosphorus: 'Фосфор (P)',
    potassium: 'Калій (K)',
    sulfur: 'Сірка (S)',
    calcium: 'Кальцій (Ca)',
    magnesium: 'Магній (Mg)',
    boron: 'Бор (B)',
    zinc: 'Цинк (Zn)',
    manganese: 'Марганець (Mn)',
    copper: 'Мідь (Cu)',
    iron: 'Залізо (Fe)',
    molybdenum: 'Молібден (Mo)',
  };

  return names[nutrientKey] || nutrientKey;
};

/**
 * Get nutrient symbol
 */
export const getNutrientSymbol = (nutrientKey: string): string => {
  const symbols: Record<string, string> = {
    nitrogen: 'N',
    phosphorus: 'P',
    potassium: 'K',
    sulfur: 'S',
    calcium: 'Ca',
    magnesium: 'Mg',
    boron: 'B',
    zinc: 'Zn',
    manganese: 'Mn',
    copper: 'Cu',
    iron: 'Fe',
    molybdenum: 'Mo',
  };

  return symbols[nutrientKey] || nutrientKey;
};

/**
 * Calculate percentage of nutrient applied
 */
export const calculateNutrientProgress = (
  applied: number,
  required: number,
): number => {
  if (required === 0) return 0;
  return Math.min((applied / required) * 100, 100);
};

/**
 * Get progress bar color
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 50) return 'bg-yellow-500';
  if (percentage >= 25) return 'bg-orange-500';
  return 'bg-red-500';
};

/**
 * Sort applications by date
 */
export const sortApplicationsByDate = <T extends { recommendedDate: string }>(
  applications: T[],
  ascending: boolean = true,
): T[] => {
  return [...applications].sort((a, b) => {
    const dateA = new Date(a.recommendedDate).getTime();
    const dateB = new Date(b.recommendedDate).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Group applications by status
 */
export const groupApplicationsByStatus = <T extends { isCompleted: boolean; recommendedDate: string }>(
  applications: T[],
): {
  completed: T[];
  upcoming: T[];
  overdue: T[];
} => {
  const completed: T[] = [];
  const upcoming: T[] = [];
  const overdue: T[] = [];

  applications.forEach((app) => {
    if (app.isCompleted) {
      completed.push(app);
    } else if (isPastDate(app.recommendedDate)) {
      overdue.push(app);
    } else {
      upcoming.push(app);
    }
  });

  return { completed, upcoming, overdue };
};

/**
 * Calculate total nutrients from multiple applications
 */
export const sumNutrients = (nutrientsList: NutrientRequirement[]): NutrientRequirement => {
  return nutrientsList.reduce(
    (sum, nutrients) => ({
      nitrogen: sum.nitrogen + nutrients.nitrogen,
      phosphorus: sum.phosphorus + nutrients.phosphorus,
      potassium: sum.potassium + nutrients.potassium,
      sulfur: sum.sulfur + nutrients.sulfur,
      calcium: sum.calcium + nutrients.calcium,
      magnesium: sum.magnesium + nutrients.magnesium,
      boron: sum.boron + nutrients.boron,
      zinc: sum.zinc + nutrients.zinc,
      manganese: sum.manganese + nutrients.manganese,
      copper: sum.copper + nutrients.copper,
      iron: sum.iron + nutrients.iron,
      molybdenum: sum.molybdenum + nutrients.molybdenum,
    }),
    {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      sulfur: 0,
      calcium: 0,
      magnesium: 0,
      boron: 0,
      zinc: 0,
      manganese: 0,
      copper: 0,
      iron: 0,
      molybdenum: 0,
    },
  );
};

