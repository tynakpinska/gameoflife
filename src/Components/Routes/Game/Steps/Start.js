import React from "react";

import ChallengesList from "../ChallengesList";
import Timer from "../Timer";

const Start = () => {
    return (
      <div className="container">
        <h1>Let's do it!</h1>
        <ChallengesList />
        <Timer />
      </div>
    );
}

export default Start;
