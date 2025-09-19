import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

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
  const initialLoadedRef = useRef(false);

  useEffect(() => {
    const drawnItems = drawnItemsRef.current;
    if (!map.hasLayer(drawnItems)) {
      map.addLayer(drawnItems);
    }

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
      const feature = e.layer.toGeoJSON();
      onBoundaryChange(JSON.stringify(feature.geometry));
    };

    const handleDrawEdited = (e: L.DrawEvents.Edited) => {
      e.layers.eachLayer((layer) => {
        const feature = (layer as L.Polygon).toGeoJSON();
        onBoundaryChange(JSON.stringify(feature.geometry));
      });
    };

    const handleDrawDeleted = () => {
      if (drawnItems.getLayers().length === 0) {
        onBoundaryChange('');
      } else {
        const first = drawnItems.getLayers()[0] as L.Polygon;
        onBoundaryChange(JSON.stringify(first.toGeoJSON().geometry));
      }
    };

    map.on(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
    map.on(L.Draw.Event.EDITED, handleDrawEdited as L.LeafletEventHandlerFn);
    map.on(L.Draw.Event.DELETED, handleDrawDeleted as L.LeafletEventHandlerFn);

    return () => {
      map.removeControl(drawControl);
      map.off(
        L.Draw.Event.CREATED,
        handleDrawCreated as L.LeafletEventHandlerFn,
      );
      map.off(L.Draw.Event.EDITED, handleDrawEdited as L.LeafletEventHandlerFn);
      map.off(
        L.Draw.Event.DELETED,
        handleDrawDeleted as L.LeafletEventHandlerFn,
      );
      if (map.hasLayer(drawnItems)) {
        map.removeLayer(drawnItems);
      }
    };
  }, [map, onBoundaryChange]);

  useEffect(() => {
    if (!initialBoundary || initialLoadedRef.current) return;

    try {
      const parsed = JSON.parse(initialBoundary);
      // створюємо тимчасовий geoJSON layer щоб правильно отримати внутрішні шари
      const tmp = L.geoJSON(parsed, {
        style: {
          color: '#2563eb',
          fillColor: '#3b82f6',
          fillOpacity: 0.3,
          weight: 3,
        },
      });

      // додати **внутрішні** шари в drawnItems (щоб редагування працювало)
      drawnItemsRef.current.clearLayers();
      tmp.getLayers().forEach((l) => {
        drawnItemsRef.current.addLayer(l);
      });

      // підлаштувати bounds по першому шару
      const first = drawnItemsRef.current.getLayers()[0] as L.Polygon;
      if (first && typeof first.getBounds === 'function') {
        map.fitBounds(first.getBounds());
      }

      initialLoadedRef.current = true;
    } catch (err) {
      console.error('DrawControls: failed to parse initialBoundary', err);
    }
  }, [initialBoundary, map]);

  return null;
};

export default DrawControls;
