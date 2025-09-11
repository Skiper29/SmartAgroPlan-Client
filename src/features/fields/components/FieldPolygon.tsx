import { GeoJSON, Popup } from 'react-leaflet';
import { FieldType, FieldTypeLabels } from '@/models/field/field.model';
import { getFieldColor } from '@/utils/fieldColors';
import type { GeoJsonObject } from 'geojson';

interface FieldPolygonProps {
  id: number;
  name: string;
  fieldType: FieldType;
  boundaryGeoJson: GeoJsonObject;
}

const FieldPolygon = ({
  id,
  name,
  fieldType,
  boundaryGeoJson,
}: FieldPolygonProps) => {
  const colorConfig = getFieldColor(fieldType);

  const style = {
    color: colorConfig.color,
    fillColor: colorConfig.fillColor,
    fillOpacity: colorConfig.fillOpacity,
    weight: 2,
    opacity: 0.8,
  };

  return (
    <GeoJSON
      key={id}
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
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border"
                style={{
                  backgroundColor: colorConfig.fillColor,
                  borderColor: colorConfig.color,
                }}
              />
              <span className="text-sm">{FieldTypeLabels[fieldType]}</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Field ID: {id}
            </div>
          </div>
        </div>
      </Popup>
    </GeoJSON>
  );
};

export default FieldPolygon;
