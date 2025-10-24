import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card.tsx';
import { FileText } from 'lucide-react';

interface AdditionalNotesCardProps {
  notes: string;
}

const AdditionalNotesCard: React.FC<AdditionalNotesCardProps> = ({ notes }) => {
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500 hover:scale-[1.02]">
      <CardHeader className="bg-purple-50 dark:bg-gray-800 pb-3 text-purple-700 dark:text-purple-300">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 bg-purple-500 rounded-lg">
            <FileText className="h-4 w-4 text-white" />
          </div>
          Додаткова інформація про культуру
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {notes}
        </p>
      </CardContent>
    </Card>
  );
};

export default AdditionalNotesCard;
