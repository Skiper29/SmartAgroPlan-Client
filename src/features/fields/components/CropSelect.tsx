import React, { useState, useMemo } from 'react';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { Crop } from '@/models/crop/crop.model';
import { CropType, CropTypeLabels } from '@/models/crop/crop.model';
import { useCrops } from '@/features/crops/hooks/crop.hooks';

interface CropSelectProps {
  value?: number;
  onValueChange: (cropId: number | undefined) => void;
  error?: string;
  allowClear?: boolean;
}

const CropSelect: React.FC<CropSelectProps> = ({
  value,
  onValueChange,
  error,
  allowClear = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropType, setSelectedCropType] = useState<CropType | 'all'>(
    'all',
  );

  const { data: crops = [], isLoading, isError, error: apiError } = useCrops();

  // Convert integer enum values from backend to string enum values
  const processedCrops = useMemo(() => {
    return crops.map((crop) => ({
      ...crop,
      cropType:
        typeof crop.cropType === 'number'
          ? (Object.values(CropType)[crop.cropType] as CropType)
          : crop.cropType,
    }));
  }, [crops]);

  // Filter crops based on search term and crop type
  const filteredCrops = useMemo(() => {
    return processedCrops.filter((crop) => {
      const matchesSearch = crop.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedCropType === 'all' || crop.cropType === selectedCropType;
      return matchesSearch && matchesType;
    });
  }, [processedCrops, searchTerm, selectedCropType]);

  const selectedCrop = processedCrops.find((crop) => crop.id === value);

  const handleSelect = (crop: Crop) => {
    onValueChange(crop.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange(undefined);
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCropType('all');
  };

  if (isLoading) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className="w-full justify-between"
      >
        <span className="text-muted-foreground">Завантаження культур...</span>
        <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </Button>
    );
  }

  if (isError) {
    return (
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          disabled
          className="w-full justify-between border-red-500"
        >
          <span className="text-red-500">Помилка завантаження культур</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {apiError && <p className="text-sm text-red-500">{apiError.message}</p>}
      </div>
    );
  }

  if (filteredCrops.length === 0 && !searchTerm && selectedCropType === 'all') {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className="w-full justify-between border-yellow-500"
      >
        <span className="text-yellow-600">Немає доступних культур</span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className={`w-full justify-between ${error ? 'border-red-500' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedCrop ? (
            <>
              <Badge variant="secondary" className="text-xs">
                {CropTypeLabels[selectedCrop.cropType]}
              </Badge>
              <span className="truncate">{selectedCrop.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">Оберіть культуру</span>
          )}
        </div>
        <div className="flex items-center gap-1 ml-2">
          {allowClear && selectedCrop && (
            <X
              className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100 transition-opacity"
              onClick={handleClear}
            />
          )}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          {/* Search and filter section */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 space-y-3">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Пошук культури..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            {/* Crop type filter */}
            <div className="flex items-center gap-2">
              <Select
                value={selectedCropType}
                onValueChange={(value) =>
                  setSelectedCropType(value as CropType | 'all')
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
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

              {(searchTerm || selectedCropType !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="px-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Crops list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCrops.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Культури не знайдено
              </div>
            ) : (
              filteredCrops.map((crop) => (
                <div
                  key={crop.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    value === crop.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleSelect(crop)}
                >
                  <Check
                    className={`h-4 w-4 ${
                      value === crop.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {CropTypeLabels[crop.cropType]}
                      </Badge>
                      <span className="font-medium">{crop.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Тривалість: {crop.growingDuration} днів • Урожайність:{' '}
                      {crop.harvestYield} т/га
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CropSelect;
