import React, { Component } from "react";
import {connect} from "react-redux";

import { v4 as uuidv4 } from "uuid"; // create random keys
import ChallengesList from "../ChallengesList";

import {
  addChallenge,
  removeChallenge,
  setStep,
  editChallenge
} from "../../../../redux/actions";

const mapStateToProps = ({ challenges, step, route, user }) => {
  return {
    route,
    step,
    challenges,
    user
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
    }}
  };

  handleStartClick = () => {
    this.props.challenges.length
      ? this.props.setStep("start")
      : this.setState({ startFailed: true });
  };

  render(
    { user } = this.props
  ) {
    return (
      <div className="container">
        <h1>
          {user.username
            ? `${user.username}, what are you playing today?`
            : "What are you playing today?"}
        </h1>
        <input
          className="typeChall"
          type="text"
          placeholder="Set challenge and press enter"
          onKeyUp={this.handleEnter}
        ></input>
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
