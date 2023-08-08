export default interface QuestType {
  id: number;
  name: string;
  givenBy: traders;
  requiredForKappa: boolean;
  map: map[] | map;
  show?: boolean;
  objectifs: Objectif[];
  unlock: number[];
  unlockBy: number[];
  levelNeeded: number;
}

export interface Objectif {
  id: number;
  description: string;
  position?: Position[];
  action?: action;
  show?: boolean;
  popUp?: string;
  subtask?: boolean;
}

export interface Position {
  x: number;
  y: number;
  radius?: number;
}

type map =
  | 'Customs'
  | 'Factory'
  | 'Woods'
  | 'Town'
  | 'Reserve'
  | 'Lighthouse'
  | 'Shoreline'
  | 'Terminal'
  | 'Interchange'
  | 'Lab'
  | 'Streets'
  | 'Suburbs';

type action =
  | 'fa-hand-lizard' // PickUp
  | 'fa-person-hiking' // Scouting
  | 'fa-box' // Delivary
  | 'fa-key' // Key
  | 'fa-skull' // Kill
  | 'fa-mobile-screen fa-rotate-180'; // Marker

type traders =
  | 'Prapor'
  | 'Therapist'
  | 'Skier'
  | 'Peacekeeper'
  | 'Mechanic'
  | 'Ragman'
  | 'Jaeger'
  | 'Fence'
  | 'Lightkeeper';
