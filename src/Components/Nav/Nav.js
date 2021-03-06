import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  nav,
  navItemClicked,
  navItem,
  userBox,
  userBoxClicked,
  userAv,
  userName,
} from "./Nav.module.css";
import userImg from "../../img/user.png";
import Logo from "../Visual/Logo";

import {
  setRoute,
  setStep,
  logOut,
  resetChallenges,
} from "../../redux/actions";

const mapStateToProps = ({ route, user }) => {
  return {
    route,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoute: route => dispatch(setRoute(route)),
    setStep: step => dispatch(setStep(step)),
    logOut: () => dispatch(logOut()),
    resetChallenges: () => dispatch(resetChallenges()),
  };
};

const Nav = ({ logOut, setRoute, setStep, resetChallenges, user, route }) => {
  const handleLogOut = e => {
    fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logOut: true,
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp === "logged out") {
          sessionStorage.removeItem("token");
          logOut();
          setRoute("game");
          setStep("set");
          resetChallenges();
        }
      });
  };

  const handleUserClick = () => {
    setRoute("profile");
  };

  return (
    <nav className={nav}>
      <Logo onClick={() => setRoute("game")} />
      {user.username ? (
        <>
          <p
            className={route === "game" ? navItemClicked : navItem}
            onClick={() => setRoute("game")}
          >
            GAME
          </p>
          <div
            className={route === "profile" ? userBoxClicked : userBox}
            onClick={handleUserClick}
          >
            {user.imageUrl ? (
              <div
                className={userAv}
                style={{ backgroundImage: `url(${user.imageUrl})` }}
                alt="avatar"
              />
            ) : (
              <img className={userAv} src={userImg} alt="avatar" />
            )}
            <p className={userName}>{user.username}</p>
          </div>
          <p onClick={handleLogOut} className={navItem}>
            LOG OUT
          </p>
        </>
      ) : (
        <>
          <p
            className={route === "game" ? navItemClicked : navItem}
            onClick={() => setRoute("game")}
          >
            GAME
          </p>
          <p
            onClick={() => setRoute("login")}
            className={route === "login" ? navItemClicked : navItem}
          >
            LOG IN
          </p>
          <p
            onClick={() => setRoute("register")}
            className={route === "register" ? navItemClicked : navItem}
          >
            REGISTER
          </p>
        </>
      )}
    </nav>
  );
};

Nav.propTypes = {
  route: PropTypes.string,
  user: PropTypes.exact({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    joined: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  setRoute: PropTypes.func,
  setStep: PropTypes.func,
  logOut: PropTypes.func,
  resetChallenges: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
