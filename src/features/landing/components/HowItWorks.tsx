import { Upload, Brain, Target, TrendingUp } from 'lucide-react';
import SectionContainer from '../../../components/SectionContainer';
import SectionHeader from '../../../components/SectionHeader';
import FeatureCard from '../../../components/FeatureCard';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Upload,
      title: 'Введіть дані про поле',
      description:
        'Завантажте інформацію про поля, культури, ґрунти та історію. Система інтегрується з вашими агроінструментами.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: '02',
      icon: Brain,
      title: 'Аналіз ШІ',
      description:
        'Алгоритми аналізують погоду, ґрунт, стадії росту та ринкові дані для створення інсайтів.',
      color: 'from-green-500 to-green-600',
    },
    {
      step: '03',
      icon: Target,
      title: 'Отримайте рекомендації',
      description:
        'Персоналізовані поради щодо поливу, добрив, захисту від шкідників і оптимального збору врожаю.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      step: '04',
      icon: TrendingUp,
      title: 'Контролюйте та вдосконалюйте',
      description:
        'Відстежуйте прогрес, коригуйте плани за даними та постійно вдосконалюйте господарство.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <SectionContainer
      background="gradient"
      className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800"
    >
      <SectionHeader
        title="Від даних —"
        highlight="до розумних рішень"
        description="Наш простий 4-кроковий процес перетворює дані вашого господарства на дієві інсайти. Точне землеробство — доступне кожному фермеру."
        className="text-gray-900 dark:text-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative h-full flex flex-col">
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
              <span className="text-lg font-bold text-gray-700">
                {step.step}
              </span>
            </div>
            <FeatureCard
              icon={step.icon}
              title={step.title}
              description={step.description}
              color={step.color}
              className="pt-8 h-full flex flex-col justify-between min-h-[340px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
