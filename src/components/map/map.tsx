import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {

    // TODO faire en fonction de la slug et charger les différentes missions et la map en fonction.

    if (!mapRef.current) {
      // Initialisation de la carte
      mapRef.current = L.map('map', {
        crs: L.CRS.Simple, // Utilisez le système de coordonnées simple de Leaflet (pour mettre les dimensions en pixel au lieu de latitude longitude)
        minZoom: -1.7, // Zoom minimum
        maxZoom: 2, // Zoom maximum
      }).setView([1121, 2054], -1.7); // Latitude, Longitude, Default Zoom

      // Ajout de la couche d'image personnalisée
      const imageUrl = 'assets/Customs_Map_Base.webp';
      const imageBounds: L.LatLngBoundsExpression = [
        [0, 0],
          [2142, 4097],
      ];
      L.imageOverlay(imageUrl, imageBounds, {
        interactive: true,
        attribution: '©Naitchi',
      }).addTo(mapRef.current);
    }

    return () => {
      // Destruction de la carte avant de détruire le composant
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100wh' }}></div>;
};

export default Map;
