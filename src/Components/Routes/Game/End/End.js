import React from "react";
import "./End.css";
import tiger from "./../../../../img/tiger.jpg";

function End(props) {
  return (
    <div className="end">
      <p>You won today!</p>
      <p>Well done!</p>
      <p>Take a rest.</p>
      <img src={tiger} alt="tiger" />
      <p>See you tomorrow!</p>
    </div>
  );
}

export default End;
