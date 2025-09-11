import { Cloud, DollarSign, Bug, Droplets } from 'lucide-react';
import { SectionContainer, SectionHeader, FeatureCard } from '@/components';

export default function ProblemStatement() {
  const problems = [
    {
      icon: Cloud,
      title: 'Непередбачувана погода',
      description:
        'Зміни клімату ускладнюють прогнозування погодних умов, що призводить до втрат врожаю та труднощів у плануванні.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Droplets,
      title: 'Неефективне використання ресурсів',
      description:
        'Вода та добрива витрачаються даремно через відсутність точних даних, що збільшує витрати та шкодить довкіллю.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Bug,
      title: 'Шкідники та хвороби',
      description:
        'Пізнє виявлення хвороб і шкідників може знищити весь врожай.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: DollarSign,
      title: 'Зростання витрат',
      description:
        'Збільшення цін на ресурси та нестабільність ринку зменшують прибутки фермерів.',
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <SectionContainer className="bg-white dark:bg-gray-900">
      <SectionHeader
        title="Землеробство — це складно."
        highlight="Ми робимо його розумнішим."
        description="Сучасне сільське господарство стикається з новими викликами. Традиційні методи вже не забезпечують потрібної ефективності та сталості."
        className="text-gray-900 dark:text-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {problems.map((problem, index) => (
          <FeatureCard
            key={index}
            icon={problem.icon}
            title={problem.title}
            description={problem.description}
            color={problem.color}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        ))}
      </div>
    </SectionContainer>
  );
}
