import React from "react";
import { connect } from "react-redux";
import styles from "./End.module.css";
import tiger from "./../../../../img/tiger.jpg";

const mapStateToProps = ({ user }) => {
  return { user };
};

const Success = ({ user }) => {
  const { username } = user;
  return (
    <div className={styles.end}>
      <h2>{username ? `${username}, you won today!` : "You won today!"}</h2>
      <p>Well done! Take a rest.</p>
      <div>
        <img src={tiger} alt="tiger" />
      </div>
      <p>See you tomorrow!</p>
    </div>
  );
};

export default connect(mapStateToProps, null)(Success);
