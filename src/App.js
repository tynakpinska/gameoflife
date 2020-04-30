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

const mapStateToProps = ({ route }) => {
  return { route };
};

class App extends Component {
  render({ route } = this.props) {
    return (
      <div basename="/gameoflife">
        <Nav />
        <main>
          <Frisella />
          <Learn />
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
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(App);
