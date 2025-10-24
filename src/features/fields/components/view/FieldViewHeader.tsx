import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Pencil, DatabaseZap } from 'lucide-react';

interface FieldViewHeaderProps {
  fieldId: number;
  fieldName: string;
  onAddCondition: () => void;
}

const FieldViewHeader: React.FC<FieldViewHeaderProps> = ({
  fieldId,
  fieldName,
  onAddCondition,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-100000 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
        Перегляд поля "{fieldName}"
      </h1>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={onAddCondition}
          className="flex items-center gap-2 hover:bg-green-50 dark:hover:bg-gray-800"
        >
          <DatabaseZap className="h-4 w-4" />
          Додати стан
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate(`/fields/edit/${fieldId}`)}
          className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-gray-800"
        >
          <Pencil className="h-4 w-4" />
          Редагувати
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/fields')}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          <ChevronLeft className="h-5 w-5" />
          Назад
        </Button>
      </div>
    </header>
  );
};

export default FieldViewHeader;
