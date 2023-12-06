// Import React/Redux
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getQuestArray } from '../../redux/questSlice';
import { RootState } from '../../redux/store';
import { useRouter } from 'next/router';

// Styles
import 'leaflet/dist/leaflet.css';
import styles from './MapComponent.module.css';

// Types
import L from 'leaflet';
import QuestType, { Objectif, Position, MapProperties } from '../../type/QuestType';

const colorPicker = (index: number): string | undefined => {
  switch (index) {
    case 0:
      return 'red';
    case 1:
      return 'purple';
    case 2:
      return 'cyan';
    case 3:
      return 'green';
    case 4:
      return 'blue';
    case 5:
      return 'lime';
    case 6:
      return 'yellow';
    case 7:
      return 'pink';
    case 8:
      return 'grey';
    case 9:
      return 'black';
  }
};

export default function MapComponent() {
  const router = useRouter();

  const mainQuests = useSelector((state: RootState) => getQuestArray(state, 'main'));
  const temporaryQuests = useSelector((state: RootState) => getQuestArray(state, 'temporary'));

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const circlesRef = useRef<L.Circle[]>([]);
  const polygonsRef = useRef<L.Polygon[]>([]);

  const mapPropreties: MapProperties = {
    customs: { lat: 2142, lng: 4097, defaultZoom: -1.7 },
    factory: { lat: 4320, lng: 7680, defaultZoom: -3 },
    woods: { lat: 6843, lng: 6994, defaultZoom: -3 },
    reserve: { lat: 2785, lng: 4701, defaultZoom: -2 },
    lighthouse: { lat: 3892, lng: 2242, defaultZoom: -2 },
    shoreline: { lat: 1980, lng: 3820, defaultZoom: -1.6 },
    lab: { lat: 1980, lng: 3820, defaultZoom: -1.6 },
    interchange: { lat: 2385, lng: 4227, defaultZoom: -1.7 },
    streets: { lat: 0, lng: 0, defaultZoom: 0 }, // TODO dl la map du wiki une fois à jour.
  };

  useEffect(() => {
    const onMapClick = (e: any) => {
      console.log('You clicked the map at ' + e.latlng);
    };

    if (
      !mapRef.current &&
      mapContainerRef.current &&
      router?.query?.slug &&
      typeof router.query.slug === 'string'
    ) {
      const slugProperties = mapPropreties[router.query.slug];

      // Initialisation de la carte
      mapRef.current = L.map(mapContainerRef.current, {
        crs: L.CRS.Simple, // Utilisez le système de coordonnées simple de Leaflet (pour mettre les dimensions en pixel au lieu de latitude longitude)
        minZoom: slugProperties.defaultZoom,
        maxZoom: 2,
      }).setView([slugProperties.lat / 2, slugProperties.lng / 2], slugProperties.defaultZoom); // Latitude, Longitude, Default Zoom
      // ajout de la couche d'image personnalisée avec le parseUrl string
      const imageUrl = `assets/${router.query.slug}.webp`;
      const imageBounds: L.LatLngBoundsExpression = [
        [0, 0],
        [slugProperties.lat, slugProperties.lng],
      ];
      L.imageOverlay(imageUrl, imageBounds, {
        interactive: true,
        attribution: '©Naitchi',
      }).addTo(mapRef.current);
    }
    mapRef.current?.on('click', onMapClick);

    return () => {
      // Destruction de la carte avant de détruire le composant
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const clearPreviousElements = () => {
      markersRef.current.forEach((marker) => marker.remove());
      circlesRef.current.forEach((circle) => circle.remove());
      polygonsRef.current.forEach((polygon) => polygon.remove());

      markersRef.current = [];
      circlesRef.current = [];
      polygonsRef.current = [];
    };

    const createQuestItem = (objectif: Objectif, color: string | undefined) => {
      return L.divIcon({
        html: `<i class="fas ${objectif.action} fa-2x" style="color:${color}; 
      ${!objectif.show ? 'display:none;' : ''}"></i>`,
        iconSize: [24, 24], // Taille de l'icône en pixels
        iconAnchor: [12, 12], // Point d'ancrage de l'icône au milieu
        className: styles.questItem,
      });
    };

    const handleObjectifPosition = (
      objectif: Objectif,
      color: string | undefined,
      position: Position,
    ) => {
      const questItem = createQuestItem(objectif, color);
      const marker = L.marker([position.x, position.y], { icon: questItem }).addTo(mapRef.current!);
      markersRef.current.push(marker);
      if (position.radius && objectif.show) {
        const circle = L.circle([position.x, position.y], {
          color: color,
          fillColor: color,
          fillOpacity: 0.05,
          radius: position.radius,
        }).addTo(mapRef.current!);
        circlesRef.current.push(circle);
      }
      if (objectif.polygon && objectif.show) {
        const leafletPolygonCoords: L.LatLngTuple[] = objectif.polygon.map((pt) => [pt.x, pt.y]);
        const polygon = L.polygon(leafletPolygonCoords, {
          color: color,
          fillColor: color,
          fillOpacity: 0.25,
        }).addTo(mapRef.current!);
        polygonsRef.current.push(polygon);
      }
    };

    const showMarker = (array: QuestType[] | null) => {
      clearPreviousElements();

      array?.forEach((item: QuestType, index: number) => {
        const color = colorPicker(index);

        item.objectifs.forEach((objectif: Objectif) => {
          objectif.position?.forEach((position: Position) => {
            if (objectif.map === undefined || objectif.map === router.query.slug) {
              handleObjectifPosition(objectif, color, position);
            }
          });
        });
      });
    };

    // Affichage des objectifs
    // showMarker(mainQuests);
    showMarker(temporaryQuests);
    // Fonction pour trouver les coordonnées des points via un click
  }, [mainQuests, temporaryQuests]);

  return <div ref={mapContainerRef} id="map" style={{ height: '100vh', width: '100vw' }}></div>;
}
