import {
  Thermometer,
  Wind,
  Droplet,
  Sun,
  CloudRain,
  type LucideIcon,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronRightCircle,
  AlertCircle,
} from 'lucide-react';

export const IrrigationAction = {
  None: 'Не потрібно зрошення',
  Light: 'Легке зрошення рекомендовано',
  Medium: 'Середнє зрошення рекомендовано',
  Intensive: 'Інтенсивне зрошення рекомендовано',
  VeryIntensive: 'Дуже інтенсивне зрошення рекомендовано',
} as const;

// Створюємо тип зі значень об'єкта
type IrrigationActionValue =
  (typeof IrrigationAction)[keyof typeof IrrigationAction];

export const getIrrigationActionStyle = (
  action: IrrigationActionValue | string,
): {
  icon: LucideIcon;
  label: string;
  colorClassName: string;
  bgColorClassName: string;
} => {
  switch (action) {
    case IrrigationAction.None:
      return {
        icon: CheckCircle,
        label: 'Без зрошення',
        colorClassName: 'text-green-800 dark:text-green-200',
        bgColorClassName: 'bg-green-100 dark:bg-green-900/50',
      };
    case IrrigationAction.Light:
      return {
        icon: Info,
        label: 'Легке',
        colorClassName: 'text-blue-800 dark:text-blue-200',
        bgColorClassName: 'bg-blue-100 dark:bg-blue-900/50',
      };
    case IrrigationAction.Medium:
      return {
        icon: ChevronRightCircle,
        label: 'Середнє',
        colorClassName: 'text-yellow-800 dark:text-yellow-200',
        bgColorClassName: 'bg-yellow-100 dark:bg-yellow-900/50',
      };
    case IrrigationAction.Intensive:
      return {
        icon: AlertTriangle,
        label: 'Інтенсивне',
        colorClassName: 'text-orange-800 dark:text-orange-200',
        bgColorClassName: 'bg-orange-100 dark:bg-orange-900/50',
      };
    case IrrigationAction.VeryIntensive:
      return {
        icon: AlertCircle,
        label: 'Дуже інтенсивне',
        colorClassName: 'text-red-800 dark:text-red-200',
        bgColorClassName: 'bg-red-100 dark:bg-red-900/50',
      };
    default:
      return {
        icon: Info,
        label: 'Невідомо',
        colorClassName: 'text-gray-800 dark:text-gray-200',
        bgColorClassName: 'bg-gray-100 dark:bg-gray-800',
      };
  }
};

// Іконки для погодних умов та інших показників
export const weatherIcons = {
  temperature: Thermometer,
  wind: Wind,
  humidity: Droplet,
  solar: Sun,
  precipitation: CloudRain,
};
