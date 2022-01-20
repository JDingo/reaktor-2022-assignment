import React, { useState, useEffect } from 'react';
import { GameObject, isGameBegin, isGameResult, PlayerProfile, RunningGame } from './types';
import { fetchMatchHistory } from './services/history';
import { combinePlayerMaps, handleHistoryPage } from './services/players';
import PlayerList from './components/PlayerList';
import RunningGamesList from './components/RunningGamesList';

const App = () => {
  const [gameList, setGameList] = useState<Array<GameObject>>([]);
  const [cursor, setCursor] = useState<string>('/rps/history');
  const [pageNumber, setpageNumber] = useState<number>(0);

  const [playerMap, setPlayerMap] = useState<Map<string, PlayerProfile>>(new Map());
  const [runningGames, setRunningGames] = useState<Array<RunningGame>>([]);

  useEffect(() => {
    fetchMatchHistory(cursor).then(fetchObject => {
      const { cursor, data } = fetchObject;
      setGameList(gameList.concat(data));
      setpageNumber(pageNumber + 1);
      // console.log(pageNumber, cursor, gameList);

      setPlayerMap(combinePlayerMaps(playerMap, handleHistoryPage(data)));
      // console.log(playerMap);

      if (cursor && pageNumber < 10) { // Capped for testing
        setCursor(cursor);
      }
    }).catch(() => {
      console.log("Error fetching data");
    });
  }, [cursor]);

  useEffect(() => {
    const socket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

    socket.onopen = () => {
      console.log("Connected to WebSocket!");
    };
    
    socket.onmessage = (event: MessageEvent<string>) => {
      const receivedData = event.data;
      let parsedData = receivedData.replaceAll("\\", "");
      parsedData = parsedData.substring(1, parsedData.length - 1);
      const game: unknown = JSON.parse(parsedData);
      
      console.log(isGameBegin(game));
      if (isGameBegin(game)) {
        console.log("New Game!");
        setRunningGames(runningGames => [...runningGames, game]);
      }

      if (isGameResult(game)) {
        console.log("Päättyi");
      }
    };
  }, []);

  return (
    <div className='container'>
      <div>
        <h1>Rock-Paper-Scissors Application</h1>
      </div>
      <PlayerList playerMap={playerMap} />
      <RunningGamesList runningGames={runningGames} />
    </div>
  );
};

export default App;