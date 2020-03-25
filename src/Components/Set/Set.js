import React, { Component } from "react";
import "./Set.css";
import Challenge from "../Challenge/Challenge";
import Frisella from "../Frisella/Frisella";
import Learn from "../Learn/Learn";

class Set extends Component {
  handleEnter = e => {
    if (e.key === "Enter") {
      this.props.addChallenge(e.target.value);
      e.target.value = "";
    }
  };

  handleButtClick = e => {
    this.props.startingTheGame(true);
  };

  handleChallClick = e => {
    this.props.removeChallenge(e.target.innerHTML)
  };



  render() {
    return (
      <div className="set">
        <h1>What are you playing today?</h1>
        <Frisella />
        <input type="text" onKeyUp={this.handleEnter}></input>
        {this.props.challenges.map(c => (
          <Challenge challenge={c} key={c} handleChallClick={this.handleChallClick}/>
        ))}
        <button onClick={this.handleButtClick}>Start the game!</button>
        <Learn />
      </div>
    );
  }
}

export default Set;
