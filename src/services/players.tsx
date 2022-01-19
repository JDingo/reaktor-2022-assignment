import { GameObject, PlayerProfile } from "../types";

const createPlayerProfile = (): PlayerProfile => {
  return {
    games: [],
    wins: 0,
    losses: 0,
    winRatio: 0,
    totalMatches: 0,
    pickRate: {
      rock: 0,
      paper: 0,
      scissors: 0,
    },
    mostPicked: ''
  }
}

export const handleHistoryPage = (data: Array<GameObject>): Map<string, PlayerProfile> => {
  const playerMap: Map<string, PlayerProfile> = new Map();

  data.forEach(game => {
    const gamePlayerA = game.playerA
    const gamePlayerB = game.playerB

    let mapPlayerA = playerMap.get(game.playerA.name)
    let mapPlayerB = playerMap.get(game.playerB.name)
    if (!mapPlayerA) {
      mapPlayerA = createPlayerProfile()
    }

    if (!mapPlayerB) {
      mapPlayerB = createPlayerProfile()
    }

    const playerAPick = gamePlayerA.played.toLowerCase()
    const playerBPick = gamePlayerB.played.toLowerCase()

    if (playerAPick == 'scissors' || playerAPick == 'paper' || playerAPick == 'rock') {
      mapPlayerA.pickRate[playerAPick] += 1
    }
    if (playerBPick == 'scissors' || playerBPick == 'paper' || playerBPick == 'rock') {
      mapPlayerB.pickRate[playerBPick] += 1
    }

    if (!(gamePlayerA == gamePlayerB)) {
      if (gamePlayerA.played[0] == "S" && gamePlayerB.played[0] == "P" || gamePlayerA.played[0] == "P" && gamePlayerB.played[0] == "R" || gamePlayerA.played[0] == "R" && gamePlayerB.played[0] == "S" ) {
        mapPlayerA.wins++
        mapPlayerB.losses++
      } else {
        mapPlayerA.losses++
        mapPlayerB.wins++
      }
    }

    const playerList = [mapPlayerA, mapPlayerB]
    playerList.forEach(player => {
      player.games.push(game)
      player.winRatio = player.wins / player.losses
      player.totalMatches = player.games.length

      let mostPicked = 0
      let pick: keyof typeof player.pickRate
      for (pick in player.pickRate) {
        if (player.pickRate[pick] > mostPicked) {
          mostPicked = player.pickRate[pick]
          player.mostPicked = pick
        }
      }
    })

    playerMap.set(gamePlayerA.name, mapPlayerA)
    playerMap.set(gamePlayerB.name, mapPlayerB)
  })

  return playerMap
}

export const combinePlayerMaps = (destinationMap: Map<string, PlayerProfile>, addedMap: Map<string, PlayerProfile>): Map<string, PlayerProfile> => {
  addedMap.forEach((value, key) => {
    if (destinationMap.has(key)) {
      const player: PlayerProfile = destinationMap.get(key) as PlayerProfile

      player.games = [...player.games, ...value.games]
      player.wins = player.wins + value.wins
      player.losses = player.losses + value.losses

      player.winRatio = player.wins / player.losses
      player.totalMatches = player.games.length

      let mostPicked = 0
      let pick: keyof typeof player.pickRate
      for (pick in player.pickRate) {
        if (player.pickRate[pick] > mostPicked) {
          mostPicked = player.pickRate[pick]
          player.mostPicked = pick
        }
      }
    }

    else {
      destinationMap.set(key, value)
    }
  })

  return destinationMap
}

export default { createPlayerProfile, handleHistoryPage, combinePlayerMaps }