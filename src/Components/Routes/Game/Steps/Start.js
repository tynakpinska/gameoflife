import React from "react";

import ChallengesList from "../ChallengesList";
import Timer from "../Timer";

const Start = () => {
    return (
      <div className="container">
        <h2>Let's do it!</h2>
        <ChallengesList />
        <Timer />
      </div>
    );
}

export default Start;
