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
    setStep,
    doChallenge,
    editChallenge
  } = this.props
) {
  return step === "set" ? (
    <Set
      user={user}
      step={step}
      challenges={challenges}
      addChallenge={(chall, key) => addChallenge(chall, key)}
      removeChallenge={removeChallenge}
      setStep={setStep}
      editChallenge={editChallenge}
    />
  ) : step === "start" ? (
    <Start
      step={step}
      challenges={challenges}
      setStep={setStep}
      doChallenge={key => doChallenge(key)}
    />
  ) : (
    <End user={user}/>
  );
}

export default Game;
