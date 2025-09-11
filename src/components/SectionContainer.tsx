import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
}

export default function SectionContainer({
  children,
  className,
  background = 'white',
}: SectionContainerProps) {
  const backgroundClasses = {
    white: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    gradient:
      'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800',
  };

  return (
    <section className={cn('py-20', backgroundClasses[background], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
