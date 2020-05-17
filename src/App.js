import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import "./fontello/css/fontello.css";

import Frisella from "./Components/Visual/Frisella";
import Learn from "./Components/Visual/Learn";
import Nav from "./Components/Nav/Nav";
import Game from "./Components/Routes/Game/Game.js";
import Footer from "./Components/Footer/Footer";
import LogIn from "./Components/Routes/LogIn/LogIn";
import Register from "./Components/Routes/Register/Register";
import Profile from "./Components/Routes/Profile/Profile";

import { getUser, fetchChallenges } from "./redux/actions";

const mapStateToProps = ({ route }) => {
  return { route };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: id => dispatch(getUser(id)),
    fetchChallenges: (id, token) => dispatch(fetchChallenges(id, token)),
  };
};

class App extends Component {
  componentDidMount = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/signin", {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp !== "Unauthorized") {
            this.props.getUser(resp);
            this.props.fetchChallenges(resp, token);
          }
        })
        .catch(err => console.log(err));
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
