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

interface SelectOption {
  id: number;
  name: string;
  type?: string;
  typeLabel?: string;
  additionalInfo?: string;
  [key: string]: any;
}

interface UniversalSelectProps {
  value?: string | number;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  isLoading: boolean;
  isError: boolean;
  error?: string;
  placeholder?: string;
  loadingText?: string;
  errorText?: string;
  displayField?: string;
  valueField?: string;
  enableSearch?: boolean;
  enableTypeFilter?: boolean;
  typeFilterOptions?: { value: string; label: string }[];
  showBadges?: boolean;
  showAdditionalInfo?: boolean;
  emptyStateText?: string;
}

const UniversalSelect: React.FC<UniversalSelectProps> = ({
  value,
  onValueChange,
  options = [],
  isLoading,
  isError,
  error,
  placeholder = 'Оберіть опцію',
  loadingText = 'Завантаження...',
  errorText = 'Помилка завантаження',
  displayField = 'name',
  valueField = 'id',
  enableSearch = false,
  enableTypeFilter = false,
  typeFilterOptions = [],
  showBadges = false,
  showAdditionalInfo = false,
  emptyStateText = 'Немає доступних опцій',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Filter options based on search term and type
  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const matchesSearch = enableSearch
        ? option[displayField]?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesType =
        enableTypeFilter && selectedType !== 'all'
          ? option.type === selectedType
          : true;
      return matchesSearch && matchesType;
    });
  }, [
    options,
    searchTerm,
    selectedType,
    displayField,
    enableSearch,
    enableTypeFilter,
  ]);

  const selectedOption = options.find(
    (option) => option[valueField].toString() === value?.toString(),
  );

  const handleSelect = (option: SelectOption) => {
    onValueChange(option[valueField].toString());
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
  };

  if (isLoading) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className="w-full justify-between"
      >
        <span className="text-muted-foreground">{loadingText}</span>
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
          <span className="text-red-500">{errorText}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  if (filteredOptions.length === 0 && !searchTerm && selectedType === 'all') {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className="w-full justify-between border-yellow-500"
      >
        <span className="text-yellow-600">{emptyStateText}</span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  // Simple select without search/filter
  if (!enableSearch && !enableTypeFilter) {
    return (
      <Select value={value?.toString()} onValueChange={onValueChange}>
        <SelectTrigger className={error ? 'border-red-500' : ''}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option[valueField]}
              value={option[valueField].toString()}
            >
              <div className="flex items-center gap-2">
                {showBadges && option.typeLabel && (
                  <Badge variant="outline" className="text-xs">
                    {option.typeLabel}
                  </Badge>
                )}
                <span>{option[displayField]}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Advanced select with search/filter
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
          {selectedOption ? (
            <>
              {showBadges && selectedOption.typeLabel && (
                <Badge variant="secondary" className="text-xs">
                  {selectedOption.typeLabel}
                </Badge>
              )}
              <span className="truncate">{selectedOption[displayField]}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          {/* Search and filter section */}
          {(enableSearch || enableTypeFilter) && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 space-y-3">
              {/* Search input */}
              {enableSearch && (
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Пошук..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              )}

              {/* Type filter */}
              {enableTypeFilter && typeFilterOptions.length > 0 && (
                <div className="flex items-center gap-2">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Всі типи</SelectItem>
                      {typeFilterOptions.map((filterOption) => (
                        <SelectItem
                          key={filterOption.value}
                          value={filterOption.value}
                        >
                          {filterOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {(searchTerm || selectedType !== 'all') && (
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
              )}
            </div>
          )}

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Опції не знайдено
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option[valueField]}
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    value?.toString() === option[valueField].toString()
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : ''
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <Check
                    className={`h-4 w-4 ${
                      value?.toString() === option[valueField].toString()
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {showBadges && option.typeLabel && (
                        <Badge variant="outline" className="text-xs">
                          {option.typeLabel}
                        </Badge>
                      )}
                      <span className="font-medium">
                        {option[displayField]}
                      </span>
                    </div>
                    {showAdditionalInfo && option.additionalInfo && (
                      <div className="text-xs text-muted-foreground">
                        {option.additionalInfo}
                      </div>
                    )}
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

export default UniversalSelect;
