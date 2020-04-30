import React from "react";

const Logo = props => {
  return (
    <div className="logo">
      <h1 onClick={props.onClick}>Game of Life</h1>
    </div>
  );
};

export default Logo;
