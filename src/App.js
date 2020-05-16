import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import "./fontello/css/fontello.css";
import Frisella from "./Components/Visual/Frisella";
import Learn from "./Components/Visual/Learn";
import Nav from "./Components/Nav";
import Game from "./Components/Routes/Game/Game.js";
import Footer from "./Components/Footer";
import LogIn from "./Components/Routes/LogIn";
import Register from "./Components/Routes/Register";
import Profile from "./Components/Routes/Profile";

import { logIn, getChallenges, setStep } from "./redux/actions";

const mapStateToProps = ({ route }) => {
  return { route };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: user => dispatch(logIn(user)),
    setStep: step => dispatch(setStep(step)),
    getChallenges: challenges => dispatch(getChallenges(challenges)),
  };
};
class App extends Component {
  fetchChallenges = id => {
    const now = new Date();
    const nowStr = now.toISOString().slice(0, 10);
    fetch("http://localhost:3000/getChallenges", {
      method: "post",
      headers: { "Content-Type": "application/json", "Authorization": sessionStorage.getItem("token") },
      body: JSON.stringify({
        id,
        nowStr,
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp === "Invalid request" ||
          resp === "Unable to fetch challenges" ||
          resp === "No todays challenges"
        ) {
          console.log(resp);
        } else if (resp[0]) {
            this.props.setStep("start");
            this.props.getChallenges(resp);
        }
      })
      .catch(console.log);
  };

  getUser = id => {
    fetch(`http://localhost:3000/profile/${id}`, {
      method: "get",
      headers: { "Content-Type": "application/json", "Authorization": sessionStorage.getItem("token") },
    })
      .then(resp => resp.json())
      .then(resp => {
        this.props.logIn(resp);
      })
      .catch(console.log);
  };

  componentDidMount = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/signin", {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then(resp => resp.json())
        .then(resp => {
          this.getUser(resp);
          this.fetchChallenges(resp);
        })
        .catch(console.log);
    }
  };

  render({ route } = this.props) {
    return (
      <div basename="/gameoflife">
        <Nav />
        <div className="box"></div>
        <Frisella />
        <main>
          {route === "login" ? (
            <LogIn />
          ) : route === "register" ? (
            <Register />
          ) : route === "profile" ? (
            <Profile />
          ) : (
            <Game />
          )}
        </main>
        <Learn />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
