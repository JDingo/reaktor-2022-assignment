import React, { useState, useEffect } from 'react';
import { GameObject, PlayerProfile, RunningGame } from './types';
import { fetchMatchHistory } from './services/history';
import { combinePlayerMaps, handleHistoryPage } from './services/players';
import PlayerList from './components/PlayerList';

const isReceivedGame = (object: any): object is GameObject | RunningGame => {
  return "gameid" in object && "playerA" in object && "playerB" in object && "t" in object && "type" in object;
};

const App = () => {
  const [gameList, setGameList] = useState<Array<GameObject>>([]);
  const [cursor, setCursor] = useState<string>('/rps/history');
  const [pageNumber, setpageNumber] = useState<number>(0);

  const [playerMap, setPlayerMap] = useState<Map<string, PlayerProfile>>(new Map());

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
      console.log("Connected WebSocket!");
    };
    
    socket.onmessage = (event: MessageEvent<string>) => {
      const receivedData = event.data;
      let parsedData = receivedData.replaceAll("\\", "");
      parsedData = parsedData.substring(1, parsedData.length - 1);
      console.log(JSON.parse(parsedData));
      
      if (isReceivedGame(JSON.parse(parsedData))) {
        console.log(JSON.parse(parsedData));
      }
    };
  }, []);

  return (
    <div>
      <div>
        <h1>Rock-Paper-Scissors Application</h1>
      </div>
      <PlayerList playerMap={playerMap} />
    </div>
  );
};

export default App;