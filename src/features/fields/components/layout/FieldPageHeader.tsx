import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface FieldPageHeaderProps {
  title: string;
}

const FieldPageHeader: React.FC<FieldPageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
        {title}
      </h1>
      <Button
        variant="outline"
        size="lg"
        onClick={() => navigate('/fields')}
        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад
      </Button>
    </header>
  );
};

export default FieldPageHeader;
