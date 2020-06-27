import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./LogIn.module.css";

import { setStep, getUser, fetchChallenges } from "../../../redux/actions";

const mapStateToProps = state => {
  return {
    challenges: state.challenges,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    getUser: id => dispatch(getUser(id)),
    fetchChallenges: (id, token) => dispatch(fetchChallenges(id, token)),
  };
};

const LogIn = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (username && password) {
      fetch("https://game-of-life-api.herokuapp.com/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            "https://tynakpinska.github.io"
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp === "Unable to log in" || resp === "No such user") {
            setLoginFailed(true);
          } else if (resp.id) {
            sessionStorage.setItem("token", resp.token);
            props.getUser(resp.id);
            props.fetchChallenges(resp.id, resp.token);
          }
        })
        .catch(console.log);
    } else {
      setLoginFailed(true);
    }
  };

  return (
    <>
      <h2>Log in</h2>
      <form className={styles.login} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="username"
          type="text"
          id="username"
          onChange={e => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        ></input>
        <p className={!loginFailed ? "hide" : "warning"}>
          Oooops... Something went wrong. Please try again.
        </p>
        <input
          type="submit"
          onClick={handleSubmit}
          aria-label="Log in"
          value="Log in"
        ></input>
      </form>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
