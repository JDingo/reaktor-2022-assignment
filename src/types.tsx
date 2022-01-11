export interface GameObject {
  gameid: string, 
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