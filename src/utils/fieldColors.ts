import { FieldType } from '@/models/field/field.model';
import { CropType } from '@/models/crop/crop.model';

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

// Crop type color mapping with distinctive colors for each crop
// Colors chosen to be visually distinct and representative of each crop
const cropColorMap: Record<CropType, FieldColorConfig> = {
  [CropType.Wheat]: {
    color: '#CC9900', // Rich golden border
    fillColor: '#FFD700', // Gold
    fillOpacity: 0.6,
  },
  [CropType.Barley]: {
    color: '#A67C52', // Caramel border
    fillColor: '#DEB887', // Burlywood
    fillOpacity: 0.6,
  },
  [CropType.Oats]: {
    color: '#8B7355', // Warm brown border
    fillColor: '#F5DEB3', // Wheat
    fillOpacity: 0.6,
  },
  [CropType.Rye]: {
    color: '#6B4423', // Dark brown border
    fillColor: '#BC8F8F', // Rosy brown
    fillOpacity: 0.6,
  },
  [CropType.Corn]: {
    color: '#E6A800', // Deep yellow border
    fillColor: '#FFCC33', // Bright corn yellow
    fillOpacity: 0.6,
  },
  [CropType.Sunflower]: {
    color: '#FF6600', // Vibrant orange border
    fillColor: '#FFB347', // Bright orange
    fillOpacity: 0.6,
  },
  [CropType.Soy]: {
    color: '#2E5C2E', // Deep green border
    fillColor: '#7FBF7F', // Medium green
    fillOpacity: 0.6,
  },
  [CropType.Rapeseed]: {
    color: '#CCB800', // Dark yellow border
    fillColor: '#FFFF66', // Bright yellow
    fillOpacity: 0.6,
  },
  [CropType.SugarBeet]: {
    color: '#8B1A5F', // Deep magenta border
    fillColor: '#E066A0', // Pink magenta
    fillOpacity: 0.6,
  },
  [CropType.Potato]: {
    color: '#8B5A2B', // Dark sienna border
    fillColor: '#D2691E', // Chocolate
    fillOpacity: 0.6,
  },
  [CropType.Tomato]: {
    color: '#CC0000', // Deep red border
    fillColor: '#FF4444', // Bright red
    fillOpacity: 0.6,
  },
  [CropType.Another]: {
    color: '#5A5A5A', // Dark gray border
    fillColor: '#B0B0B0', // Light gray
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
 * Get color configuration for a specific crop type
 * @param cropType - The type of crop
 * @returns Color configuration object
 */
export const getCropColor = (cropType: CropType): FieldColorConfig => {
  return cropColorMap[cropType] || cropColorMap[CropType.Another];
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

/**
 * Get all crop types with their colors for legend display
 * @returns Array of crop types with their color configurations
 */
export const getAllCropColors = (): Array<{
  type: CropType;
  config: FieldColorConfig;
}> => {
  return Object.entries(cropColorMap).map(([type, config]) => ({
    type: type as CropType,
    config,
  }));
};
