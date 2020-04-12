import React from "react";

import { v4 as uuidv4 } from "uuid"; // create random keys

import Challenge from "../Challenge";
import Timer from "../Timer";
import cursorCheck from "./../../../../img/checkmark.png";

function Start(props) {

  const handleChallClick = (e, key) => {
    props.doChallenge(key);
    if (props.challenges.every(ch => ch.isDone)) {
      const delay = setTimeout(props.endTheGame, 2000, key);
      clearTimeout(delay);
    }
  };

  const handleMouseOver = e => {
    e.target.style.cursor = `url("${cursorCheck}"), auto`;
  };

  return (
    <div className="container">
      <h1>Let's do it!</h1>
      {props.challenges.map((c) => {
        return (
        <Challenge
          challenge={c.name}
          key={uuidv4()}
          handleChallClick={(e, {key} = c) => handleChallClick(e, key)}
          handleMouseOver={handleMouseOver}
          isDone={c.isDone}
        />
      )})}
      <Timer />
    </div>
  );
}

export default Start;
