import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButton {
  label: string;
  icon?: LucideIcon;
  variant?: 'default' | 'outline' | 'secondary';
  onClick?: () => void;
  href?: string;
}

interface CTAButtonGroupProps {
  buttons: CTAButton[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export default function CTAButtonGroup({
  buttons,
  className,
  layout = 'horizontal',
}: CTAButtonGroupProps) {
  return (
    <div
      className={cn(
        'flex gap-4 justify-center items-center pt-8',
        layout === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row',
        className,
      )}
    >
      {buttons.map((button, index) => {
        const Icon = button.icon;

        return (
          <Button
            key={index}
            size="lg"
            variant={button.variant || 'default'}
            className={cn(
              'px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300',
              button.variant === 'default' &&
                'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
              button.variant === 'outline' &&
                'border-2 border-green-600 text-green-700 hover:bg-green-50',
            )}
            onClick={button.onClick}
          >
            {Icon && <Icon className="mr-2 h-5 w-5" />}
            {button.label}
          </Button>
        );
      })}
    </div>
  );
}
