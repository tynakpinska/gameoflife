import React from "react";
import fist from "../../../img/fist.png";

function Challenge({ isDone, handleChallClick, challenge, step } = this.props) {
  const handleOnMouseOver = e => {
    step === "set"
      ? (e.target.style.color = "red")
      : (e.target.style.color = "green");
  };

  const handleOnMouseLeave = e => {
    e.target.style.color = "inherit";
  };

  return (
    <div
      className={isDone ? "challElement done" : "challElement"}
    >
      {isDone ? (
        <div className="fist">
          <img src={fist} alt="fist" />
        </div>
      ) : (
        <div></div>
      )}
      <div className="challenge">
        {challenge}
        {step === "set" ? (
          <i
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
            onClick={handleChallClick}
            className="demo-icon icon-trash"
          ></i>
        ) : (
          <i
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
            onClick={handleChallClick}
            className="demo-icon icon-ok"
          ></i>
        )}
      </div>
    </div>
  );
}

export default Challenge;
