import React from "react";
import styles from "./Logo.module.css";

const Logo = props => {
  return (
    <div className={styles.logo}>
      <div className={styles.name}><h1 onClick={props.onClick}>Game of Life</h1></div>
    </div>
  );
};

export default Logo;
