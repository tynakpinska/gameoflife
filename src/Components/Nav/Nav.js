import React from "react";
import "./Nav.css";

function Nav(props) {
  return props.isLoged ? (
    <div className="nav">
      <p>LOG OUT</p>
    </div>
  ) : (
    <div className="nav">
      <p
        onClick={props.viewGame}
        className={props.route === "game" ? "navItemHover" : ""}
        style={{
          borderBottom: props.route === "game" ? "1px solid #fff" : "",
          cursor: props.route === "game" ? "default" : "pointer",
        }}
      >
        GAME
      </p>
      <p
        onClick={props.logIn}
        className={props.route === "login" ? "navItemHover" : ""}
        style={{
          borderBottom: props.route === "login" ? "1px solid #ff5c00" : "",
          cursor: props.route === "login" ? "default" : "pointer",
        }}
      >
        LOG IN
      </p>
      <p
        onClick={props.register}
        className={props.route === "register" ? "navItemHover" : ""}
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
