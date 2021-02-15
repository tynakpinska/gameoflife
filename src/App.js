import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "./Components/Visual/Loader";

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

import { getUser, fetchChallenges, setLoading } from "./redux/actions";

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

const mapStateToProps = ({ route, user, challenges, isLoading }) => {
  return { route, user, challenges, isLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (id, token) => dispatch(getUser(id, token)),
    fetchChallenges: (id, token, username) =>
      dispatch(fetchChallenges(id, token, username)),
    setLoading: loading => dispatch(setLoading(loading)),
  };
};

class App extends Component {
  componentDidMount = () => {
    const { setLoading, getUser } = this.props;
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
        },
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp && resp !== "Unauthorized") {
            getUser(resp, token);
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  // componentDidUpdate = () => {
  //   const {
  //     user: { id, username },
  //     challenges,
  //     fetchChallenges,
  //   } = this.props;
  //   const token = sessionStorage.getItem("token");
  //   console.log(id)
  //   if (token && !challenges[0]) fetchChallenges(id, token, username);
  // };

  render({ route, isLoading } = this.props) {
    return (
      <div basename="/gameoflife">
        <Cursor />
        <Nav />
        <div className="box"></div>
        <Frisella />
        <main className="container">
          {isLoading ? (
            <Loader />
          ) : route === "login" ? (
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

App.propTypes = {
  route: PropTypes.string,
  user: PropTypes.object,
  getUser: PropTypes.func,
  fetchChallenges: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
