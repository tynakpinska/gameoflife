import React, { Component } from "react";
import Challenge from "../Challenge/Challenge";
import "./Set.css";

class Set extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curChall: "",
      challenges: []
    };
  }

  handleEnter = e => {
    if (e.key === "Enter") {
      this.props.addChallenge(e.target.value);
      e.target.value = "";
    }
  }

  handleClick = e => {
    this.props.startingTheGame(true);
  };

  render() {
    return (
      <div className="set">
        <h1>What are you playing today?</h1>
          <input type="text" onKeyUp={this.handleEnter}></input>
          {this.props.challenges.map(c => <Challenge challenge={c}/>)}
          <button onClick={this.handleClick}>Start the game!</button>
      </div>
    );
  }
}

export default Set;
