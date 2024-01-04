export default interface QuestType {
  id: number;
  name: string;
  givenBy: traders;
  requiredForKappa: boolean;
  maps: maps[] | maps;
  show?: boolean;
  objectifs: Objectif[];
  unlockBy: number[];
  levelNeeded: number;
  factionNeeded?: faction;
}

export interface Objectif {
  id: number;
  description: string;
  maps?: maps;
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

export type maps =
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
  | 'faHandLizard' // PickUp
  | 'faPersonHiking' // Scouting
  | 'faBox' // Delivary
  | 'faKey' // Key
  | 'faSkull' // Kill
  | 'faMobileScreen'; // Marker

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

export type faction = 'BEAR' | 'USEC';

export interface Info {
  faction: faction;
  level: number;
  multiplayer: boolean; // see if need to add matching level/faction to search input. default: fasle.
}
