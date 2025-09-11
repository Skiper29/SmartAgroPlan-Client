import SectionContainer from '@/components/SectionContainer';
import SectionHeader from '@/components/SectionHeader';
import TestimonialCard from '@/components/TestimonialCard';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Олександр Коваленко',
      role: 'Фермер, Київська область',
      location: 'Україна',
      avatar: '👨‍🌾',
      rating: 5,
      quote:
        'Використовую SmartAgroPlan для короткострокових прогнозів врожаю. Експоненціальне згладжування та погодні API допомогли зекономити воду та добрива.',
      highlight: 'Економія 28% ресурсів',
    },
    {
      name: 'Ірина Гончар',
      role: 'Агроном, Вінницька область',
      location: 'Україна',
      avatar: '👩‍🌾',
      rating: 5,
      quote:
        'ARIMA та диференціальні рівняння для середньострокових прогнозів — це справжній прорив! Тепер планування сезону стало простішим.',
      highlight: 'Покращене планування сезону',
    },
    {
      name: 'Василь Мельник',
      role: 'Власник агробізнесу, Львів',
      location: 'Україна',
      avatar: '👨‍💼',
      rating: 5,
      quote:
        'Генетичні алгоритми для довгострокових прогнозів допомогли мені краще розподілити ресурси на рік. Дані доступні миттєво через CDN.',
      highlight: 'Стратегічне планування',
    },
    {
      name: 'Світлана Дяченко',
      role: 'Фермерка, Полтавська область',
      location: 'Україна',
      avatar: '👩‍🌾',
      rating: 5,
      quote:
        'Нечітка логіка та експертні системи дозволяють швидко реагувати на зміни погоди та шкідників. Інтерфейс дуже зручний!',
      highlight: 'Оперативні рішення',
    },
    {
      name: 'Петро Сидоренко',
      role: 'Агроном, Херсон',
      location: 'Україна',
      avatar: '👨‍🌾',
      rating: 5,
      quote:
        'Аналітика та звіти допомагають контролювати всі поля. Дані швидко завантажуються завдяки CDN.',
      highlight: 'Швидкий доступ до даних',
    },
    {
      name: 'Ольга Кравченко',
      role: 'Власниця ферми, Черкаси',
      location: 'Україна',
      avatar: '👩‍💼',
      rating: 5,
      quote:
        'SmartAgroPlan — це сучасний інструмент для українських фермерів. Прогнозування, аналітика та мобільний доступ — все, що потрібно!',
      highlight: 'Рекомендую колегам',
    },
  ];

  return (
    <SectionContainer className="bg-white dark:bg-gray-900">
      <SectionHeader
        title="Довіряють фермери"
        highlight="та агробізнеси"
        description="Приєднуйтесь до тисяч фермерів, які вже змінили своє господарство з SmartAgroPlan."
        className="text-gray-900 dark:text-white"
      />

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            role={testimonial.role}
            location={testimonial.location}
            avatar={testimonial.avatar}
            rating={testimonial.rating}
            quote={testimonial.quote}
            highlight={testimonial.highlight}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        ))}
      </div>
    </SectionContainer>
  );
}
