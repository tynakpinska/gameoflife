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
  toggleChallenge,
  setRoute,
  setStep,
  logIn,
  logOut,
  editChallenge,
  resetChallenges,
} from "./redux/actions";

const mapStateToProps = ({ challenges, step, route, user }) => {
  return {
    route,
    step,
    challenges,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallenge: (chall, key) => dispatch(addChallenge(chall, key)),
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    toggleChallenge: key => dispatch(toggleChallenge(key)),
    setRoute: route => dispatch(setRoute(route)),
    setStep: step => dispatch(setStep(step)),
    logIn: user => dispatch(logIn(user)),
    logOut: () => dispatch(logOut()),
    resetChallenges: () => dispatch(resetChallenges()),
  };
};

class App extends Component {
  render(
    {
      route,
      step,
      user,
      challenges,
      logIn,
      logOut,
      setRoute,
      setStep,
      resetChallenges,
      removeChallenge,
      toggleChallenge,
      editChallenge,
      addChallenge
    } = this.props
  ) {
    return (
      <div basename="/gameoflife">
        <Nav
          route={route}
          user={user}
          logIn={logIn}
          logOut={logOut}
          setRoute={setRoute}
          setStep={setStep}
          resetChallenges={resetChallenges}
        />
        <Frisella />
        <Learn />
        {route === "login" ? (
          <LogIn
            logIn={logIn}
            setRoute={setRoute}
            setStep={setStep}
            resetChallenges={resetChallenges}
          />
        ) : route === "register" ? (
          <Register resetChallenges={resetChallenges} />
        ) : (
          <Game
            user={user}
            step={step}
            setStep={setStep}
            challenges={challenges}
            addChallenge={addChallenge}
            removeChallenge={removeChallenge}
            toggleChallenge={key => toggleChallenge(key)}
            editChallenge={(chall, key) => editChallenge(chall, key)}
          />
        )}
        <Victories />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
