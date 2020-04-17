import React, { Component } from "react";
import { connect } from "react-redux";

import Challenge from "./Challenge";

import {
  removeChallenge,
  toggleChallenge,
  setStep,
  editChallenge
} from "../../../redux/actions";

const mapStateToProps = ({ challenges, step, route }) => {
  return { challenges, step, route };
};

const mapDispatchToProps = dispatch => {
  return {
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    toggleChallenge: key => dispatch(toggleChallenge(key)),
    setStep: step => dispatch(setStep(step))
  };
};

class ChallengesList extends Component {
  handleChallClick = async (e, key) => {
    if (this.props.step === "set") {
      this.props.removeChallenge(key);
    } else {
      await this.props.toggleChallenge(key);
      if (this.props.challenges.every(ch => ch.isDone)) {
        setTimeout(() => this.props.setStep("end"), 1000);
      }
    }
  };

  render({ step, challenges, editChallenge } = this.props) {
    return challenges.map(c => (
      <Challenge
        step={step}
        challenge={c.name}
        key={c.key}
        handleChallClick={(e, { key } = c) => this.handleChallClick(e, key)}
        editChallenge={e => editChallenge(e, c.key)}
        isDone={c.isDone}
      />
    ));
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesList);
