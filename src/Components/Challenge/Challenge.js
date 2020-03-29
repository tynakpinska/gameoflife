import React from "react";
import "./Challenge.css";
import fist from "../../img/fist.png";

function Challenge(props) {



  return (
    <div className="challElement" onClick={props.handleChallClick}>
      <div className="fist"><img src={fist} alt="fist" /></div>
      <div className="challenge">
        {Object.keys(props.challenge)}
      </div>
    </div>
  );
}

export default Challenge;
