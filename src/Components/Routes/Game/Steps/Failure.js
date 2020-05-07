import React from "react";
import {connect} from "react-redux";
import styles from "./End.module.css";
import dog from "./../../../../img/dog.png";

const mapStateToProps = ({ user }) => {
  return {user};
};


const Failure = ({user}) => {
    const { username } = user;
    return (
      <div className={styles.end + " " + styles.failure}>
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

  export default connect(mapStateToProps, null)(Failure);
