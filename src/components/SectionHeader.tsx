import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  highlight,
  description,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', centered && 'text-center', className)}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
        {title}
        {highlight && <span className="block text-green-600">{highlight}</span>}
        {subtitle && <span className="block text-green-600">{subtitle}</span>}
      </h2>
      {description && (
        <p
          className={cn(
            'text-xl text-gray-600 leading-relaxed',
            centered && 'max-w-3xl mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
