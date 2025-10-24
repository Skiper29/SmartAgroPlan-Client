import React, { useMemo } from 'react';
import UniversalSelect from './UniversalSelect';
import { useSoils } from '@/features/fields/hooks/soils.hooks';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model';
import { extractErrorMessage } from '@/types/api-error.type.ts';

interface SoilSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const SoilSelect: React.FC<SoilSelectProps> = ({
  value,
  onValueChange,
  error,
  placeholder = 'Оберіть тип ґрунту',
}) => {
  const { data: soils = [], isLoading, isError, error: apiError } = useSoils();

  const selectOptions = useMemo(() => {
    return soils.map((soil) => {
      // Handle integer enum values from backend
      const soilType =
        typeof soil.type === 'number'
          ? (Object.values(SoilType)[soil.type] as SoilType)
          : soil.type;

      return {
        id: soil.id,
        name: SoilTypeLabels[soilType] || 'Невідомий тип ґрунту',
        type: soilType,
        typeLabel: SoilTypeLabels[soilType],
      };
    });
  }, [soils]);

  return (
    <UniversalSelect
      value={value}
      onValueChange={onValueChange}
      options={selectOptions}
      isLoading={isLoading}
      isError={isError}
      error={error || extractErrorMessage(apiError)}
      placeholder={placeholder}
      loadingText="Завантаження типів ґрунту..."
      errorText="Помилка завантаження типів ґрунту"
      displayField="name"
      valueField="id"
      enableSearch
      emptyStateText="Немає доступних типів ґрунту"
    />
  );
};

export default SoilSelect;
