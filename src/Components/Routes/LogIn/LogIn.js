import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, change, span } from "./LogIn.module.css";
import Loader from "../../Visual/Loader";
import Warning from "../../Visual/Warning";

import {
  setStep,
  getUser,
  fetchChallenges,
  setLoading,
  setRoute,
} from "../../../redux/actions";

const mapStateToProps = ({ challenges, isLoading }) => {
  return {
    challenges,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    getUser: id => dispatch(getUser(id)),
    fetchChallenges: (id, token) => dispatch(fetchChallenges(id, token)),
    setLoading: loading => dispatch(setLoading(loading)),
    setRoute: route => dispatch(setRoute(route)),
  };
};

const LogIn = ({ isLoading, getUser, setLoading, setRoute }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const usernameRef = useRef(null);
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
    e.stopPropagation();
    if (document.activeElement.type === "submit") {
      if (username && password) {
        setLoading(true);
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
              setLoading(false);
              usernameRef.current.focus();
            } else if (resp.id) {
              sessionStorage.setItem("token", resp.token);
              getUser(resp.id);
              setLoading(false);
            }
          })
          .catch(err => {
            console.log(err);
            setLoginFailed(true);
            setLoading(false);
            usernameRef.current.focus();
          });
      } else {
        setLoginFailed(true);
        usernameRef.current.focus();
      }
    }
  };

  const handleRegisterClick = () => {
    setRoute("register");
  };

  return (
    <>
      <h2>LOGIN</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <form className={login} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="username"
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            ref={usernameRef}
            onKeyUp={handleEnter}
            autoFocus
            required
            maxLength="30"
            minLength="2"
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            ref={passwordRef}
            onKeyUp={handleEnter}
            required
            maxLength="30"
            minLength="8"
          ></input>
          <p className={change}>
            Don’t have an account yet?{" "}
            <span className={span} onClick={handleRegisterClick}>
              Register.
            </span>
          </p>

          {loginFailed ? <Warning /> : null}
          <button
            className="button"
            type="submit"
            onClick={handleSubmit}
            ref={submitRef}
          >
            LOG IN
          </button>
        </form>
      )}
    </>
  );
};

LogIn.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  setStep: PropTypes.func,
  getUser: PropTypes.func,
  fetchChallenges: PropTypes.func,
  setLoading: PropTypes.func,
  setRoute: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
