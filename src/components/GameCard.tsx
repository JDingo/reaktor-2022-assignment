import React from "react";
import { GameObject } from "../types";

const GameCard = ({ game }: { game: GameObject }) => {
  return (
    <div>
      {game.playerA.name} : {game.playerA.played}  -  {game.playerB.played} : {game.playerB.name}
    </div>
  );
};

export default GameCard;