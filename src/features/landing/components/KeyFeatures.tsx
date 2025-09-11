import { Brain, Droplets, Cloud, Bug, Calendar, BarChart3 } from 'lucide-react';
import { SectionContainer, SectionHeader, FeatureCard } from '@/components';

export default function KeyFeatures() {
  const features = [
    {
      icon: Brain,
      title: 'Короткострокове прогнозування',
      description:
        'Експоненціальне згладжування та погодні API для точних прогнозів на найближчі дні.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Droplets,
      title: 'Планування ресурсів',
      description:
        'Оптимізація води та добрив на основі погодних даних та історії полів.',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Cloud,
      title: 'Середньострокове прогнозування',
      description:
        'ARIMA та диференціальні рівняння для прогнозів на тижні та місяці.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Bug,
      title: 'Оперативні рішення',
      description:
        'Нечітка логіка та експертні системи для швидких рекомендацій щодо захисту та догляду.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Calendar,
      title: 'Довгострокове прогнозування',
      description:
        'Генетичні алгоритми та стохастичні моделі для стратегічного планування сезону.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: BarChart3,
      title: 'Звіти та інсайти',
      description:
        'Дашборди з аналітикою, експорт звітів, швидкий доступ до даних через CDN.',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <SectionContainer className="bg-white dark:bg-gray-900">
      <SectionHeader
        title="Можливості, створені"
        highlight="для фермерів"
        description="Кожна функція розроблена з урахуванням реальних потреб фермерів, поєднуючи сучасні технології та аграрний досвід."
        className="text-gray-900 dark:text-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        ))}
      </div>
    </SectionContainer>
  );
}
