import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import type Field from '@/models/field/field.model';
import FieldPolygon from './FieldPolygon';
import FieldLegend from './FieldLegend';
import SearchControl from './SearchControl';
import BasemapSwitcher, { type BasemapDef } from './BasemapSwitcher';
import type { GeoJsonObject } from 'geojson';
import type * as GeoJSONNS from 'geojson';
import L from 'leaflet';

// Leaflet core + plugin styles
import 'leaflet/dist/leaflet.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';

// Leaflet plugins (attach controls to L namespace)
import 'leaflet-minimap';

// Props contract
interface FieldMapProps {
  fields: Field[];
  className?: string;
}

// Basemap configs
type BasemapId = 'osm' | 'esri_sat' | 'carto_dark' | 'opentopo';
interface BasemapConfig {
  id: BasemapId;
  url: string;
  attribution: string;
  subdomains?: string[] | string;
  labelsUrl?: string; // optional labels overlay for basemap
}

const BASEMAP_CONFIGS: Record<BasemapId, BasemapConfig> = {
  osm: {
    id: 'osm',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: ['a', 'b', 'c'],
  },
  esri_sat: {
    id: 'esri_sat',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      '&copy; Esri &mdash; Esri, HERE, Garmin, OpenStreetMap contributors',
    labelsUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    subdomains: [], // <-- Fix: always provide subdomains
  },
  carto_dark: {
    id: 'carto_dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: ['a', 'b', 'c', 'd'],
  },
  opentopo: {
    id: 'opentopo',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://srtm.csi.cgiar.org/">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
    subdomains: ['a', 'b', 'c'],
  },
};

const BASEMAP_SWITCHER_ITEMS: BasemapDef[] = [
  {
    id: 'osm',
    name: 'OSM Standard',
    previewUrl: 'https://tile.openstreetmap.org/5/17/10.png',
  },
  {
    id: 'esri_sat',
    name: 'Esri Satellite',
    previewUrl:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/5/10/17',
    hasLabels: true,
  },
  {
    id: 'carto_dark',
    name: 'CARTO Dark',
    previewUrl: 'https://a.basemaps.cartocdn.com/dark_all/5/17/10.png',
  },
  {
    id: 'opentopo',
    name: 'OpenTopoMap',
    previewUrl: 'https://a.tile.opentopomap.org/5/17/10.png',
  },
];

// Helper: build combined bounds from all field GeoJSONs
const FitBoundsToFields: React.FC<{
  features: GeoJsonObject[];
  onFit?: () => void;
}> = ({ features, onFit }) => {
  const map = useMap();

  useEffect(() => {
    if (!features || features.length === 0) return;
    const finish = () => onFit && onFit();
    try {
      const group = L.featureGroup(
        features.map((f) => L.geoJSON(f as unknown as GeoJSONNS.GeoJsonObject)),
      );
      const bounds = group.getBounds();
      if (bounds.isValid()) {
        map.once('moveend', finish);
        map.fitBounds(bounds.pad(0.1), { animate: true });
      }
    } catch {
      map.setView([48.3794, 31.1656], 6);
      finish();
    }
    return () => {
      map.off('moveend', finish);
    };
  }, [features, map, onFit]);

  return null;
};

// MiniMap control using leaflet-minimap plugin
const MiniMapControl: React.FC<{
  ready: boolean;
  tileUrl: string;
  subdomains?: string[] | string;
}> = ({ ready, tileUrl, subdomains }) => {
  const map = useMap();

  useEffect(() => {
    if (!ready) return;
    const miniLayer = L.tileLayer(tileUrl, {
      attribution: '',
      minZoom: 0,
      maxZoom: 19,
      subdomains,
    });

    // @ts-expect-error: plugin augments L with Control.MiniMap
    const miniMap = new L.Control.MiniMap(miniLayer, {
      toggleDisplay: true,
      minimized: false,
      position: 'bottomright',
      aimingRectOptions: { color: '#22c55e', weight: 2 },
      shadowRectOptions: { color: '#000000', weight: 1, opacity: 0.2 },
      zoomLevelOffset: -5,
    });

    map.addControl(miniMap);

    return () => {
      map.removeControl(miniMap);
      if (map.hasLayer(miniLayer)) {
        map.removeLayer(miniLayer);
      }
    };
  }, [map, ready, tileUrl, subdomains]);

  return null;
};

const FieldMap: React.FC<FieldMapProps> = ({ fields, className }) => {
  const [fitDone, setFitDone] = useState(false);
  const [selectedBasemap, setSelectedBasemap] = useState<BasemapId>('osm');
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Parse GeoJSON strings once
  const features = useMemo<GeoJsonObject[]>(() => {
    return (fields ?? [])
      .map((f) => {
        try {
          return JSON.parse(f.boundary) as GeoJsonObject;
        } catch {
          return null;
        }
      })
      .filter((g): g is GeoJsonObject => !!g);
  }, [fields]);

  const baseCfg = BASEMAP_CONFIGS[selectedBasemap];
  const canToggleLabels = Boolean(baseCfg.labelsUrl);

  // Default view (Ukraine center)
  const defaultCenter: [number, number] = [48.3794, 31.1656];

  return (
    <div className={`relative w-full h-[600px] ${className ?? ''}`.trim()}>
      <MapContainer
        center={defaultCenter}
        zoom={6}
        zoomControl={false}
        className="w-full h-full rounded-lg overflow-hidden shadow"
        preferCanvas
      >
        {/* Base Tiles */}
        <TileLayer
          key={baseCfg.id}
          url={baseCfg.url}
          attribution={baseCfg.attribution}
          subdomains={baseCfg.subdomains}
        />

        {/* Optional Labels Overlay for Satellite */}
        {canToggleLabels && showLabels && baseCfg.labelsUrl ? (
          <TileLayer
            key={`${baseCfg.id}-labels`}
            url={baseCfg.labelsUrl}
            attribution={baseCfg.attribution}
          />
        ) : null}
        {/* Explicit Zoom Control */}
        <ZoomControl position="topleft" />

        {/* Controls */}
        <MiniMapControl
          ready={fitDone}
          tileUrl={baseCfg.url}
          subdomains={baseCfg.subdomains}
        />
        <SearchControl />

        {/* Fit view to fields */}
        <FitBoundsToFields features={features} onFit={() => setFitDone(true)} />

        {/* Field Polygons */}
        {fields?.map((field) => {
          const geo: GeoJsonObject | null = (() => {
            try {
              return JSON.parse(field.boundary) as GeoJsonObject;
            } catch {
              return null;
            }
          })();
          if (!geo) return null;

          return (
            <FieldPolygon
              key={field.id}
              id={field.id}
              name={field.name}
              fieldType={field.fieldType}
              boundaryGeoJson={geo}
            />
          );
        })}
      </MapContainer>

      {/* Basemap Switcher overlay */}
      <BasemapSwitcher
        basemaps={BASEMAP_SWITCHER_ITEMS}
        selectedId={selectedBasemap}
        onSelect={(id) => setSelectedBasemap(id as BasemapId)}
        showLabels={showLabels}
        canToggleLabels={canToggleLabels}
        onToggleLabels={setShowLabels}
      />

      {/* Legend overlay */}
      <FieldLegend />
    </div>
  );
};

export default FieldMap;
