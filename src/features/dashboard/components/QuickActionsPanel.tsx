import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MapPin, Sprout, Droplets, FlaskConical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const QuickActionsPanel: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: MapPin,
      label: 'Додати поле',
      description: 'Створити нове поле',
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:from-green-600 hover:to-green-800',
      onClick: () => navigate('/fields/new'),
    },
    {
      icon: Sprout,
      label: 'Переглянути поля',
      description: 'Всі ваші поля',
      color: 'from-emerald-500 to-emerald-700',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-800',
      onClick: () => navigate('/fields'),
    },
    {
      icon: Droplets,
      label: 'Зрошення',
      description: 'Рекомендації поливу',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800',
      onClick: () => navigate('/irrigation'),
    },
    {
      icon: FlaskConical,
      label: 'Удобрення',
      description: 'Плани підживлення',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'hover:from-purple-600 hover:to-purple-800',
      onClick: () => navigate('/fertilizer'),
    },
  ];

  return (
    <Card className="border-2 shadow-xl h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Plus className="h-6 w-6 text-green-600 dark:text-green-400" />
          Швидкі дії
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              className={cn(
                'h-auto py-6 px-6 flex flex-col items-start gap-2 bg-gradient-to-r text-white transition-all duration-300 hover:scale-105 hover:shadow-xl',
                action.color,
                action.hoverColor,
              )}
            >
              <action.icon className="h-8 w-8 mb-1" />
              <div className="text-left">
                <div className="font-bold text-lg">{action.label}</div>
                <div className="text-sm opacity-90 font-normal">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel;
