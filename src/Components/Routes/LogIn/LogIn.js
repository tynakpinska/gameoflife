import React, { Component } from "react";
import "./LogIn.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

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
        if (resp !== "error logging in") {
          this.props.setUser(resp);
          this.props.logInAndOut(true);
          this.props.setRoute("game");
        }
      });
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

export default LogIn;
