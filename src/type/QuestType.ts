export default interface QuestType {
  id: number;
  name: string;
  givenBy: traders;
  requiredForKappa: boolean;
  map: map[] | map;
  show?: boolean;
  objectifs: Objectif[];
  unlockBy: number[];
  levelNeeded: number;
  factionNeeded?: faction;
}

export interface Objectif {
  id: number;
  description: string;
  map?: map;
  position?: Position[];
  polygon?: Position[];
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

export type map =
  | 'customs'
  | 'factory'
  | 'woods'
  | 'reserve'
  | 'lighthouse'
  | 'shoreline'
  | 'interchange'
  | 'streets'
  | 'lab';
// | 'town'
// | 'terminal'
// | 'suburbs'

type action =
  | 'fa-hand-lizard fa-rotate-270' // PickUp
  | 'fa-person-hiking' // Scouting
  | 'fa-box' // Delivary
  | 'fa-key' // Key
  | 'fa-skull' // Kill
  | 'fa-mobile-screen MS2000'; // Marker

type traders =
  | 'prapor'
  | 'therapist'
  | 'skier'
  | 'peacekeeper'
  | 'mechanic'
  | 'ragman'
  | 'jaeger'
  | 'fence'
  | 'lightkeeper';

export type MapProperties = {
  [key: string]: {
    lat: number;
    lng: number;
    defaultZoom: number;
  };
};

type faction = 'BEAR' | 'USEC';

export interface Info {
  faction: faction;
  level: number;
}
