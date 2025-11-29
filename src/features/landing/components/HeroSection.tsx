import { ArrowRight, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import CTAButtonGroup from '@/components/CTAButtonGroup';

export default function HeroSection() {
  const ctaButtons = [
    {
      label: 'Почати безкоштовно',
      icon: ArrowRight,
      variant: 'default' as const,
    },
    {
      label: 'Переглянути демо',
      icon: Play,
      variant: 'outline' as const,
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#16a34a\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <Badge className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 text-green-800 dark:text-green-200 font-medium">
            <span className="text-sm">
              🌱 Платформа для ефективного с/г господарства
            </span>
          </Badge>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Розумне землеробство
            <span className="block text-green-600 dark:text-green-400">
              — це просто
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Підвищуйте ефективність вашого господарства, перетворюючи дані з
            полів на чіткі плани дій.{' '}
            <strong className="font-semibold text-green-600 dark:text-green-400">
              SmartAgroPlan
            </strong>{' '}
            використовує передову аналітику, щоб допомогти вам точно
            прогнозувати врожайність, оптимізувати використання добрив та
            техніки, і приймати зважені рішення на основі фактів, а не лише
            інтуїції. Отримуйте швидкий доступ до важливої інформації прямо в
            полі з будь-якого пристрою.
          </p>

          {/* CTA Buttons */}
          <CTAButtonGroup buttons={ctaButtons} />
        </div>
      </div>
    </section>
  );
}
