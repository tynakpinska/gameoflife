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
  setRoute,
  logInAndOut,
  setUser
} from "./actions";

const mapStateToProps = state => {
  return {
    route: state.setRoute.route,
    step: state.setStep.step,
    challenges: state.setChallenges.challenges,
    isLoged: state.logInAndOut.isLoged,
    user: state.setUser.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallenge: (challenge, key) => dispatch(setChallenge(challenge, key)),
    removeChallenge: (key) => dispatch(removeChallenge(key)),
    startTheGame: (start) => dispatch(startTheGame(start)),
    endTheGame: (end) => dispatch(endTheGame(end)),
    doChallenge: (key) => dispatch(doChallenge(key)),
    setRoute: (route) => dispatch(setRoute(route)),
    logInAndOut: (boolean) => dispatch(logInAndOut(boolean)),
    setUser: user => dispatch(setUser(user))
  };
};

class App extends Component {
  handleLogIn = () => {
    this.props.setRoute("login");
  };

  handleRegister = () => {
    this.props.setRoute("register");
  };

  handleViewGame = () => {
    this.props.setRoute("game");
  };

  render() {
    return (
      <div basename="/gameoflife">
        <Nav
          isLoged={this.props.isLoged}
          viewGame={this.handleViewGame}
          logIn={this.handleLogIn}
          register={this.handleRegister}
          route={this.props.route}
          logInAndOut={this.props.logInAndOut}
          user={this.props.user}
        />
        <Frisella />
        <Learn />
        <Victories />
        {this.props.route === "login" ? (
          <LogIn
          setUser={this.props.setUser}
          logInAndOut={this.props.logInAndOut}
            setRoute={this.props.setRoute}
          />
        ) : this.props.route === "register" ? (
          <Register />
        ) : (
          <Game
          user={this.props.user}
            step={this.props.step}
            challenges={this.props.challenges}
            addChallenge={this.props.addChallenge}
            removeChallenge={this.props.removeChallenge}
            startTheGame={this.props.startTheGame}
            endTheGame={this.props.endTheGame}
            doChallenge={(key) => this.props.doChallenge(key)}
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
