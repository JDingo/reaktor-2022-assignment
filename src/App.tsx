import React, { useState, useEffect } from 'react';
import { GameObject } from './types'
import fetchMatchHistory from './services/history';

const App = () => {
  const [gameList, setGameList] = useState<Array<GameObject>>([])
  const [cursor, setCursor] = useState<string>('/rps/history')
  const [pageNumber, setpageNumber] = useState<number>(0)

  useEffect(() => {
    fetchMatchHistory(cursor).then(fetchObject => {
      setGameList(gameList.concat(fetchObject.data))
      setpageNumber(pageNumber + 1)
      console.log(pageNumber, cursor, gameList)

      if (cursor && pageNumber < 50) {
        setCursor(fetchObject.cursor)
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