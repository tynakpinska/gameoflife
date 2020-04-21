import React, { Component } from "react";
import { connect } from "react-redux";

import {
  setStep,
  logIn,
  fetchChallenges
} from "../../redux/actions";

const mapStateToProps = state => {
  return {
    challenges: state.challenges
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    logIn: user => dispatch(logIn(user)),
    fetchChallenges: challenges => dispatch(fetchChallenges(challenges))
  };
};

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginFailed: false
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  fetchChallenges = (username, password) => {
    const now = new Date();
  const nowStr =now.toISOString().slice(0,10);
    fetch("http://localhost:3000/getChallenges", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        nowStr
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp === "Invalid request" || resp === "Unable to fetch challenges") {
          console.log(resp);
        } else {
          console.log(resp);
          if (resp !== []) {
            this.props.setStep('start');
            this.props.fetchChallenges(resp);
          }
        }
      })
      .catch(console.log);
      
      
  }

  handleSubmit = (e) => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp === "Unable to log in" || resp === "No such user" || resp === "Incorrect form submission") {
          this.setState({loginFailed: true})
        } else {
          this.props.logIn(resp);
          this.fetchChallenges(this.state.username, this.state.password);
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <div className="container">
        <h1>Log in</h1>
        <div className="login">
          <label htmlFor="username" name="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={this.handleUsernameChange}
          ></input>
          <label htmlFor="password" name="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={this.handlePasswordChange}
          ></input>
          <p className={!this.state.loginFailed ? "hide" : "warning"}>Oooops... Something went wrong. Please try again.</p>
          <input
            type="submit"
            value="Log in"
            onClick={this.handleSubmit}
          ></input>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
