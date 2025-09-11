import { DollarSign, TrendingUp, Shield, Smartphone } from 'lucide-react';
import SectionContainer from '../../../components/SectionContainer';
import SectionHeader from '../../../components/SectionHeader';
import FeatureCard from '../../../components/FeatureCard';

export default function Benefits() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Економія води та добрив',
      description: 'Зменшення витрат до 30%',
      details:
        'Точні рекомендації на основі погодних даних, експоненціального згладжування та історії полів дозволяють уникати перевитрат і оптимізувати використання ресурсів.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      title: 'Збільшення врожайності',
      description: 'Зростання продуктивності на 25%',
      details:
        'Прогнози на основі ARIMA, генетичних алгоритмів та погодних API допомагають максимізувати потенціал врожаю та досягати стабільно високих результатів.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Shield,
      title: 'Запобігання втратам',
      description: 'Зниження ризиків на 40%',
      details:
        'Системи нечіткої логіки та експертні системи дозволяють діяти на випередження щодо погоди, шкідників і хвороб.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Smartphone,
      title: 'Зручний інтерфейс',
      description: 'Створено для фермерів',
      details:
        'Інтуїтивний дашборд, мобільна версія та швидкий доступ до даних через CDN роблять складні дані простими для розуміння та дій.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <SectionContainer className="bg-white dark:bg-gray-900">
      <SectionHeader
        title="Чому"
        subtitle=" SmartAgroPlan?"
        description="Дізнайтеся, як наша платформа може змінити ваше землеробство за допомогою сучасних технологій та інноваційних рішень."
        className="text-gray-900 dark:text-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <FeatureCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            details={benefit.details}
            color={benefit.color}
            bgColor={benefit.bgColor}
            variant="benefit"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        ))}
      </div>
    </SectionContainer>
  );
}
