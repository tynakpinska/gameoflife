import React from "react";
import styles from "./Goal.module.css";

const Goal = props => {
  return (
    <div>
      <h2>{props.area}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="current">Username</label>
        <input type="text" id="current" defaultValue={props.current}></input>
        <label htmlFor="goal">Username</label>
        <input type="text" id="goal" defaultValue={props.goal}></input>
        <button>Save</button>
      </form>
    </div>
  );
};

export default Goal;
