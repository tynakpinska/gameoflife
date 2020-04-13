import React, { Component } from "react";

import { v4 as uuidv4 } from "uuid"; // create random keys

import Challenge from "../Challenge";
import Timer from "../Timer";

class Start extends Component {

  componentDidUpdate({ challenges, endTheGame } = this.props) {
    if (challenges.every(ch => ch.isDone)) setTimeout(() => endTheGame, 5000);
    }

  handleChallClick = (e, key) => {
    this.props.doChallenge(key);
  };

  render({ challenges, step } = this.props) {
    return (
      <div className="container">
        <h1>Let's do it!</h1>
        {challenges.map(c => {
          return (
            <Challenge
              step={step}
              challenge={c.name}
              key={uuidv4()}
              handleChallClick={(e, { key } = c) =>
                this.handleChallClick(e, key)
              }
              isDone={c.isDone}
            />
          );
        })}
        <Timer />
      </div>
    );
  }
}

export default Start;
