import React from "react";
import { connect } from "react-redux";
import styles from "./Nav.module.css";
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
    fetch("http://localhost:3000/signout", {
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
    <div className={styles.nav}>
      <Logo onClick={() => setRoute("game")} />
      {user.username ? (
        <>
          <div className={styles.user} onClick={handleUserClick}>
            <img src={userImg} alt="avatar" />
            <p>{user.username}</p>
          </div>
          <p onClick={handleLogOut}>LOG OUT</p>
        </>
      ) : (
        <>
          <p
            onClick={() => setRoute("login")}
            className={route === "login" ? styles.navItemClicked : ""}
            style={{
              borderBottom: route === "login" ? "1px solid #ff5c00" : "",
              cursor: route === "login" ? "default" : "pointer",
              letterSpacing: route === "login" ? "0.2rem" : "default",
            }}
          >
            LOG IN
          </p>
          <p
            onClick={() => setRoute("register")}
            className={route === "register" ? styles.navItemClicked : ""}
            style={{
              borderBottom: route === "register" ? "1px solid #ff5c00" : "",
              cursor: route === "register" ? "default" : "pointer",
              letterSpacing: route === "register" ? "0.2rem" : "default",
            }}
          >
            REGISTER
          </p>
        </>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
