import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { register } from "./Register.module.css";
import Loader from "../../Visual/Loader";

import { resetChallenges, setLoading } from "../../../redux/actions";

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetChallenges: () => dispatch(resetChallenges()),
    setLoading: loading => dispatch(setLoading(loading)),
  };
};

const Register = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerAttempt, setRegisterAttempt] = useState("");

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const submitRef = useRef(null);

  const handleEnter = e => {
    if (e.keyCode === 13) {
      if (e.target.id === "username") {
        emailRef.current.focus();
      } else if (e.target.id === "email") {
        passwordRef.current.focus();
      } else if (e.target.id === "password") {
        submitRef.current.focus();
      }
    }
  };

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
    if (username && email && password) {
    props.setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
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
          props.setLoading(false);
        } else {
          props.resetChallenges();
          setRegisterAttempt("success");
          props.setLoading(false);
        }
      })
      .catch(console.log);
    }
  };

  return props.isLoading ? (
    <Loader />
  ) : registerAttempt === "success" ? (
    <div className={register}>
      <p>Account created!</p>
      <p>You may log in now.</p>
    </div>
  ) : (
    <>
      <h2>Register</h2>
      <form className={register}>
        <label htmlFor="username">Username</label>
        <input
          className="username"
          type="text"
          id="username"
          onChange={handleInputChange}
          onKeyUp={handleEnter}
          autoFocus
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={handleInputChange}
          onKeyUp={handleEnter}
          ref={emailRef}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleInputChange}
          onKeyUp={handleEnter}
          ref={passwordRef}
        ></input>
        <p className={registerAttempt === "failure" ? "warning" : "hide"}>
          Unable to register. Please try again.
        </p>

        <button className="button" onClick={handleSubmit} ref={submitRef}>
            Register
          </button>
      </form>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
