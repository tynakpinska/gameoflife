import React from "react";

import Start from "./Steps/Start";
import Set from "./Steps/Set";
import End from "./Steps/End";

function Game(
  {
    step,
    user,
    challenges,
    removeChallenge,
    addChallenge,
    startTheGame,
    endTheGame,
    doChallenge,
  } = this.props
) {
  return step === "set" ? (
    <Set
      user={user}
      step={step}
      challenges={challenges}
      addChallenge={(chall, key) => addChallenge(chall, key)}
      removeChallenge={removeChallenge}
      startTheGame={startTheGame}
    />
  ) : step === "start" ? (
    <Start
      step={step}
      challenges={challenges}
      endTheGame={endTheGame}
      doChallenge={key => doChallenge(key)}
    />
  ) : (
    <End />
  );
}

export default Game;
