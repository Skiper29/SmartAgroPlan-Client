import { Check, Star, Zap } from 'lucide-react';

export default function PricingPreview() {
  const plans = [
    {
      name: 'Безкоштовно',
      price: '$0',
      period: '/місяць',
      description: 'Ідеально для малих господарств, які починають',
      features: [
        'До 2 полів',
        'Базові погодні дані',
        'Прості короткострокові прогнози (експоненціальне згладжування)',
        'Доступ з мобільного додатку',
        'Підтримка на email',
      ],
      limitations: ['Обмежена історія даних', 'Тільки базові звіти'],
      buttonText: 'Спробувати безкоштовно',
      buttonClass: 'border-2 border-green-600 text-green-700 hover:bg-green-50',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/місяць',
      description: 'Розширені можливості для професійних фермерів',
      features: [
        'Необмежена кількість полів',
        'Короткострокові прогнози (експоненціальне згладжування)',
        'Середньострокові прогнози (ARIMA, диференціальні рівняння)',
        'Довгострокове планування (генетичні алгоритми, стохастичні моделі)',
        'Оперативні рішення (нечітка логіка, експертні системи)',
        'Оптимізація ресурсів',
        'Детальна аналітика',
        'Пріоритетна підтримка',
        'Доступ до API',
        'Індивідуальні звіти',
        'Швидкий доступ до даних через CDN',
      ],
      limitations: [],
      buttonText: 'Почати тест-драйв',
      buttonClass: 'bg-green-600 hover:bg-green-700 text-white',
      popular: true,
      savings: 'Найпопулярніший',
    },
    {
      name: 'Enterprise',
      price: 'Індивідуально',
      period: 'тариф',
      description: 'Індивідуальні рішення для великих господарств',
      features: [
        'Все з Pro',
        'Управління кількома господарствами',
        'Командна робота',
        'Розширені інтеграції',
        'Індивідуальні алгоритми прогнозування',
        'Виділена підтримка',
        'Встановлення на сервері',
        'Гарантія SLA',
        'CDN для корпоративних даних',
      ],
      limitations: [],
      buttonText: 'Звʼязатися з відділом продажу',
      buttonClass: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-50',
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Прості та прозорі
            <span className="block text-green-600 dark:text-green-400">
              тарифи
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Оберіть тариф, який підходить вашому господарству. Почніть
            безкоштовно та переходьте на розширені можливості у міру зростання.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            <button className="px-4 py-2 rounded-md bg-green-600 text-white font-medium">
              Місячна оплата
            </button>
            <button className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 font-medium">
              Річна (економія 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? 'ring-2 ring-green-500 dark:ring-green-400 transform scale-105'
                  : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 dark:bg-green-400 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {plan.savings}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">
                        {feature}
                      </span>
                    </div>
                  ))}

                  {/* Limitations */}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div
                      key={limitIndex}
                      className="flex items-center opacity-60"
                    >
                      <div className="w-5 h-5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1 h-4 bg-gray-400 dark:bg-gray-600"></div>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${plan.buttonClass}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center space-y-8">
          {/* Money Back Guarantee */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              30 днів гарантії повернення коштів
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Не підійшло? Повернемо кошти протягом 30 днів без зайвих питань.
            </p>
          </div>

          {/* FAQ Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Потрібна допомога з вибором?
              </h4>
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                Порівняти тарифи →
              </button>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Є питання?
              </h4>
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                Переглянути FAQ →
              </button>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Потрібен Enterprise?
              </h4>
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                Звʼязатися з продажем →
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Довіряють фермери по всьому світу
            </p>
            <div className="flex justify-center items-center space-x-8 text-gray-400 dark:text-gray-500">
              <span>🔒 SSL-захист</span>
              <span>💳 PCI-сумісність</span>
              <span>🌍 Глобальна підтримка</span>
              <span>📞 24/7 допомога</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
