import React from "react";
import { PlayerProfile } from "../types";

const PlayerCard = ({ name, playerProfile }: { name: string, playerProfile: PlayerProfile}) => {
  return (
    <div>
      {name} <br />
      Games: Togglable list
      <ul>
        <li> Winrate: {Math.round(playerProfile.winRatio * 100)} % </li>
        <li> Total Games: {playerProfile.totalMatches} </li>
        <li> Most Picked: {playerProfile.mostPicked} </li>
      </ul>
    </div>
  );
};

export default PlayerCard;