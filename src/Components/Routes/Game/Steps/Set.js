import React, { Component } from "react";
import { connect } from "react-redux";

import { v4 as uuidv4 } from "uuid"; // create random keys
import ChallengesList from "../ChallengesList";

import {
  addChallenge,
  removeChallenge,
  setStep,
  editChallenge,
} from "../../../../redux/actions";

const mapStateToProps = ({ challenges, step, route, user }) => {
  return {
    route,
    step,
    challenges,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallenge: (chall, key) => dispatch(addChallenge(chall, key)),
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    setStep: step => dispatch(setStep(step)),
  };
};

class Set extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startFailed: false,
      inputValue: "",
    };
  }

  handleEnter = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      const user = this.props.user;
      const challenge = e.target.value;
      const id = uuidv4();
      this.props.addChallenge(challenge, id);
      e.target.value = "";
      this.setState({ startFailed: false });
      if (user.username) {
        fetch("http://localhost:3000/saveChallenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user,
            challenge,
            key: id,
            date: new Date(),
            isDone: false,
          }),
        })
          .then(resp => resp.json())
          .then(resp => console.log(resp))
          .catch(err => console.log(err, "Unable to save challenge"));
      }
    }
  };

  handleStartClick = () => {
    this.props.challenges.length
      ? this.props.setStep("start")
      : this.setState({ startFailed: true });
  };

  handleOnMouseOver = e => {
    e.target.style.color = "black";
  };

  handleOnMouseLeave = e => {
    e.target.style.color = "inherit";
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleButtonClick = e => {
    const challenge = this.state.inputValue;
    if (challenge !== "") {
      const user = this.props.user;
      const id = uuidv4();
      this.props.addChallenge(challenge, id);
      document.querySelector(".typeChall").value = "";
      if (user.username) {
        fetch("http://localhost:3000/saveChallenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user,
            challenge,
            key: id,
            date: new Date(),
            isDone: false,
          }),
        })
          .then(resp => resp.json())
          .then(resp => console.log(resp))
          .catch(err => console.log(err, "Unable to save challenge"));
      }
    }
  };

  render({ user } = this.props) {
    return (
      <div className="container">
        <h1>
          {user.username
            ? `${user.username}, what are you playing today?`
            : "What are you playing today?"}
        </h1>
        <div className="inputContainer">
          <input
            className="typeChall"
            type="text"
            placeholder="e.g. learn javascript"
            onKeyUp={this.handleEnter}
            onChange={this.handleInputChange}
          ></input>
          <i
            onMouseOver={this.handleOnMouseOver}
            onMouseLeave={this.handleOnMouseLeave}
            onClick={this.handleButtonClick}
            className="addChallButton demo-icon icon-plus-circled"
          ></i>
        </div>
        <ChallengesList />
        <button onClick={this.handleStartClick}>Start the game!</button>
        <p
          style={{
            display: this.state.startFailed ? "" : "none",
            color: "#3E0000",
          }}
        >
          Set challenges before starting the game!
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Set);
