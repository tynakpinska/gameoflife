import React, { Component } from "react";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    console.log(e);
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  };

  render() {
    return (
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
