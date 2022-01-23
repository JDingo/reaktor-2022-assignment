import React, { useState, useEffect } from 'react';
import { GameObject, isGameBegin, isGameResult, PlayerProfile, RunningGame } from './types';
import { fetchMatchPage } from './services/history';
import { combinePlayerMaps, handleMatchPage } from './services/players';

import PlayerList from './components/PlayerList';
import RunningGamesList from './components/RunningGamesList';
import SearchBar from './components/SearchBar';
import FinishedGamesList from './components/FinishedGamesList';

const App = () => {
  const [cursor, setCursor] = useState<string>(`${process.env.API}/rps/history'`);

  const [playerMap, setPlayerMap] = useState<Map<string, PlayerProfile>>(new Map());
  const [runningGames, setRunningGames] = useState<Array<RunningGame>>([]);
  const [finishedGames, setFinishedGames] = useState<Array<GameObject>>([]);
  const [wsData, setWsData] = useState<unknown>({});

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchMatchPage(cursor).then(fetchObject => {
      const { cursor, data } = fetchObject;

      setPlayerMap(combinePlayerMaps(playerMap, handleMatchPage(data)));

      playerMap.forEach((value) => {
        const duplicateId: Array<string> = [];
        value.games.forEach(game => {
          if (game.gameId in duplicateId) {
            console.log("Dup");
            console.log(duplicateId.length, value.games.length);
          } else {
            duplicateId.push(game.gameId);
          }
        });
      });

      if (cursor) {
        setCursor(process.env.API + cursor);
      }
    }).catch(() => {
      console.log("Error fetching data!");
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
      setWsData(game);
    };
  }, []);

  useEffect(() => {
    if (isGameBegin(wsData)) {
      setRunningGames(runningGames => [...runningGames, wsData]);
    }

    else if (isGameResult(wsData)) {
      setRunningGames(runningGames => runningGames.filter(runningGame => runningGame.gameId !== wsData.gameId));
      setFinishedGames(finishedGames => [...finishedGames, wsData]);
      setPlayerMap(playerMap => combinePlayerMaps(playerMap, handleMatchPage([wsData])));
    }
  }, [wsData]);

  return (
    <div className='container'>
      <div>
        <h1>Rock-Paper-Scissors Application</h1>
      </div>
      <div>
        <h2>Player Info</h2>
        <SearchBar setSearch={setSearch} />
        <PlayerList playerMap={playerMap} search={search} />
      </div>
      <div>
        <h2>Ongoing Games</h2>
        <RunningGamesList runningGames={runningGames} />
      </div>
      <div>
        <h2>Finished Games</h2>
        <FinishedGamesList finishedGames={finishedGames} />
      </div>
    </div>
  );
};

export default App;