import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { CropTypeLabels } from '@/models/crop/crop.model';

interface CropsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  sortBy: 'name' | 'duration' | 'yield';
  onSortChange: (value: 'name' | 'duration' | 'yield') => void;
}

const CropsFilters: React.FC<CropsFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <Card className="border-2 shadow-lg bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Пошук культур..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 h-10"
            />
          </div>

          {/* Filter by Type */}
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Тип культури" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі типи</SelectItem>
              {Object.entries(CropTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={sortBy}
            onValueChange={(value) =>
              onSortChange(value as 'name' | 'duration' | 'yield')
            }
          >
            <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Сортування" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">За назвою</SelectItem>
              <SelectItem value="duration">За тривалістю</SelectItem>
              <SelectItem value="yield">За врожайністю</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropsFilters;
