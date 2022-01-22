import React from "react";
import { PlayerProfile } from "../types";
import PlayerCard from "./PlayerCard";
import { Table } from 'react-bootstrap';
import './PlayerList.css';

const PlayerList = ({ playerMap, search }: { playerMap: Map<string, PlayerProfile>, search: string }) => {
  const rawArray = Array.from(playerMap);
  const playerArray = search === '' ? rawArray : rawArray.filter(player => 
    player[0].substring(0, search.length).toLowerCase().includes(search.toLowerCase())
    );

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