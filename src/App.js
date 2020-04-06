import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Frisella from "./Components/Visual/Frisella/Frisella";
import Learn from "./Components/Visual/Learn/Learn";
import Victories from "./Components/Visual/Victories/Victories";
import Nav from "./Components/Nav/Nav";
import Game from "./Components/Routes/Game/Game.js";
import Footer from "./Components/Footer/Footer";
import LogIn from "./Components/Routes/LogIn/LogIn";
import Register from "./Components/Routes/Register/Register";

import {
  setChallenge,
  removeChallenge,
  startTheGame,
  endTheGame,
  doChallenge,
  viewGame,
  logIn,
  register
} from "./actions";

const mapStateToProps = (state) => {
  return {
    route: state.setRoute.route,
    step: state.setStep.step,
    challenges: state.setChallenges.challenges,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addChallenge: (challenge, key) => dispatch(setChallenge(challenge, key)),
    removeChallenge: (key) => dispatch(removeChallenge(key)),
    startTheGame: (start) => dispatch(startTheGame(start)),
    endTheGame: (end) => dispatch(endTheGame(end)),
    doChallenge: (key) => dispatch(doChallenge(key)),
    viewGame: (isTrue) => dispatch(viewGame(isTrue)),
    logIn: (isTrue) => dispatch(logIn(isTrue)),
    register: (isTrue) => dispatch(register(isTrue))
  };
};

class App extends Component {

  handleLogIn = () => {
    this.props.logIn(true);
  };

  handleRegister = () => {
    this.props.register(true);
  };

  render() {
    return (
      <div basename="/gameoflife">
        <Nav viewGame={this.props.viewGame} logIn={this.handleLogIn} register={this.handleRegister} route={this.props.route}/>
        <Frisella />
        <Learn />
        <Victories />
        {this.props.route === "login" ? <LogIn /> :
        this.props.route === "register" ? <Register /> :
        <Game
          step={this.props.step}
          challenges={this.props.challenges}
          addChallenge={this.props.addChallenge}
          removeChallenge={this.props.removeChallenge}
          startTheGame={this.props.startTheGame}
          endTheGame={this.props.endTheGame}
          doChallenge={(key) => this.props.doChallenge(key)}
        />}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
