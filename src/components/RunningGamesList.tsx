import React from "react";
import { RunningGame } from "../types";
import { Table } from 'react-bootstrap';
import './PlayerList.css';
import RunningGameCard from "./RunningGameCard";

const RunningGamesList = ({ runningGames }: { runningGames: Array<RunningGame>}) => {
  return (
    <div className="vertical_scroll">
      <Table striped>
        <tbody>
          {runningGames.map(game => (
            <tr key={game.gameId}>
              <td>
                <RunningGameCard playerA={game.playerA.name} playerB={game.playerB.name} />
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default RunningGamesList;