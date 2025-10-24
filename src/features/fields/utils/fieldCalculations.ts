import type DayMonth from '@/models/calendar/day-month.model.ts';
import type Field from '@/models/field/field.model.ts';
import { CropType, CropTypeLabels } from '@/models/crop/crop.model.ts';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model.ts';
import { area } from '@turf/area';

export const calculateFieldArea = (field: Field) => {
  if (!field?.boundaryGeoJson) return null;

  try {
    const geoJson = JSON.parse(field.boundaryGeoJson);

    if (geoJson.type === 'Polygon' || geoJson.type === 'MultiPolygon') {
      const areaInSquareMeters = area(geoJson);

      const hectares = areaInSquareMeters / 10000;

      return hectares.toFixed(2);
    }
  } catch (e) {
    console.error('Error calculating area with Turf:', e);
  }

  return null;
};

export const getSoilTypeLabel = (field: Field) => {
  if (!field?.soil?.type) return '—';

  const soilType =
    typeof field.soil.type === 'number'
      ? (Object.values(SoilType)[field.soil.type] as SoilType)
      : field.soil.type;

  return SoilTypeLabels[soilType] || '—';
};

export const getCropInfo = (field: Field) => {
  if (!field?.currentCrop) return { name: '—', type: '', typeLabel: '' };

  const cropType =
    typeof field.currentCrop.cropType === 'number'
      ? (Object.values(CropType)[field.currentCrop.cropType] as CropType)
      : field.currentCrop.cropType;

  const typeLabel = CropTypeLabels[cropType] || '';

  return {
    name: field.currentCrop.name,
    type: cropType,
    typeLabel,
  };
};

export const calculateExpectedHarvestDate = (field: Field) => {
  if (!field?.sowingDate || !field?.currentCrop?.growingDuration) return null;
  const sowingDate = new Date(field.sowingDate);
  const harvestDate = new Date(sowingDate);
  harvestDate.setDate(
    harvestDate.getDate() + field.currentCrop.growingDuration,
  );
  return harvestDate;
};

export const formatDayMonth = (dayMonth: DayMonth | undefined): string => {
  if (!dayMonth) return '—';
  return `${dayMonth.day}.${String(dayMonth.month).padStart(2, '0')}`;
};
