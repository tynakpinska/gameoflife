import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Frisella from "./Components/Visual/Frisella";
import Learn from "./Components/Visual/Learn";
import Victories from "./Components/Visual/Victories";
import Nav from "./Components/Nav";
import Game from "./Components/Routes/Game/Game.js";
import Footer from "./Components/Footer";
import LogIn from "./Components/Routes/LogIn";
import Register from "./Components/Routes/Register";

import {
  setChallenge,
  removeChallenge,
  startTheGame,
  endTheGame,
  doChallenge,
  setRoute,
  logIn,
  logOut,
  setUser,
} from "./redux/actions";

const mapStateToProps = state => {
  return {
    route: state.setRoute.route,
    step: state.setStep.step,
    challenges: state.setChallenges.challenges,
    isLoged: state.logInAndOut.isLoged,
    user: state.setUser.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallenge: (challenge, key) => dispatch(setChallenge(challenge, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    startTheGame: start => dispatch(startTheGame(start)),
    endTheGame: end => dispatch(endTheGame(end)),
    doChallenge: key => dispatch(doChallenge(key)),
    setRoute: route => dispatch(setRoute(route)),
    logIn: () => dispatch(logIn()),
    logOut: () => dispatch(logOut()),
    setUser: user => dispatch(setUser(user)),
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
          handleLogIn={this.handleLogIn}
          register={this.handleRegister}
          route={this.props.route}
          logIn={this.props.logIn}
          logOut={this.props.logOut}
          user={this.props.user}
          setUser={this.props.setUser}
        />
        <Frisella />
        <Learn />
        <Victories />
        {this.props.route === "login" ? (
          <LogIn
            setUser={this.props.setUser}
            logIn={this.props.logIn}
            logOut={this.props.logOut}
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
            doChallenge={key => this.props.doChallenge(key)}
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
