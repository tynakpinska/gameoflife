import React from "react";
import Challenge from "../Challenge/Challenge";
import "./Start.css";

const Start = props => {


  return (
    <div className="start">
      <h1>Let's do it!</h1>
      {props.challenges.map(c => (
        <Challenge challenge={c} />
      ))}
      {props.leftParts.hours} : {props.leftParts.minutes} : {props.leftParts.seconds}
    </div>
  );
};

export default Start;
