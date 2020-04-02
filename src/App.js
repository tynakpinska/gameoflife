import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid"; // create random keys
import "./App.css";
import Challenge from "./Components/Challenge/Challenge";
import Frisella from "./Components/Frisella/Frisella";
import Learn from "./Components/Learn/Learn";
import Victories from "./Components/Victories/Victories";
import Timer from "./Components/Timer/Timer";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import cursorCheck from "./img/checkmark.png";
import cursorDelete from "./img/delete.png";
import tiger from "./img/tiger.jpg";

import {
  setChallenge,
  removeChallenge,
  startTheGame,
  endTheGame,
  doChallenge
} from "./actions";

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
    endTheGame: end => dispatch(endTheGame(end)),
    doChallenge: chall => dispatch(doChallenge(chall))
  };
};

class App extends Component {
  handleEnter = e => {
    if (e.key === "Enter") {
      this.props.addChallenge(e.target.value);
      e.target.value = "";
    }
  };

  handleMouseOver = e => {
    if (this.props.step === "set") {
      e.target.style.cursor = `url("${cursorDelete}"), auto`;
    } else {
      e.target.style.cursor = `url("${cursorCheck}"), auto`;
    }
  };

  handleChallClick = e => {
    if (Object.values(this.props.challenges).every(ch => ch.isDone))
      this.props.endTheGame();
    this.props.doChallenge(e.target.innerHTML);
  };

  render() {
    return (
      <div>
        <Nav isLogged={this.props.isLogged}/>
        <Frisella />
        <Learn />
        <Victories />
        <div className="container">
          {this.props.step === "set" ? (
            <div>
              <h1>What are you playing today?</h1>
              <input type="text" onKeyUp={this.handleEnter}></input>
              {this.props.challenges.map(c => (
                <Challenge
                  challenge={c.name}
                  key={uuidv4()}
                  handleChallClick={this.props.removeChallenge}
                  handleMouseOver={this.handleMouseOver}
                />
              ))}
              <button onClick={this.props.startTheGame}>Start the game!</button>
            </div>
          ) : this.props.step === "start" &&
            !Object.values(this.props.challenges).every(ch => ch.isDone) ? (
            <div>
              <h1>Let's do it!</h1>
              {this.props.challenges.map(c => (
                <Challenge
                  challenge={c.name}
                  key={uuidv4()}
                  handleChallClick={this.handleChallClick}
                  handleMouseOver={this.handleMouseOver}
                  isDone={c.isDone}
                />
              ))}
              <Timer />
            </div>
          ) : (
            <div className="end">
              <p>You won today!</p>
              <p>Well done!</p>
              <p>Take a rest.</p>
              <img src={tiger} alt="tiger" />
              <p>See you tomorrow!</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
