import React from "react";
import "./Game.css";

import Start from "./Start/Start";
import Set from "./Set/Set";
import End from "./End/End";

function Game(props) {
  return (
    <div className="container">
      {props.step === "set" ? (
        <Set
        user={props.user}
          challenges={props.challenges}
          addChallenge={(challenge, key) => props.addChallenge(challenge, key)}
          removeChallenge={props.removeChallenge}
          startTheGame={props.startTheGame}
        />
      ) : props.step === "start" &&
        !Object.values(props.challenges).every((ch) => ch.isDone) ? (
        <Start
          challenges={props.challenges}
          endTheGame={props.endTheGame}
          doChallenge={key => props.doChallenge(key)}
        />
      ) : (
        <End />
      )}
    </div>
  );
}

export default Game;
