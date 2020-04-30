import React from "react";
import { connect } from "react-redux";
import user from "../img/user.png";
import Logo from "./Logo";

import { setRoute, setStep, logOut, resetChallenges } from "../redux/actions";

const mapStateToProps = ({ step, route, user }) => {
  return {
    route,
    step,
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

function Nav(props) {
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
          props.logOut();
          props.setRoute("game");
          props.setStep("set");
          props.resetChallenges();
        }
      });
  };

  const handleUserClick = () => {
    props.setRoute("profile");
  };

  return props.user.username ? (
    <div className="nav">
      <Logo
        onClick={() => props.setRoute("game")}
      />
      <div className="user" onClick={handleUserClick}>
        <img src={user} alt="avatar" />
        <p>{props.user.username}</p>
      </div>
      <p onClick={handleLogOut}>LOG OUT</p>
    </div>
  ) : (
    <div className="nav">
      <Logo
        onClick={() => props.setRoute("game")}
      />
      <p
        onClick={() => props.setRoute("login")}
        className={props.route === "login" ? "navItemClicked" : ""}
        style={{
          borderBottom: props.route === "login" ? "1px solid #ff5c00" : "",
          cursor: props.route === "login" ? "default" : "pointer",
          letterSpacing: props.route === "login" ? "0.2rem" : "default",
        }}
      >
        LOG IN
      </p>
      <p
        onClick={() => props.setRoute("register")}
        className={props.route === "register" ? "navItemClicked" : ""}
        style={{
          borderBottom: props.route === "register" ? "1px solid #ff5c00" : "",
          cursor: props.route === "register" ? "default" : "pointer",
          letterSpacing: props.route === "register" ? "0.2rem" : "default",
        }}
      >
        REGISTER
      </p>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
