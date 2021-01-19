import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import styles from "./LogIn.module.css";
import Loader from "../../Visual/Loader";

import {
  setStep,
  getUser,
  fetchChallenges,
  setLoading,
} from "../../../redux/actions";

const mapStateToProps = state => {
  return {
    challenges: state.challenges,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    getUser: id => dispatch(getUser(id)),
    fetchChallenges: (id, token) => dispatch(fetchChallenges(id, token)),
    setLoading: loading => dispatch(setLoading(loading)),
  };
};

const LogIn = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  const handleEnter = e => {
    if (e.keyCode === 13) {
      if (e.target.id === "username") {
        passwordRef.current.focus();
      } else if (e.target.id === "password") {
        submitRef.current.focus();
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (username && password) {
      props.setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
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
            props.setLoading(false);
          } else if (resp.id) {
            sessionStorage.setItem("token", resp.token);
            props.getUser(resp.id);
            props.fetchChallenges(resp.id, resp.token);
            props.setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
          setLoginFailed(true);
          props.setLoading(false);
        });
    }
  };

  return (
    <>
      <h2>Log in</h2>
      {props.isLoading ? (
        <Loader />
      ) : (
        <form className={styles.login}>
          <label htmlFor="username">Username</label>
          <input
            className="username"
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            onKeyUp={handleEnter}
            autoFocus
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            ref={passwordRef}
            onKeyUp={handleEnter}
          ></input>
          <p className={!loginFailed ? "hide" : "warning"}>
            Oooops... Something went wrong. Please try again.
          </p>
          <button className="button" onClick={handleSubmit} ref={submitRef}>
            Log in
          </button>
        </form>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
