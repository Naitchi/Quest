// Import React/Redux
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getQuestArray } from '../../redux/questSlice';
import { RootState } from '../../redux/store';

// Styles
import 'leaflet/dist/leaflet.css';
import styles from './MapComponent.module.css';

// Types
import L from 'leaflet';
import QuestType, { Objectif, Position } from '../../type/QuestType';

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
  // TODO à Delete puis remplacer partout où il est appelé par mainQuest
  const allQuests = useSelector((state: RootState) => getQuestArray(state, 'all'));

  const mainQuests = useSelector((state: RootState) => getQuestArray(state, 'main'));
  const temporaryQuests = useSelector((state: RootState) => getQuestArray(state, 'temporary'));

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // TODO faire en fonction de la slug et charger les différentes missions et la map en fonction.
  // Récupérer la slug.
  // Récupérer la map correspondante.
  // Récupérer la taille de l'image. via :
  // const img = new Image();
  // img.onload = function () {
  //   alert(this.width + 'x' + this.height);
  // };
  // img.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
  // Afficher la map.
  // Récupérer les Quêtes correspondante parmis le quêtes disponible.
  // Récupérer les Quêtes Multi-Map parmis le quêtes disponible.
  // Afficher les markers.

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      console.log(mapRef.current);

      // Initialisation de la carte
      mapRef.current = L.map(mapContainerRef.current, {
        crs: L.CRS.Simple, // Utilisez le système de coordonnées simple de Leaflet (pour mettre les dimensions en pixel au lieu de latitude longitude)
        minZoom: -1.7, // Zoom minimum
        maxZoom: 2, // Zoom maximum
      }).setView([1121, 2054], -1.7); // Latitude, Longitude, Default Zoom
      // TODO ajouter de la couche d'image personnalisée avec le parseUrl string
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
    const onMapClick = (e: any) => {
      console.log('You clicked the map at ' + e.latlng);
    };

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
    const showMarker = (array: QuestType[] | null) => {
      // Supprimez les anciens marqueurs de la carte
      markersRef.current.forEach((marker) => marker.remove());
      // Réinitialisez la référence des marqueurs
      markersRef.current = [];
      array?.forEach((item: QuestType, index: number) => {
        const color = colorPicker(index);
        item.objectifs.forEach((objectif: Objectif) => {
          objectif.position?.forEach((position: Position) => {
            const questItem = L.divIcon({
              html: `<i class="fas ${objectif.action} fa-rotate-270 fa-2x" style="color:${color}; 
              ${objectif.show ? '' : 'display:none;'}"></i>`,
              iconSize: [32, 32], // Taille de l'icône en pixels
              iconAnchor: [16, 16], // Point d'ancrage de l'icône au milieu
              className: styles.questItem,
            });
            const marker = L.marker([position.x, position.y], { icon: questItem }).addTo(
              mapRef.current!,
            );
            if (position.radius)
              L.circle([position.x, position.y], {
                color: color,
                fillColor: color,
                fillOpacity: 0.25,
                radius: position.radius,
              }).addTo(mapRef.current!);
            markersRef.current.push(marker);
          });
        });
      });
    };

    // Affichage des objectifs
    showMarker(allQuests);
    showMarker(temporaryQuests);
    // Fonction pour trouver les coordonnées des points via un click
  }, [allQuests, temporaryQuests]);

  return <div ref={mapContainerRef} id="map" style={{ height: '100vh', width: '100vw' }}></div>;
}
