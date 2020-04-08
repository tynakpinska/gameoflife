import React from "react";
import "./Set.css";

import { v4 as uuidv4 } from "uuid"; // create random keys
import Challenge from "./../Challenge/Challenge";
import cursorDelete from "./../../../../img/delete.png";

function Set(props) {
  const handleEnter = e => {
    if (e.key === "Enter") {
      props.addChallenge(e.target.value, uuidv4());
      e.target.value = "";
    }
  };

  const handleChallClick = (e, key) => {
    props.removeChallenge(key);
  }

  const handleMouseOver = e => {
      e.target.style.cursor = `url("${cursorDelete}"), auto`;
    }

  return (
    <div>
      <h1>{props.user.username ? `${props.user.username}, what are you playing today?` : "What are you playing today?"}</h1>
      <input type="text" placeholder="Enter your challenges for today" onKeyUp={handleEnter}></input>
      {props.challenges.map(c => {
        const { name, key } = c;
        return (
        <Challenge
          challenge={name}
          key={key}
          handleChallClick={(e, {key} = c) => handleChallClick(e, key)}
          handleMouseOver={handleMouseOver}
        />
      )})}
      <button onClick={props.startTheGame}>Start the game!</button>
    </div>
  );
}

export default Set;
