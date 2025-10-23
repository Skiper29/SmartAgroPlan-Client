import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { extractErrorMessage } from '@/types/api-error.type';
import { useNavigate } from 'react-router-dom';

interface ErrorDisplayProps {
  error: unknown;
  title?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
  homeRoute?: string;
}

/**
 * Universal error display component for consistent error handling across the app
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title = 'Помилка завантаження даних',
  onRetry,
  showHomeButton = false,
  homeRoute = '/',
}) => {
  const navigate = useNavigate();
  const errorMessage = extractErrorMessage(error);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="text-center space-y-4 max-w-2xl px-4">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          {title}
        </h2>
        <p className="text-red-500 dark:text-red-300 whitespace-pre-line">
          {errorMessage}
        </p>
        <div className="flex gap-3 justify-center mt-6">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Спробувати знову
            </Button>
          )}
          {showHomeButton && (
            <Button onClick={() => navigate(homeRoute)} variant="default">
              <Home className="h-4 w-4 mr-2" />
              На головну
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;

