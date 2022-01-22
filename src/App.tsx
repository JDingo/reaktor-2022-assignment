import React, { useState, useEffect } from 'react';
import { GameObject, isGameBegin, isGameResult, PlayerProfile, RunningGame } from './types';
import { fetchMatchHistory } from './services/history';
import { combinePlayerMaps, handleHistoryPage } from './services/players';
import PlayerList from './components/PlayerList';
import RunningGamesList from './components/RunningGamesList';
import SearchBar from './components/SearchBar';

const App = () => {
  const [gameList, setGameList] = useState<Array<GameObject>>([]);
  const [cursor, setCursor] = useState<string>('/rps/history');
  const [pageNumber, setpageNumber] = useState<number>(0);

  const [playerMap, setPlayerMap] = useState<Map<string, PlayerProfile>>(new Map());
  const [runningGames, setRunningGames] = useState<Array<RunningGame>>([]);
  const [latestData, setLatestData] = useState<unknown>({});

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchMatchHistory(cursor).then(fetchObject => {
      const { cursor, data } = fetchObject;
      setGameList(gameList.concat(data));
      setpageNumber(pageNumber + 1);

      setPlayerMap(combinePlayerMaps(playerMap, handleHistoryPage(data)));

      if (cursor && pageNumber < 50) { // Capped for testing
        setCursor(cursor);
      }
    }).catch(() => {
      console.log("Error fetching data!");
    });
  }, [cursor]);

  useEffect(() => {
    console.log(search);
    const socket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

    socket.onopen = () => {
      console.log("Connected to WebSocket!");
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      const receivedData = event.data;
      let parsedData = receivedData.replaceAll("\\", "");
      parsedData = parsedData.substring(1, parsedData.length - 1);
      const game: unknown = JSON.parse(parsedData);
      setLatestData(game);
    };
  }, []);

  useEffect(() => {
    if (isGameBegin(latestData)) {
      setRunningGames(runningGames => [...runningGames, latestData]);
    }

    else if (isGameResult(latestData)) {
      setRunningGames(runningGames => runningGames.filter(runningGame => runningGame.gameId !== latestData.gameId));
      setPlayerMap(playerMap => combinePlayerMaps(playerMap, handleHistoryPage([latestData])));
    }
  }, [latestData]);

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
    </div>
  );
};

export default App;