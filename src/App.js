import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import "./fontello/css/fontello.css";

import Cursor from "./Components/Visual/Cursor";
import Frisella from "./Components/Visual/Frisella";
import Learn from "./Components/Visual/Learn";
import Nav from "./Components/Nav/Nav";
import Game from "./Components/Routes/Game/Game";
import Footer from "./Components/Footer/Footer";
import LogIn from "./Components/Routes/LogIn/LogIn";
import Register from "./Components/Routes/Register/Register";
import Profile from "./Components/Routes/Profile/Profile";

import { getUser, fetchChallenges } from "./redux/actions";

const handleMouseMove = e => {
  const cursor = document.getElementById("cursor");
  cursor.style.left = `${e.pageX - 10}px`;
  cursor.style.top = `${e.pageY - 10}px`;
};

const handleClick = e => {
  const cursor = document.getElementById("cursor");
  cursor.classList.add("click");
  setTimeout(() => cursor.classList.remove("click"), 500);
};

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("click", handleClick);

const mapStateToProps = ({ route, user }) => {
  return { route, user };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (id, token) => dispatch(getUser(id, token)),
    fetchChallenges: (id, token, username) =>
      dispatch(fetchChallenges(id, token, username)),
  };
};

class App extends Component {
  componentDidMount = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetch("https://game-of-life-api.herokuapp.com/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "Access-Control-Allow-Origin":
            "https://game-of-life-front.herokuapp.com/"
        },
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp && resp !== "Unauthorized") {
            this.props.getUser(resp, token);
          }
        })
        .catch(err => console.log(err));
    }
  };

  componentDidUpdate = () => {
    const token = sessionStorage.getItem("token");
    if (token)
      this.props.fetchChallenges(
        this.props.user.id,
        token,
        this.props.user.username
      );
  };

  render({ route } = this.props) {
    return (
      <div basename="/gameoflife">
        <Cursor />
        <Nav />
        <div className="box"></div>
        <Frisella />
        <main className="container">
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
