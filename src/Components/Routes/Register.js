import React, { Component } from "react";

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

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = e => {
    const { username, email, password } = this.state;
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp === "Unable to register" || resp === "Incorrect form submission") {
          this.setState({ registerAttempt: "failure" });
        } else {
          this.setState({
            registerAttempt: "success",
          });
          console.log(resp);
        }
      })
      .catch(console.log);
  };

  render({ registerAttempt } = this.state) {
    return registerAttempt === "success" ? (
      <div className="container">
        <div className="register success">
          <p>Account created!</p>
          <p>You may log in now.</p>
        </div>
      </div>
    ) : (
      <div className="container">
        <h1>Register</h1>
        <div className="register">
          <label htmlFor="username" name="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={this.handleUsernameChange}
          ></input>
          <label htmlFor="email" name="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={this.handleEmailChange}
          ></input>
          <label htmlFor="password" name="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={this.handlePasswordChange}
          ></input>
          <p className={registerAttempt === "failure" ? "" : "hide"}>
            Unable to register. Please try again.
          </p>

          <input
            type="submit"
            value="Register"
            onClick={this.handleSubmit}
          ></input>
        </div>
      </div>
    );
  }
}

export default Register;
