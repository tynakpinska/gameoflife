import React from "react";
import {connect} from "react-redux";
import dog from "./../../../../img/dog.png";

const mapStateToProps = ({ user }) => {
  return {user};
};


const Failure = ({user}) => {
    const { username } = user;
    return (
      <div className="end failure">
        <h2>
            {username
              ? `${username}, you lost today!`
              : "You lost today!"}
          </h2>
        <p>Try harder tommorow!</p>
        <img src={dog} alt="dog" />
        <p>See you then!</p>
      </div>
    );
  }

  export default connect(mapStateToProps, null)(Failure);
