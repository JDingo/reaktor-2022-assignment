import React from "react";
import { GameObject } from "../types";
import { Table } from 'react-bootstrap';
import './PlayerList.css';
import GameCard from "./GameCard";

const FinishedGamesList = ({ finishedGames }: { finishedGames: Array<GameObject>}) => {
  return (
    <div className="vertical_scroll">
      <Table striped>
        <tbody>
          {finishedGames.map(game => (
            <tr key={`${game.gameId}/concludedgametr`}>
              <td>
                <GameCard game={game} />
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default FinishedGamesList;