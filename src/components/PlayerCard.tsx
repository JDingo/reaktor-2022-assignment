import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { GameObject, PlayerProfile } from "../types";
import GameCard from "./GameCard";

const PlayerCard = ({ name, playerProfile }: { name: string, playerProfile: PlayerProfile }) => {
  const [showGames, setShowGames] = useState<boolean>(false);

  const handleButton = () => {
    setShowGames(!showGames);
  };

  return (
    <div>
      {name} <br />
      <ul>
        <li> Win rate: {Math.round(playerProfile.winRatio * 100)} % </li>
        <li> Total Games: {playerProfile.totalMatches} </li>
        <li> Most Picked: {playerProfile.mostPicked} </li>
      </ul>
      Games: <Button variant="primary" size="sm" onClick={handleButton}>{showGames ? 'Hide' : 'Show'}</Button>
      <GameList games={showGames ? playerProfile.games : []} />
    </div>
  );
};

const GameList = ({ games }: { games: Array<GameObject> }) => {
  if (games.length === 0) {
    return null;
  }

  return (
    <div className="vertical_scroll">
      <Table striped>
        <tbody>
          {games.map(game => (
            <tr key={game.gameId}>
              <td>
                <GameCard key={game.gameId} game={game} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PlayerCard;