import { FieldType } from '@/models/field/field.model';

export interface FieldColorConfig {
  color: string;
  fillColor: string;
  fillOpacity: number;
}

// Field type color mapping with good contrast for both light and dark themes
const fieldColorMap: Record<FieldType, FieldColorConfig> = {
  [FieldType.Arable]: {
    color: '#8B5A00', // Brown border
    fillColor: '#D2691E', // Chocolate
    fillOpacity: 0.6,
  },
  [FieldType.Pasture]: {
    color: '#228B22', // Forest green border
    fillColor: '#32CD32', // Lime green
    fillOpacity: 0.6,
  },
  [FieldType.Orchard]: {
    color: '#8B4513', // Saddle brown border
    fillColor: '#FFB347', // Peach
    fillOpacity: 0.6,
  },
  [FieldType.Vineyard]: {
    color: '#800080', // Purple border
    fillColor: '#DDA0DD', // Plum
    fillOpacity: 0.6,
  },
  [FieldType.Greenhouse]: {
    color: '#006400', // Dark green border
    fillColor: '#90EE90', // Light green
    fillOpacity: 0.6,
  },
  [FieldType.Fallow]: {
    color: '#8B7355', // Dark khaki border
    fillColor: '#F5DEB3', // Wheat
    fillOpacity: 0.6,
  },
};

/**
 * Get color configuration for a specific field type
 * @param fieldType - The type of field
 * @returns Color configuration object
 */
export const getFieldColor = (fieldType: FieldType): FieldColorConfig => {
  return fieldColorMap[fieldType] || fieldColorMap[FieldType.Arable];
};

/**
 * Get all field types with their colors for legend display
 * @returns Array of field types with their color configurations
 */
export const getAllFieldColors = (): Array<{
  type: FieldType;
  config: FieldColorConfig;
}> => {
  return Object.entries(fieldColorMap).map(([type, config]) => ({
    type: type as FieldType,
    config,
  }));
};
