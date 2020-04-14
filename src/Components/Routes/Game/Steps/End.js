import React from "react";
import tiger from "./../../../../img/tiger.jpg";

function End(props) {
  const { username } = props.user;
  return (
    <div className="container end">
      <h1>
          {username
            ? `${username}, you won today!`
            : "You won today!"}
        </h1>
      <p>Well done!</p>
      <p>Take a rest.</p>
      <img src={tiger} alt="tiger" />
      <p>See you tomorrow!</p>
    </div>
  );
}

export default End;
