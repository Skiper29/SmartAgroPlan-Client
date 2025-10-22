import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FieldFormSubmitButtonProps {
  isSubmitting: boolean;
  isEdit?: boolean;
}

const FieldFormSubmitButton: React.FC<FieldFormSubmitButtonProps> = ({
  isSubmitting,
  isEdit = false,
}) => {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Збереження...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Plus />
          {isEdit ? 'Зберегти зміни' : 'Додати поле'}
        </div>
      )}
    </Button>
  );
};

export default FieldFormSubmitButton;
