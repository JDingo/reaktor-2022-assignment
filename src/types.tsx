export interface GameObject {
  gameId: string, 
  playerA: { name: string, played: string }, 
  playerB: { name: string, played: string }, 
  t: number, 
  type: string
}

export interface FetchObject {
  cursor: string,
  data: Array<GameObject>
}

export interface PlayerProfile {
  games: Array<GameObject>,
  wins: number,
  losses: number,
  winRatio: number,
  totalMatches: number
  pickRate: PickRate
  mostPicked: string
}

interface PickRate {
  rock: number,
  paper: number,
  scissors: number
}

export interface RunningGame {
  gameId: string, 
  playerA: { name: string }, 
  playerB: { name: string }, 
  t: number, 
  type: string
}

export const isGameResult = (object: any): object is GameObject => {
  return object.type === "GAME_RESULT";
};

export const isGameBegin = (object: any): object is RunningGame => {
  return object.type === "GAME_BEGIN";
};