import React from "react";

const Logo = props => {
  return (
    <div className="logo">
      <div className="name"><h1 onClick={props.onClick}>Game of Life</h1></div>
      <div className="dot1"></div>
      <div className="dot2"></div>
      <div className="dot3"></div>
    </div>
  );
};

export default Logo;
