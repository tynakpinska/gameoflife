import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import "./fontello/css/fontello.css";
import Frisella from "./Components/Visual/Frisella";
import Learn from "./Components/Visual/Learn";
import Victories from "./Components/Visual/Victories";
import Nav from "./Components/Nav";
import Game from "./Components/Routes/Game/Game.js";
import Footer from "./Components/Footer";
import LogIn from "./Components/Routes/LogIn";
import Register from "./Components/Routes/Register";

import {
  addChallenge,
  removeChallenge,
  doChallenge,
  setRoute,
  setStep,
  logIn,
  logOut,
  editChallenge,
  resetChallenges
} from "./redux/actions";

const mapStateToProps = state => {
  return {
    route: state.setRoute.route,
    step: state.setStep.step,
    challenges: state.setChallenges.challenges,
    user: state.logInAndOut.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallenge: (challenge, key) => dispatch(addChallenge(challenge, key)),
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    doChallenge: key => dispatch(doChallenge(key)),
    setRoute: route => dispatch(setRoute(route)),
    setStep: step => dispatch(setStep(step)),
    logIn: user => dispatch(logIn(user)),
    logOut: () => dispatch(logOut()),
    resetChallenges: () => dispatch(resetChallenges())
  };
};

class App extends Component {
  render() {
    return (
      <div basename="/gameoflife">
        <Nav
          route={this.props.route}
          logIn={this.props.logIn}
          logOut={this.props.logOut}
          user={this.props.user}
          setUser={this.props.setUser}
          setRoute={this.props.setRoute}
          setStep={this.props.setStep}
          resetChallenges={this.props.resetChallenges}
        />
        <Frisella />
        <Learn />
        {this.props.route === "login" ? (
          <LogIn
            setUser={this.props.setUser}
            logIn={this.props.logIn}
            logOut={this.props.logOut}
            setRoute={this.props.setRoute}
            setStep={this.props.setStep}
            resetChallenges={this.props.resetChallenges}
          />
        ) : this.props.route === "register" ? (
          <Register 
          resetChallenges={this.props.resetChallenges}/>
        ) : (
          <Game
            user={this.props.user}
            step={this.props.step}
            challenges={this.props.challenges}
            addChallenge={this.props.addChallenge}
            removeChallenge={this.props.removeChallenge}
            setStep={this.props.setStep}
            doChallenge={key => this.props.doChallenge(key)}
            editChallenge={(chall, key) => this.props.editChallenge(chall, key)}
          />
        )}
        <Victories />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
