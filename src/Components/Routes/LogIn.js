import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LogIn.module.css";

import {
  setStep,
  setResult,
  getUser,
  fetchChallenges,
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
    getUser: id => dispatch(getUser(id)),
    fetchChallenges: (id, token) => dispatch(fetchChallenges(id, token))
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


  handleSubmit = (e, { username, password } = this.state) => {
    if (username && password) {
      fetch("http://localhost:3000/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password
        }),
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp === "Unable to log in" || resp === "No such user") {
            this.setState({ loginFailed: true });
          } else {
            sessionStorage.setItem("token", resp.token);
            this.props.getUser(resp.id);
            this.props.fetchChallenges(resp.id, resp.token);
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
