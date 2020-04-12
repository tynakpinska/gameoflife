import React from "react";
import fist from "../../../img/fist.png";

function Challenge({ isDone, handleChallClick, handleMouseOver, challenge } = this.props) {
  return (
    <div className={isDone? "challElement done" : "challElement"} onClick={handleChallClick}>
      {isDone ? (
        <div className="fist">
          <img src={fist} alt="fist" />
        </div>
      ) : (
        <div></div>
      )}
      <div className="challenge" onMouseOver={handleMouseOver}>
        {challenge}
      </div>
    </div>
  );
}

export default Challenge;
