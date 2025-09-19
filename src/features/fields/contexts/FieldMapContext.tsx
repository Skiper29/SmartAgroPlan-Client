import React, { createContext, useContext, useCallback, useState } from 'react';
import type Field from '@/models/field/field.model';

interface FieldMapContextType {
  navigateToField: (field: Field) => void;
  targetField: Field | null;
  clearTarget: () => void;
}

const FieldMapContext = createContext<FieldMapContextType | null>(null);

interface FieldMapProviderProps {
  children: React.ReactNode;
}

export const FieldMapProvider: React.FC<FieldMapProviderProps> = ({
  children,
}) => {
  const [targetField, setTargetField] = useState<Field | null>(null);

  const navigateToField = useCallback((field: Field) => {
    setTargetField(field);
  }, []);

  const clearTarget = useCallback(() => {
    setTargetField(null);
  }, []);

  return (
    <FieldMapContext.Provider
      value={{ navigateToField, targetField, clearTarget }}
    >
      {children}
    </FieldMapContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFieldMap = () => {
  const context = useContext(FieldMapContext);
  if (!context) {
    throw new Error('useFieldMap must be used within a FieldMapProvider');
  }
  return context;
};
