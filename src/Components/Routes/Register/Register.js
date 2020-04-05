import React from "react";
import "./Register.css";

function Register(props) {
  return (
    <div className="container">
        <h1>Register</h1>
        <form>
            <label for="username" name="username">Username</label>
            <input type="text" name="username"></input>
            <label for="password" name="password">Password</label>
            <input type="password" name="password"></input>
        </form>
    </div>
  );
}

export default Register;
