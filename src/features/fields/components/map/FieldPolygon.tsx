import { GeoJSON, Popup } from 'react-leaflet';
import { type FieldType, FieldTypeLabels } from '@/models/field/field.model';
import { type CropType, CropTypeLabels } from '@/models/crop/crop.model';
import { getFieldColor, getCropColor } from '@/utils/fieldColors';
import * as turf from '@turf/turf';

import { memo } from 'react';
import type { GeoJsonObject, Feature, Geometry } from 'geojson';
import { useNavigate } from 'react-router-dom';

interface FieldPolygonProps {
  id: number;
  name: string;
  fieldType: FieldType;
  boundaryGeoJson: GeoJsonObject;
  cropType?: CropType;
  colorBy: 'fieldType' | 'cropType';
}

const FieldPolygon = memo(
  ({
    id,
    name,
    fieldType,
    boundaryGeoJson,
    cropType,
    colorBy,
  }: FieldPolygonProps) => {
    const navigate = useNavigate();
    const colorConfig =
      colorBy === 'cropType' && cropType
        ? getCropColor(cropType)
        : getFieldColor(fieldType);

    const fieldTypeColor = getFieldColor(fieldType);
    const cropTypeColor = cropType ? getCropColor(cropType) : null;

    // Calculate area in hectares using turf.js
    const areaInHectares = (() => {
      try {
        const areaInSquareMeters = turf.area(
          boundaryGeoJson as Feature | Geometry,
        );
        return (areaInSquareMeters / 10000).toFixed(2); // Convert to hectares
      } catch (error) {
        console.error('Error calculating area:', error);
        return 'N/A';
      }
    })();

    const style = {
      color: colorConfig.color,
      fillColor: colorConfig.fillColor,
      fillOpacity: colorConfig.fillOpacity,
      weight: 2,
      opacity: 0.8,
    };

    const componentKey = `${id}-${colorBy}-${JSON.stringify(boundaryGeoJson)}`;

    const handleViewField = () => {
      navigate(`/fields/view/${id}`);
    };

    return (
      <GeoJSON
        key={componentKey}
        data={boundaryGeoJson}
        pathOptions={style}
        eventHandlers={{
          mouseover: (e) => {
            const layer = e.target;
            layer.setStyle({
              weight: 3,
              opacity: 1,
              fillOpacity: 0.8,
            });
          },
          mouseout: (e) => {
            const layer = e.target;
            layer.setStyle(style);
          },
        }}
      >
        <Popup className="dark:bg-gray-800 dark:text-white">
          <div className="p-2 min-w-[200px]">
            <h3
              className="font-semibold text-lg mb-3 flex-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={handleViewField}
            >
              {name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded border"
                  style={{
                    backgroundColor: fieldTypeColor.fillColor,
                    borderColor: fieldTypeColor.color,
                  }}
                />
                <span className="text-sm font-medium">
                  Тип поля: {FieldTypeLabels[fieldType]}
                </span>
              </div>
              {cropType && cropTypeColor && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{
                      backgroundColor: cropTypeColor.fillColor,
                      borderColor: cropTypeColor.color,
                    }}
                  />
                  <span className="text-sm font-medium">
                    Культура: {CropTypeLabels[cropType]}
                  </span>
                </div>
              )}
              <div className="pt-1 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Площа:</span> {areaInHectares}{' '}
                  га
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ID: {id}
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </GeoJSON>
    );
  },
  (prev, next) =>
    JSON.stringify(prev.boundaryGeoJson) ===
      JSON.stringify(next.boundaryGeoJson) &&
    prev.colorBy === next.colorBy &&
    prev.cropType === next.cropType,
);

export default FieldPolygon;
