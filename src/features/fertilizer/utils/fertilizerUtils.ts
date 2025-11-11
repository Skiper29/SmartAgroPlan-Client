import type { NutrientRequirement } from '@/models/fertilizer';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  type LucideIcon,
  MinusCircle,
  PlusCircle,
  ThumbsUp,
} from 'lucide-react';
import {
  RecommendationPriority,
  type RecommendationPriority as PriorityType,
} from '@/models/fertilizer';
/**
 * Helper function to safely lowercase a string
 */
const safeLowerCase = (value: string | PriorityType): string =>
  String(value).toLowerCase();

/**
 * Returns a full styling profile for a recommendation priority
 */
export const getPriorityStyling = (
  priority: PriorityType | string,
): {
  label: string;
  icon: LucideIcon;
  badgeClasses: string;
  borderClasses: string;
  textClasses: string;
} => {
  const priorityLower = safeLowerCase(priority);

  switch (priorityLower) {
    case safeLowerCase(RecommendationPriority.Critical):
      return {
        label: 'Критичний',
        icon: AlertTriangle,
        badgeClasses: 'bg-red-500 border-red-700 text-white',
        borderClasses: 'border-l-red-500',
        textClasses: 'text-red-600 dark:text-red-400',
      };
    case safeLowerCase(RecommendationPriority.High):
      return {
        label: 'Високий',
        icon: AlertCircle,
        badgeClasses:
          'bg-orange-500 border-orange-700 text-white dark:text-orange-950',
        borderClasses: 'border-l-orange-500',
        textClasses: 'text-orange-600 dark:text-orange-400',
      };
    case safeLowerCase(RecommendationPriority.Medium):
      return {
        label: 'Середній',
        icon: Info,
        badgeClasses:
          'bg-yellow-400 border-yellow-600 text-yellow-900 dark:text-yellow-950',
        borderClasses: 'border-l-yellow-400',
        textClasses: 'text-yellow-600 dark:text-yellow-400',
      };
    case safeLowerCase(RecommendationPriority.Low):
    default:
      return {
        label: 'Низький',
        icon: CheckCircle,
        badgeClasses:
          'bg-green-500 border-green-700 text-white dark:text-green-950',
        borderClasses: 'border-l-green-500',
        textClasses: 'text-green-600 dark:text-green-400',
      };
  }
};

/**
 * Returns a full styling profile for the nutrient balance status
 */
export const getBalanceStatusStyling = (
  status: string,
): {
  icon: LucideIcon;
  text: string;
  border: string;
  bg: string;
  headerBg: string;
  headerText: string;
  iconBg: string;
} => {
  const statusLower = safeLowerCase(status);

  if (statusLower.includes('critical') || statusLower.includes('критичний')) {
    return {
      icon: AlertTriangle,
      text: 'text-red-700 dark:text-red-300',
      border: 'border-l-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      headerBg: 'bg-red-50 dark:bg-gray-800',
      headerText: 'text-red-700 dark:text-red-300',
      iconBg: 'bg-red-500',
    };
  }
  if (statusLower.includes('deficit') || statusLower.includes('дефіцит')) {
    return {
      icon: MinusCircle,
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-l-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      headerBg: 'bg-yellow-50 dark:bg-gray-800',
      headerText: 'text-yellow-700 dark:text-yellow-300',
      iconBg: 'bg-yellow-500',
    };
  }
  if (statusLower.includes('surplus') || statusLower.includes('надлишок')) {
    return {
      icon: PlusCircle,
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-l-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      headerBg: 'bg-blue-50 dark:bg-gray-800',
      headerText: 'text-blue-700 dark:text-blue-300',
      iconBg: 'bg-blue-500',
    };
  }
  // Default to "Balanced"
  return {
    icon: ThumbsUp,
    text: 'text-green-700 dark:text-green-300',
    border: 'border-l-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    headerBg: 'bg-green-50 dark:bg-gray-800',
    headerText: 'text-green-700 dark:text-green-300',
    iconBg: 'bg-green-500',
  };
};

/**
 * Format nutrient value for display
 */
export const formatNutrientValue = (value: number): string => {
  return value.toFixed(1);
};

/**
 * Get primary nutrients (N-P-K) as a formatted string
 */
export const getPrimaryNutrientsString = (
  nutrients: NutrientRequirement,
): string => {
  return `N:${formatNutrientValue(nutrients.nitrogen)} P:${formatNutrientValue(nutrients.phosphorus)} K:${formatNutrientValue(nutrients.potassium)}`;
};

/**
 * Get primary nutrients (N-P-K) as a simple array for mapping
 */
export const getPrimaryNutrientsArray = (
  nutrients: NutrientRequirement,
): { name: string; value: string }[] => {
  return [
    { name: 'N', value: formatNutrientValue(nutrients.nitrogen) },
    { name: 'P', value: formatNutrientValue(nutrients.phosphorus) },
    { name: 'K', value: formatNutrientValue(nutrients.potassium) },
  ];
};

/**
 * Calculate total nutrient amount
 */
export const calculateTotalNutrients = (
  nutrients: NutrientRequirement,
): number => {
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

  const deficitPercent = (Math.abs(deficit) / required) * 100;

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
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
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
export const isUpcoming = (
  dateString: string,
  daysAhead: number = 7,
): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead);
  // Reset time part for accurate date comparison
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date >= today && date <= futureDate;
};

/**
 * Get color class based on priority
 */
export const getPriorityColor = (priority: string): string => {
  const priorityLower = priority.toLowerCase();

  if (priorityLower === 'критичний')
    return 'text-red-600 bg-red-100 border-red-300';
  if (priorityLower === 'високий')
    return 'text-orange-600 bg-orange-100 border-orange-300';
  if (priorityLower === 'середній')
    return 'text-yellow-600 bg-yellow-100 border-yellow-300';
  return 'text-green-600 bg-green-100 border-green-300';
};

/**
 * Get badge color class based on priority
 */
export const getPriorityBadgeColor = (priority: string): string => {
  const priorityLower = priority.toLowerCase();

  if (priorityLower === 'критичний') return 'bg-red-500';
  if (priorityLower === 'високий') return 'bg-orange-500';
  if (priorityLower === 'середній') return 'bg-yellow-500';
  return 'bg-green-500';
};

/**
 * Get status badge color
 */
export const getStatusBadgeColor = (
  isCompleted: boolean,
  date: string,
): string => {
  if (isCompleted) return 'bg-green-500';
  if (isPastDate(date)) return 'bg-red-500';
  return 'bg-yellow-500';
};

/**
 * Get nutrient balance status color
 */
export const getBalanceStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();

  if (statusLower.includes('критичний')) return 'text-red-600 bg-red-100';
  if (statusLower.includes('дефіцит')) return 'text-yellow-600 bg-yellow-100';
  if (statusLower.includes('помірний дефіцит'))
    return 'text-blue-600 bg-blue-100';
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
export const groupApplicationsByStatus = <
  T extends { isCompleted: boolean; recommendedDate: string },
>(
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
export const sumNutrients = (
  nutrientsList: NutrientRequirement[],
): NutrientRequirement => {
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
