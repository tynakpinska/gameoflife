import React from "react";
import user from "../img/user.png";

function Nav(props) {

  const handleLogOut = (e) => {
    fetch("http://localhost:3000/signout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logOut: true,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp === "logged out") {
          props.logOut();
          props.setRoute("game");
          props.setStep("set");
          props.resetChallenges()
        }
      });
  };

  return props.user.username ? (
    <div className="nav">
      <p
        onClick={() => props.setRoute("game")}
        className={props.route === "game" ? "navItemClicked" : ""}
        style={{
          borderBottom: props.route === "game" ? "1px solid #fff" : "",
          cursor: props.route === "game" ? "default" : "pointer",
        }}
      >
        GAME
      </p>
      <div className="user">
        <img src={user} alt="avatar" />
        <p>{props.user.username}</p>
      </div>
      <p onClick={handleLogOut}>LOG OUT</p>
    </div>
  ) : (
    <div className="nav">
      <p
        onClick={() => props.setRoute("game")}
        className={props.route === "game" ? "navItemClicked" : ""}
        style={{
          borderBottom: props.route === "game" ? "1px solid #fff" : "",
          cursor: props.route === "game" ? "default" : "pointer",
        }}
      >
        GAME
      </p>
      <p
        onClick={() => props.setRoute("login")}
        className={props.route === "login" ? "navItemClicked" : ""}
        style={{
          borderBottom: props.route === "login" ? "1px solid #ff5c00" : "",
          cursor: props.route === "login" ? "default" : "pointer",
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
        }}
      >
        REGISTER
      </p>
    </div>
  );
}

export default Nav;
