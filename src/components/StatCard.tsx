// Define the themes for the cards
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils';

const cardThemes = {
  green: {
    border: 'border-l-green-500',
    text: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
    iconText: 'text-green-700 dark:text-green-300',
  },
  blue: {
    border: 'border-l-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    iconText: 'text-blue-700 dark:text-blue-300',
  },
  red: {
    border: 'border-l-red-500',
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
    iconText: 'text-red-700 dark:text-red-300',
  },
};

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  Icon: LucideIcon;
  theme: keyof typeof cardThemes;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  Icon,
  theme,
}) => {
  const colors = cardThemes[theme];

  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:-translate-y-1 border-l-4 shadow-lg hover:shadow-2xl',
        colors.border,
      )}
    >
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-xl font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn('p-3 rounded-xl', colors.bg)}>
            <Icon className={cn('h-6 w-6', colors.iconText)} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn('text-4xl font-extrabold', colors.text)}>
          {value}
        </div>
        <p className="text-xm text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
