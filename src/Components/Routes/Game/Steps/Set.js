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
      const user= this.props.user;
      const challenge = e.target.value;
      const id = uuidv4();
      this.props.addChallenge(challenge, id);
      e.target.value = "";
      this.setState({ startFailed: false });
      fetch("http://localhost:3000/saveChallenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          challenge,
          key: id,
          date: new Date(),
          isDone: false,
        }),
      })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(err => console.log(err, "Unable to save challenge"));
    }
  };

  handleChallClick = (e, key) => {
    this.props.removeChallenge(key);
  };

  handleStartClick = () => {
    this.props.challenges.length
      ? this.props.setStep("start")
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
        className="typeChall"
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
        <p
          style={{
            display: this.state.startFailed ? "" : "none",
            color: "#3E0000",
          }}
        >
          Set challenges before starting the game!
        </p>
      </div>
    );
  }
}

export default Set;
