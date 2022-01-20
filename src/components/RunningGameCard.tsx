import React from "react";
import "./RunningGameCard.css";

const RunningGameCard = ({ playerA, playerB }: { playerA: string, playerB: string }) => {
  return (
    <div className="runningGameCard">
      {playerA} - {playerB}
    </div>
  );
};

export default RunningGameCard;