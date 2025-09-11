import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet-geosearch/dist/geosearch.css';

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const divIcon = L.divIcon({
      className: 'leaflet-geosearch-marker',
      html: '<div style="width:12px;height:12px;border-radius:9999px;background:#22c55e;border:2px solid #fff;box-shadow:0 0 6px rgba(0,0,0,.5)"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    const searchControl = new (GeoSearchControl as unknown as new (
      options: unknown,
    ) => L.Control)({
      provider: provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      marker: {
        icon: divIcon,
        draggable: false,
      },
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Search for location...',
      keepResult: false,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export default SearchControl;
