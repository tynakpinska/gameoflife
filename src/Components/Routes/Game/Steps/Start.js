import React, { Component } from "react";

import { v4 as uuidv4 } from "uuid"; // create random keys

import Challenge from "../Challenge";
import Timer from "../Timer";

class Start extends Component {


  handleChallClick = async (e, key) => {
    await this.props.doChallenge(key);
    if (this.props.challenges.every(ch => ch.isDone)) {
      setTimeout(this.props.endTheGame, 1000);
    }
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
