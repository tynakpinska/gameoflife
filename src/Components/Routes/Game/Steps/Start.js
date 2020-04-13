import React from "react";

import { v4 as uuidv4 } from "uuid"; // create random keys

import Challenge from "../Challenge";
import Timer from "../Timer";

function Start(props) {

  const handleChallClick = (e, key) => {
    props.doChallenge(key);
    if (props.challenges.every(ch => ch.isDone)) {
      const delay = setTimeout(props.endTheGame, 2000, key);
      clearTimeout(delay);
    }
  };

  return (
    <div className="container">
      <h1>Let's do it!</h1>
      {props.challenges.map((c) => {
        return (
        <Challenge
        step={props.step}
          challenge={c.name}
          key={uuidv4()}
          handleChallClick={(e, {key} = c) => handleChallClick(e, key)}
          isDone={c.isDone}
        />
      )})}
      <Timer />
    </div>
  );
}

export default Start;
