import React from "react";
import "./Nav.css";

function Nav(props) {
  return props.isLoged ? (
    <div className="nav">
      <p>LOG OUT</p>
    </div>
  ) : (
    <div className="nav">
      <p onClick={props.signIn}>LOG IN</p>
      <p>REGISTER</p>
    </div>
  );
}

export default Nav;
