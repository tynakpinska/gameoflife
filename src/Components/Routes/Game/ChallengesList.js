import React, { Component } from "react";

import Challenge from "./Challenge";

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

export default ChallengesList;
