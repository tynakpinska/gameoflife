import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid'; // create random keys
import "./Components/Set/Set.css";
import Challenge from "./Components/Challenge/Challenge";
import Frisella from "./Components/Frisella/Frisella";
import Learn from "./Components/Learn/Learn";
import Start from "./Components/Start/Start";
import Result from "./Components/Result/Result";

import { setChallenge, removeChallenge, startTheGame, endTheGame } from "./actions";

const mapStateToProps = state => {
  return {
    step: state.setStep.step,
    challenges: state.setChallenges.challenges
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallenge: chall => dispatch(setChallenge(chall)),
    removeChallenge: chall => dispatch(removeChallenge(chall)),
    startTheGame: start => dispatch(startTheGame(start)),
    endTheGame: end => dispatch(endTheGame(end))
  };
};



class App extends Component {
  handleEnter = e => {
    if (e.key === "Enter") {
      this.props.addChallenge(e.target.value);
      e.target.value = "";
    }
  };

  render() {
    if (this.props.step === "set") {
      return (
        <div className="set">
        <h1>What are you playing today?</h1>
        <Frisella />
        <input type="text" onKeyUp={this.handleEnter}></input>
        {this.props.challenges.map(c => (
          <Challenge challenge={c} key={uuidv4()} handleChallClick={this.props.removeChallenge}/>
        ))}
        <button onClick={this.props.startTheGame}>Start the game!</button>
        <Learn />
      </div>
      );
    } else if (this.props.step === "start") {
      return (
        <Start
          challenges={this.props.challenges}
          endTheGame={this.props.endTheGame}
          handleDone={this.handleDone}
        />
      );
    } else {
      return <Result />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
