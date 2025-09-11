import {
  Check,
  BarChart3,
  Droplets,
  Shield,
  Calendar,
  FileText,
  Brain,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionContainer, SectionHeader } from '@/components';

export default function SolutionOverview() {
  const features = [
    {
      icon: Brain,
      text: 'Короткострокове прогнозування (експоненціальне згладжування + погодні API)',
    },
    {
      icon: Droplets,
      text: 'Планування води та добрив на основі погодних даних',
    },
    {
      icon: Shield,
      text: 'Моніторинг ризиків у реальному часі (нечітка логіка + експертні системи)',
    },
    {
      icon: BarChart3,
      text: 'Аналітика та звіти',
    },
    {
      icon: Calendar,
      text: 'Автоматизований агрокалендар',
    },
    {
      icon: FileText,
      text: 'Експорт інсайтів та рекомендацій',
    },
  ];

  return (
    <SectionContainer
      background="gradient"
      className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800"
    >
      <SectionHeader
        title="Усе-в-одному: сучасна платформа"
        highlight="для розумного землеробства"
        description="Прогнозування врожайності здійснюється за допомогою різних алгоритмів: короткострокові прогнози — експоненціальне згладжування + погодні API, середньострокові — ARIMA та диференціальні рівняння, довгострокові — генетичні алгоритми та стохастичні моделі, а для оперативних рішень — нечітка логіка та експертні системи. Дані розповсюджуються через CDN для швидкого доступу."
        className="text-gray-900 dark:text-white"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Features List */}
        <div className="space-y-8">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                  <span className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                    {feature.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white dark:text-green-200 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Переглянути всі можливості
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Mock Dashboard Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                <span className="font-bold text-gray-900 dark:text-white">
                  Дашборд SmartAgroPlan
                </span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    87%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Прогноз врожаю
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    23°C
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Температура
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-900 h-24 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-gray-400 dark:text-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-full w-3/4"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
