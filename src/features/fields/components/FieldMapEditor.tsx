import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import DrawControls from '@/features/fields/components/DrawControls.tsx';

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface FieldMapEditorProps {
  onBoundaryChange: (geoJson: string) => void;
  initialBoundary?: string;
  center?: [number, number];
  zoom?: number;
}

const FieldMapEditor: React.FC<FieldMapEditorProps> = ({
  onBoundaryChange,
  initialBoundary,
  center = [49.0, 32.0], // Default to Ukraine coordinates
  zoom = 6,
}) => {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <MapContainer center={center} zoom={zoom} className="w-full h-full">
        {/* Esri World Imagery (satellite) */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        {/* Esri Reference Overlay (labels/toponyms) */}
        <TileLayer
          url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          attribution="Labels &copy; Esri &mdash; Source: Esri, HERE, Garmin, FAO, NOAA, USGS, EPA, NPS"
          opacity={1}
        />
        <DrawControls
          onBoundaryChange={onBoundaryChange}
          initialBoundary={initialBoundary}
        />
      </MapContainer>
    </div>
  );
};

export default FieldMapEditor;
