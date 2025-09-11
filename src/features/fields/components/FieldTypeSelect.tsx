import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldType, FieldTypeLabels } from '@/models/field/field.model';

interface FieldTypeSelectProps {
  value: FieldType | undefined;
  onValueChange: (value: FieldType) => void;
  disabled?: boolean;
}

const FieldTypeSelect: React.FC<FieldTypeSelectProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Оберіть тип поля" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(FieldTypeLabels).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FieldTypeSelect;
