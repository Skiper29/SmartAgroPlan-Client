import { ArrowRight, Calendar, Users } from 'lucide-react';
import CTAButtonGroup from '@/components/CTAButtonGroup';
import { Card, CardContent } from '@/components/ui/card.tsx';

export default function CallToAction() {
  const ctaButtons = [
    {
      label: 'Почати безкоштовно',
      icon: ArrowRight,
      variant: 'default' as const,
    },
    {
      label: 'Забронювати демо',
      icon: Calendar,
      variant: 'outline' as const,
    },
  ];

  const valueProps = [
    { value: '30%', label: 'Економія витрат' },
    { value: '25%', label: 'Зростання врожайності' },
    { value: '0', label: 'Вступний внесок' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-white dark:text-green-200 mb-6 leading-tight">
            Готові розвивати
            <span className="block text-green-200">господарство розумно?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
            Приєднуйтесь до 10 000+ фермерів, які вже змінили своє господарство.
            Почніть шлях до розумного землеробства сьогодні.
          </p>

          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {valueProps.map((prop, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {prop.value}
                  </div>
                  <div className="text-green-100">{prop.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Buttons */}
          <CTAButtonGroup buttons={ctaButtons} className="mb-8" />

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-green-100">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>10 000+ фермерів</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">⭐⭐⭐⭐⭐</span>
              <span>4.9/5 рейтинг</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
