import React from "react";
import { PlayerProfile } from "../types";
import PlayerCard from "./PlayerCard";
import { Table } from 'react-bootstrap';
import './PlayerList.css';

const PlayerList = ({ playerMap }: { playerMap: Map<string, PlayerProfile> }) => {
  const playerArray = Array.from(playerMap);

  return (
    <div className="vertical_scroll">
      <Table striped>
        <tbody>
          {playerArray.map(player => (
            <tr key={player[0]}>
              <td>
                <PlayerCard key={player[0]} name={player[0]} playerProfile={player[1]} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PlayerList;