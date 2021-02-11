import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {end, failure} from "./End.module.css";
import dog from "./../../../../img/dog.png";

const mapStateToProps = ({ user }) => {
  return {user};
};


const Failure = ({user}) => {
    const { username } = user;
    return (
      <div className={end + " " + failure}>
        <h2>
            {username
              ? `${username}, you lost today!`
              : "You lost today!"}
          </h2>
        <div><img src={dog} alt="dog" /></div>
        <p>Try harder tommorow!</p>
        <p>See you then!</p>
      </div>
    );
  }

  Failure.propTypes = {
    user: PropTypes.exact({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      joined: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  }

  export default connect(mapStateToProps, null)(Failure);
