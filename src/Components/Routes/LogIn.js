import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LogIn.module.css";

import {
  setStep,
  setResult,
  logIn,
  getChallenges,
} from "../../redux/actions";

const mapStateToProps = state => {
  return {
    challenges: state.challenges,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    setResult: result => dispatch(setResult(result)),
    logIn: user => dispatch(logIn(user)),
    getChallenges: challenges => dispatch(getChallenges(challenges)),
  };
};

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginFailed: false,
    };
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  fetchChallenges = (id, token) => {
    const now = new Date();
    const nowStr = now.toISOString().slice(0, 10);
    fetch("http://localhost:3000/getChallenges", {
      method: "post",
      headers: { "Content-Type": "application/json", "Authorization": token },
      body: JSON.stringify({
        id,
        nowStr
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp === "Invalid request" ||
          resp === "Unable to fetch challenges" ||
          resp === "No todays challenges"
        ) {
          console.log(resp);
        } else if (resp[0]) {
            this.props.setStep("start");
            this.props.getChallenges(resp);
        }
      })
      .catch(console.log);
  };

  handleSubmit = e => {
    if (this.state.username && this.state.password) {
      fetch("http://localhost:3000/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp === "Unable to log in" || resp === "No such user") {
            this.setState({ loginFailed: true });
          } else {
            sessionStorage.setItem("token", resp.token);
            this.props.logIn(resp);
            this.fetchChallenges(resp.id, resp.token);
          }
        })
        .catch(console.log);
    } else {
      this.setState({ loginFailed: true });
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Log in</h2>
        <div className={styles.login}>
          <label htmlFor="username">Username</label>
          <input
            className="username"
            type="text"
            id="username"
            onChange={this.handleUsernameChange}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={this.handlePasswordChange}
          ></input>
          <p className={!this.state.loginFailed ? "hide" : "warning"}>
            Oooops... Something went wrong. Please try again.
          </p>
          <input
            type="submit"
            value="Log in"
            onClick={this.handleSubmit}
            aria-label="Log in"
          ></input>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
