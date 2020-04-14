import React, { Component } from "react";

import { v4 as uuidv4 } from "uuid"; // create random keys
import Challenge from "../Challenge";

class Set extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startFailed: false,
    };
  }

  handleEnter = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.props.addChallenge(e.target.value, uuidv4());
      e.target.value = "";
      this.setState({startFailed: false})
    }
  };

  handleChallClick = (e, key) => {
    this.props.removeChallenge(key);
  };

  handleStartClick = () => {
    this.props.challenges.length
      ? this.props.startTheGame()
      : this.setState({ startFailed: true });
  };

  render({ user, challenges, step, editChallenge } = this.props) {
    return (
      <div className="container">
        <h1>
          {user.username
            ? `${user.username}, what are you playing today?`
            : "What are you playing today?"}
        </h1>
        <input
          type="text"
          placeholder="Type in challenge and press Enter"
          onKeyUp={this.handleEnter}
        ></input>
        {challenges.map(c => {
          return (
            <Challenge
              step={step}
              challenge={c.name}
              key={c.key}
              handleChallClick={(e, { key } = c) =>
                this.handleChallClick(e, key)
              }
              editChallenge={e => editChallenge(e, c.key)}
            />
          );
        })}
        <button onClick={this.handleStartClick}>Start the game!</button>
        <p style={{display: this.state.startFailed ? "" : "none", color: "#3E0000"}}>Set challenges before starting the game!</p>
      </div>
    );
  }
}

export default Set;
