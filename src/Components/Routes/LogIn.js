import React, { Component } from "react";

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
          this.props.setUser(resp);
          this.props.logIn();
          this.props.setRoute("game");
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
          <p className={!this.state.loginFailed ? "hide" : ""}>Oooops... Something went wrong. Please try again.</p>
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
