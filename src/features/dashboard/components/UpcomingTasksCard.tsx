import React, { useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import { useBatchIrrigationRecommendations } from '@/features/irrigation/hooks/irrigation.hooks';
import { IrrigationAction } from '@/features/irrigation/utils/irrigationUtils';
import { differenceInDays } from 'date-fns';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'irrigation' | 'fertilizer' | 'harvest' | 'other';
}

const UpcomingTasksCard: React.FC = () => {
  const { data: fields = [] } = useFields();
  const { mutate: getRecommendations, data: irrigationRecommendations = [] } =
    useBatchIrrigationRecommendations();

  useEffect(() => {
    if (fields.length > 0) {
      const fieldIds = fields.map((f) => f.id);
      getRecommendations({ fieldIds });
    }
  }, [fields, getRecommendations]);

  const tasks: Task[] = useMemo(() => {
    const taskList: Task[] = [];

    // Add irrigation tasks from recommendations
    irrigationRecommendations.forEach((rec) => {
      if (rec.recommendedAction !== IrrigationAction.None) {
        const field = fields.find((f) => f.id === rec.fieldId);
        const daysUntil = rec.date
          ? differenceInDays(new Date(rec.date), new Date())
          : 0;

        let dueDateText = 'Сьогодні';
        if (daysUntil === 1) dueDateText = 'Завтра';
        else if (daysUntil > 1) dueDateText = `Через ${daysUntil} дні`;

        taskList.push({
          id: `irrigation-${rec.fieldId}`,
          title: `Полив поля "${field?.name || 'Невідоме'}"`,
          dueDate: dueDateText,
          priority:
            daysUntil === 0 ? 'high' : daysUntil === 1 ? 'medium' : 'low',
          type: 'irrigation',
        });
      }
    });

    return taskList.slice(0, 5); // Show only top 5 tasks
  }, [irrigationRecommendations, fields]);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return AlertTriangle;
      case 'medium':
        return Clock;
      case 'low':
        return CheckCircle;
    }
  };

  const getTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'irrigation':
        return '💧';
      case 'fertilizer':
        return '🧪';
      case 'harvest':
        return '🌾';
      default:
        return '📋';
    }
  };

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
          Заплановані завдання
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-300 dark:text-green-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Немає запланованих завдань
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => {
              const PriorityIcon = getPriorityIcon(task.priority);
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 hover:shadow-md transition-all bg-white dark:bg-gray-800/50"
                >
                  <div className="text-2xl">{getTypeIcon(task.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {task.dueDate}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      'flex items-center gap-1',
                      getPriorityColor(task.priority),
                    )}
                  >
                    <PriorityIcon className="h-3 w-3" />
                    {task.priority === 'high'
                      ? 'Високий'
                      : task.priority === 'medium'
                        ? 'Середній'
                        : 'Низький'}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasksCard;
