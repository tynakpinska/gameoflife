import React from "react";
import "./Register.css";

function Register(props) {
  return (
    <div className="container">
        <h1>Register</h1>
        <form className ="register">
            <label htmlFor="username" name="username">Username</label>
            <input type="text" name="username"></input>
            <label htmlFor="email" name="email">Email</label>
            <input type="email" name="email"></input>
            <label htmlFor="password" name="password">Password</label>
            <input type="password" name="password"></input>
            <input type="submit" value="Register"></input>
        </form>
    </div>
  );
}

export default Register;
