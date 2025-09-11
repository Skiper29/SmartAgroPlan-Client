import { Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function DemoPreview() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const screenshots = [
    {
      title: 'Огляд дашборду',
      description:
        'Оперативний огляд господарства з прогнозами на основі експоненціального згладжування, ARIMA та генетичних алгоритмів. Дані швидко доступні через CDN.',
      image: 'dashboard',
      features: [
        'Короткострокові прогнози (експоненціальне згладжування)',
        'Середньострокові прогнози (ARIMA, диференціальні рівняння)',
        'Довгострокове планування (генетичні алгоритми, стохастичні моделі)',
        'Моніторинг ресурсів',
        'Система сповіщень',
        'Швидкий доступ до даних через CDN',
      ],
    },
    {
      title: 'Управління полями',
      description:
        'Керуйте полями, аналізуйте історію та отримуйте рекомендації на основі погодних API та експертних систем.',
      image: 'fields',
      features: [
        'Картування полів',
        'Агрокалендар',
        'Стадії росту',
        'Історичні дані',
        'Рекомендації (нечітка логіка, експертні системи)',
      ],
    },
    {
      title: 'Аналітика та звіти',
      description:
        'Комплексна аналітика для контролю ефективності, порівняння врожайності та оптимізації витрат. Дані розповсюджуються через CDN.',
      image: 'analytics',
      features: [
        'Показники ефективності',
        'Аналіз витрат',
        'Порівняння врожайності',
        'Експорт звітів',
        'Швидкий доступ до аналітики через CDN',
      ],
    },
    {
      title: 'Мобільний додаток',
      description:
        'Доступ до всіх функцій платформи з мобільного. Оперативні рішення на основі нечіткої логіки та експертних систем.',
      image: 'mobile',
      features: [
        'Офлайн-доступ',
        'Фото-логування',
        'Швидкі сповіщення',
        'GPS-трекінг',
        'Оперативні рекомендації (нечітка логіка, експертні системи)',
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length,
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Дивіться SmartAgroPlan
            <span className="block text-green-600 dark:text-green-400">
              у дії
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Ознайомтеся з інтерфейсом та можливостями платформи у інтерактивних
            демо.
          </p>

          {/* Play Demo Button */}
          <button className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Play className="mr-3 h-6 w-6" />
            Переглянути демо
          </button>
        </div>

        {/* Screenshot Carousel */}
        <div className="relative">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Screenshot */}
              <div className="relative">
                <div className="bg-gray-900 dark:bg-gray-700 rounded-xl p-4 shadow-lg">
                  {/* Browser Bar */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="flex-1 bg-gray-700 dark:bg-gray-900 rounded px-3 py-1 text-xs text-gray-300 ml-4">
                      smartagroplan.com/{screenshots[currentSlide].image}
                    </div>
                  </div>

                  {/* Mock Screenshot Content */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 min-h-[300px]">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {screenshots[currentSlide].title}
                        </h4>
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                          <div className="w-full h-16 bg-green-100 dark:bg-green-900 rounded mb-2"></div>
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                          <div className="w-full h-16 bg-blue-100 dark:bg-blue-900 rounded mb-2"></div>
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>

                      {/* Chart Area */}
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                        <div className="h-32 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-900 dark:to-blue-900 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col h-full min-h-[400px]">
                {/* Title at top */}
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {screenshots[currentSlide].title}
                </h3>

                {/* Description and Features fill space */}
                <div className="flex-1 flex flex-col justify-start">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {screenshots[currentSlide].description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Ключові можливості:
                    </h4>
                    <ul className="space-y-2">
                      {screenshots[currentSlide].features.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-200">
                              {feature}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {/* Navigation always at bottom */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={prevSlide}
                      className="flex items-center space-x-2 text-gray-600 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      <span>Попередній</span>
                    </button>

                    <div className="flex space-x-2">
                      {screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentSlide
                              ? 'bg-green-500 dark:bg-green-400'
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextSlide}
                      className="flex items-center space-x-2 text-gray-600 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-300"
                    >
                      <span>Наступний</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Хочете побачити більше? Замовте персоналізовану демо-презентацію.
          </p>
          <button className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300">
            Замовити демо
          </button>
        </div>
      </div>
    </section>
  );
}
