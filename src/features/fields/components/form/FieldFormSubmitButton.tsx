import React from 'react';
import { Button } from '@/components/ui/button';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isEdit
                  ? 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
                  : 'M12 4v16m8-8H4'
              }
            />
          </svg>
          {isEdit ? 'Зберегти зміни' : 'Додати поле'}
        </div>
      )}
    </Button>
  );
};

export default FieldFormSubmitButton;
