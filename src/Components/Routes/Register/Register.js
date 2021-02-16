import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register, change, span } from "./Register.module.css";
import Loader from "../../Visual/Loader";

import { resetChallenges, setLoading, setRoute } from "../../../redux/actions";
import Warning from "../../Visual/Warning";

const mapStateToProps = ({ isLoading }) => {
  return { isLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    resetChallenges: () => dispatch(resetChallenges()),
    setLoading: loading => dispatch(setLoading(loading)),
    setRoute: route => dispatch(setRoute(route)),
  };
};

const Register = ({ isLoading, resetChallenges, setLoading, setRoute }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerAttempt, setRegisterAttempt] = useState("");

  const usernameRef = useRef(null);
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
    e.stopPropagation();
    if (document.activeElement.type === "submit") {
      if (username && email && password) {
        setLoading(true);
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
              setLoading(false);
            } else {
              resetChallenges();
              setRegisterAttempt("success");
              setLoading(false);
            }
          })
          .catch(console.log);
      } else {
        setRegisterAttempt("failure");
        usernameRef.current.focus();
      }
    }
  };

  const handleLogInClick = () => {
    setRoute("login");
  };

  return isLoading ? (
    <Loader />
  ) : registerAttempt === "success" ? (
    <div className={register}>
      <p>Account created!</p>
      <p>
        You may{" "}
        <span className={span} onClick={handleLogInClick}>
          log in
        </span>{" "}
        now.
      </p>
    </div>
  ) : (
    <>
      <h2>REGISTER</h2>
      <form className={register} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="username"
          type="text"
          id="username"
          onChange={handleInputChange}
          onKeyUp={handleEnter}
          ref={usernameRef}
          autoFocus
          required
          maxLength="30"
          minLength="2"
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={handleInputChange}
          onKeyUp={handleEnter}
          ref={emailRef}
          required
          maxLength="30"
          minLength="5"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleInputChange}
          onKeyUp={handleEnter}
          ref={passwordRef}
          required
          maxLength="30"
          minLength="8"
        ></input>
        <p className={change}>
          Already have an account?{" "}
          <span className={span} onClick={handleLogInClick}>
            Log in.
          </span>
        </p>
        {registerAttempt === "failure" ? <Warning /> : null}

        <button
          className="button"
          type="submit"
          onClick={handleSubmit}
          ref={submitRef}
        >
          REGISTER
        </button>
      </form>
    </>
  );
};

Register.propTypes = {
  isLoading: PropTypes.bool,
  resetChallenges: PropTypes.func,
  setLoading: PropTypes.func,
  setRoute: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
