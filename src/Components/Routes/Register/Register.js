import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "./Register.module.css";

import { resetChallenges } from "../../../redux/actions";

const mapDispatchToProps = dispatch => {
  return {
    resetChallenges: () => dispatch(resetChallenges()),
  };
};

const Register = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerAttempt, setRegisterAttempt] = useState("");

  const handleInputChange = e => {
    switch (e.target.id) {
      case "username":
        return setUsername(e.target.value);
      case "email":
        return setEmail(e.target.value);
      case "password":
        return setPassword(e.target.value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://game-of-life-api.herokuapp.com/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          "https://game-of-life-front.herokuapp.com"
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp === "Unable to register" ||
          resp === "Incorrect form submission"
        ) {
          setRegisterAttempt("failure");
        } else {
          props.resetChallenges();
          setRegisterAttempt("success");
        }
      })
      .catch(console.log);
  };

  return registerAttempt === "success" ? (
    <div className={register}>
      <p>Account created!</p>
      <p>You may log in now.</p>
    </div>
  ) : (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={register}>
        <label htmlFor="username">Username</label>
        <input
          className="username"
          type="text"
          id="username"
          onChange={handleInputChange}
        ></input>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={handleInputChange}></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleInputChange}
        ></input>
        <p className={registerAttempt === "failure" ? "warning" : "hide"}>
          Unable to register. Please try again.
        </p>

        <input
          type="submit"
          value="Register"
          onClick={handleSubmit}
          aria-label="Register"
        ></input>
      </form>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Register);
