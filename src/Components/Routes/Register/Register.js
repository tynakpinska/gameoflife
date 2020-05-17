import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "./Register.module.css";

import { resetChallenges } from "../../../redux/actions";

const mapDispatchToProps = dispatch => {
  return {
    resetChallenges: () => dispatch(resetChallenges()),
  };
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      registerAttempt: "",
    };
  }

  handleInputChange = e => {
    switch (e.target.id) {
      case "username":
        return this.setState({ username: e.target.value });
      case "email":
        return this.setState({ email: e.target.value });
      case "password":
        return this.setState({ password: e.target.value });
      default:
        return;
    }
  };

  handleSubmit = e => {
    const { username, email, password } = this.state;
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
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
          this.setState({ registerAttempt: "failure" });
        } else {
          this.props.resetChallenges();
          this.setState({
            registerAttempt: "success",
          });
        }
      })
      .catch(console.log);
  };

  render({ registerAttempt } = this.state) {
    return registerAttempt === "success" ? (
      <div className="container">
        <div className={register}>
          <p>Account created!</p>
          <p>You may log in now.</p>
        </div>
      </div>
    ) : (
      <div className="container">
        <h2>Register</h2>
        <div className={register}>
          <label htmlFor="username">Username</label>
          <input
            className="username"
            type="text"
            id="username"
            onChange={this.handleInputChange}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={this.handleInputChange}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={this.handleInputChange}
          ></input>
          <p className={registerAttempt === "failure" ? "warning" : "hide"}>
            Unable to register. Please try again.
          </p>

          <input
            type="submit"
            value="Register"
            onClick={this.handleSubmit}
            aria-label="Register"
          ></input>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);
