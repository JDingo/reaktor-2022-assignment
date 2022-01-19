import React from "react";
import { PlayerProfile } from "../types";

const PlayerCard = ({ name, playerProfile }: { name: string, playerProfile: PlayerProfile}) => {
  return (
    <div>
      {name} <br />
      Games: Togglable list
      <ul>
        Winrate: <li>{playerProfile.winRatio}</li>
        Total Games: <li>{playerProfile.totalMatches}</li>
        Most Picked: <li>{playerProfile.mostPicked}</li>
      </ul>
    </div>
  );
};

export default PlayerCard;