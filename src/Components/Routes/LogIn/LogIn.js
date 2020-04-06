import React from "react";
import "./LogIn.css";

function LogIn(props) {
  return (
    <div className="container">
        <h1>Log in</h1>
        <form className ="login">
            <label htmlFor="username" name="username">Username</label>
            <input type="text" name="username"></input>
            <label htmlFor="password" name="password">Password</label>
            <input type="password" name="password"></input>
            <input type="submit" value="Log in"></input>
        </form>
    </div>
  );
}

export default LogIn;
