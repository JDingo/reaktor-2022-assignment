import React from "react";
import { PlayerProfile } from "../types";
import PlayerCard from "./PlayerCard";

const PlayerList = ({ playerMap }: { playerMap: Map<string, PlayerProfile> }) => {
  const playerArray = Array.from(playerMap);

  return (
    <div>
      {playerArray.map(player => (
        <PlayerCard key={player[0]} name={player[0]} playerProfile={player[1]} />
      ))}
    </div>
  );
};

export default PlayerList;