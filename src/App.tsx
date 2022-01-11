import React, { useState, useEffect } from 'react';
import { GameObject, PlayerProfile } from './types'
import { fetchMatchHistory } from './services/history';
import { handleHistoryPage } from './services/players';

const App = () => {
  const [gameList, setGameList] = useState<Array<GameObject>>([])
  const [cursor, setCursor] = useState<string>('/rps/history')
  const [pageNumber, setpageNumber] = useState<number>(0)

  const [playerMap, setPlayerMap] = useState<Map<string, PlayerProfile>>(new Map())

  useEffect(() => {
    fetchMatchHistory(cursor).then(fetchObject => {
      const { cursor, data } = fetchObject
      setGameList(gameList.concat(data))
      setpageNumber(pageNumber + 1)
      console.log(pageNumber, cursor, gameList)

      setPlayerMap(handleHistoryPage(playerMap, data))
      console.log(playerMap)

      if (cursor && pageNumber < 20) { // Capped for testing
        setCursor(cursor)
      }
    })
  }, [cursor])

  return (
    <div>
      <h1>Initial commit</h1>
    </div>
  )
}

export default App;