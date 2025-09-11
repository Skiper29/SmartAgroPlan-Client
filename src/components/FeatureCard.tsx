import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string;
  color: string;
  bgColor?: string;
  className?: string;
  variant?: 'default' | 'benefit' | 'feature';
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  details,
  color,
  bgColor,
  className,
  variant = 'default',
}: FeatureCardProps) {
  if (variant === 'benefit') {
    return (
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-gray-800',
          bgColor,
          className,
        )}
      >
        <CardContent className="p-8">
          {/* Icon */}
          <div
            className={cn(
              'inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 shadow-lg bg-gradient-to-br',
              color,
            )}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
            {description}
          </p>
          {details && (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {details}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2',
        className,
      )}
    >
      {/* Gradient Background on Hover */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 bg-gradient-to-br',
          color,
        )}
      />

      <CardContent className="relative z-10 p-8 flex flex-col h-full">
        {/* Icon */}
        <div
          className={cn(
            'inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 shadow-lg bg-gradient-to-br',
            color,
          )}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200">
          {description}
        </p>

        {/* Learn More Link - always at the bottom */}
        <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-green-600 dark:text-green-400 font-semibold text-sm hover:text-green-700 dark:hover:text-green-300 cursor-pointer">
            Дізнатися більше →
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
