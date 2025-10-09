import {
  AlertTriangle,
  Droplets,
  Info,
  Thermometer,
  Wind,
  type LucideIcon,
  HelpCircle,
} from 'lucide-react';

export interface ParsedNote {
  type: 'critical' | 'warning' | 'info' | 'success' | 'weather';
  text: string;
  icon: LucideIcon;
  colorClassName: string;
}

export const parseIrrigationNotes = (notes: string): ParsedNote[] => {
  const parsedNotes: ParsedNote[] = [];
  const sentences = notes.split('. ').filter((s) => s.trim() !== '');

  sentences.forEach((sentence) => {
    const lowerSentence = sentence.toLowerCase();

    if (lowerSentence.startsWith('критично')) {
      parsedNotes.push({
        type: 'critical',
        text: sentence,
        icon: AlertTriangle,
        colorClassName: 'text-red-600 dark:text-red-400',
      });
    } else if (lowerSentence.includes('дефіцит води')) {
      parsedNotes.push({
        type: 'warning',
        text: sentence,
        icon: AlertTriangle,
        colorClassName: 'text-orange-600 dark:text-orange-400',
      });
    } else if (lowerSentence.startsWith('вологість ґрунту в нормі')) {
      parsedNotes.push({
        type: 'success',
        text: sentence,
        icon: Droplets,
        colorClassName: 'text-green-600 dark:text-green-400',
      });
    } else if (lowerSentence.includes('сильний вітер')) {
      parsedNotes.push({
        type: 'weather',
        text: sentence,
        icon: Wind,
        colorClassName: 'text-blue-600 dark:text-blue-400',
      });
    } else if (lowerSentence.includes('висока температура')) {
      parsedNotes.push({
        type: 'weather',
        text: sentence,
        icon: Thermometer,
        colorClassName: 'text-yellow-600 dark:text-yellow-400',
      });
    } else if (lowerSentence.includes('орієнтовно потрібно')) {
      parsedNotes.push({
        type: 'info',
        text: sentence,
        icon: Info,
        colorClassName: 'text-gray-600 dark:text-gray-400',
      });
    } else {
      // Для будь-яких інших нотаток
      parsedNotes.push({
        type: 'info',
        text: sentence,
        icon: HelpCircle,
        colorClassName: 'text-gray-500 dark:text-gray-400',
      });
    }
  });

  return parsedNotes;
};
