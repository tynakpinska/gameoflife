import React from "react";
import {connect} from "react-redux";
import tiger from "./../../../../img/tiger.jpg";

const mapStateToProps = ({ user }) => {
  return {user};
};

const End = ({user}) => {
  const { username } = user;
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

export default connect(mapStateToProps, null)(End);
