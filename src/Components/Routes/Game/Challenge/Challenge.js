import React from "react";
import "./Challenge.css";
import fist from "../../../../img/fist.png";

function Challenge(props) {
  return (
    <div className={props.isDone? "challElement done" : "challElement"} onClick={props.handleChallClick}>
      {props.isDone ? (
        <div className="fist">
          <img src={fist} alt="fist" />
        </div>
      ) : (
        <div></div>
      )}
      <div className="challenge" onMouseOver={props.handleMouseOver}>
        {props.challenge}
      </div>
    </div>
  );
}

export default Challenge;
