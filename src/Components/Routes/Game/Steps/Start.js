import React, { Component } from "react";

import ChallengesList from "../ChallengesList";
import Timer from "../Timer";

class Start extends Component {
  render(
    {
      user,
      challenges,
      step,
      toggleChallenge,
      setStep,
    } = this.props
  ) {
    return (
      <div className="container">
        <h1>Let's do it!</h1>
        <ChallengesList
          user={user}
          challenges={challenges}
          step={step}
          toggleChallenge={toggleChallenge}
          setStep={setStep}
        />
        <Timer setStep={setStep} />
      </div>
    );
  }
}

export default Start;
