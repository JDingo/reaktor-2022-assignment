export interface GameObject {
  gameid: string, playerA: { name: string, played: string }, playerB: { name: string, played: string }, t: number, type: string
}

export interface FetchObject {
  cursor: string,
  data: Array<GameObject>
}

export interface PlayerProfile {
  games: GameObject[],
  winRatio: number,
  totalMatches: number
  pickRate: { rock: number, paper: number, scissors: number }
  mostPicked: string
}