import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './map.module.css';

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

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
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

    async function getJSONData() {
      try {
        const response = await fetch(`/mock/customs.json`);
        const jsonData: any[] = await response.json();
        return jsonData;
      } catch (e) {
        console.error('Erreur lors de la récupération des données des quêtes:', e);
      }
    }
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

      // Affichage des objectifs
      getJSONData().then((data) => {
        if (data !== undefined) {
          data.forEach((item: any, index: number) => {
            const color = colorPicker(index);
            console.log(item);

            item.objectifs.forEach((objectif: any) => {
              // const circle = L.circle([objectif.x, objectif.y], {
              //   color: 'red',
              //   fillColor: '#f03',
              //   fillOpacity: 0.5,
              //   radius: objectif.radius,
              // }).addTo(mapRef.current!);

              if (objectif.action === 'pickUp') {
                const questItem = L.divIcon({
                  html: `<i class="fas fa-hand-lizard fa-rotate-270 fa-2x" style="color:${color}"></i>`,
                  iconSize: [32, 32], // Taille de l'icône en pixels
                  iconAnchor: [16, 16], // Point d'ancrage de l'icône au milieu
                  className: styles.questItem,
                });
                L.marker([objectif.x, objectif.y], { icon: questItem }).addTo(mapRef.current!);
              } else if (objectif.action === 'reco') {
                const questItem = L.divIcon({
                  html: `<i class="fas fa-person-hiking fa-2x" style="color:${color}"></i>`,
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                  className: styles.questItem,
                });
                L.marker([objectif.x, objectif.y], { icon: questItem }).addTo(mapRef.current!);
              } else if (objectif.action === 'delivary') {
                console.log('test');

                const questItem = L.divIcon({
                  html: `<i class="fas fa-box fa-2x" style="color:${color}"></i>`,
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                  className: styles.questItem,
                });
                L.marker([objectif.x, objectif.y], { icon: questItem }).addTo(mapRef.current!);
              }
            });

            // Affichage des marqueurs pour réqupérer des éléments
            item.equipmentsRequired.forEach((equipment: any) => {
              if (equipment.type === 'key') {
                const questItem = L.divIcon({
                  html: `<i class="fas fa-key fa-2x" style="color:${color}"></i>`,
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                  className: styles.questItem,
                });
                L.marker([equipment.x, equipment.y], { icon: questItem }).addTo(mapRef.current!);
              }
            });
          });
        }
      });

      // Fonction pour trouver les coordonnées des points via un click
      const onMapClick = (e: any) => {
        console.log('You clicked the map at ' + e.latlng);
      };
      mapRef.current.on('click', onMapClick);
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
