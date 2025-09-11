import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface DrawControlsProps {
  onBoundaryChange: (geoJson: string) => void;
  initialBoundary?: string;
}

const DrawControls: React.FC<DrawControlsProps> = ({
  onBoundaryChange,
  initialBoundary,
}) => {
  const map = useMap();
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    const drawnItems = drawnItemsRef.current;
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: false,
          drawError: {
            color: '#e1e100',
            message:
              '<strong>Помилка:</strong> Межі поля не повинні перетинатися!',
          },
          shapeOptions: {
            color: '#2563eb',
            fillColor: '#3b82f6',
            fillOpacity: 0.3,
            weight: 3,
          },
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    map.addControl(drawControl);

    const handleDrawCreated = (e: L.DrawEvents.Created) => {
      drawnItems.clearLayers();
      drawnItems.addLayer(e.layer);
      onBoundaryChange(JSON.stringify(e.layer.toGeoJSON()));
    };

    map.on(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);

    // Завантаження initialBoundary
    if (initialBoundary) {
      try {
        const geoJson = JSON.parse(initialBoundary);
        const layer = L.geoJSON(geoJson, {
          style: {
            color: '#2563eb',
            fillColor: '#3b82f6',
            fillOpacity: 0.3,
            weight: 3,
          },
        });
        drawnItems.addLayer(layer);
        map.fitBounds(layer.getBounds());
      } catch (err) {
        console.error(err);
      }
    }

    return () => {
      map.removeControl(drawControl);
      map.off(
        L.Draw.Event.CREATED,
        handleDrawCreated as L.LeafletEventHandlerFn,
      );
    };
  }, [map, onBoundaryChange, initialBoundary]);

  return null;
};

export default DrawControls;
