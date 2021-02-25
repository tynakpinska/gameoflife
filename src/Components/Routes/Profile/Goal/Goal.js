import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles, { goalsForm, buttons, title } from "./Goal.module.css";

import { setGoal } from "../../../../redux/actions";

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    setGoal: (token, username, goal) =>
      dispatch(setGoal(token, username, goal)),
  };
};

const Goal = ({ goal, user, setGoal, setCurrentGoalForm, image }) => {
  const [currentInput, setCurrentInput] = useState(goal.current);
  const [goalInput, setGoalInput] = useState(goal.goal);

  const currentRef = useRef(null);
  const goalRef = useRef(null);
  const submitRef = useRef(null);

  const handleInputChange = e => {
    e.target.name === "current"
      ? setCurrentInput(e.target.value)
      : setGoalInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (document.activeElement.type === "submit") {
      const token = sessionStorage.getItem("token");
      setGoal(token, user.username, {
        ...goal,
        current: currentInput,
        goal: goalInput,
      });
      setCurrentGoalForm(null);
    }
  };

  const handleCancel = () => {
    setCurrentGoalForm(null);
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      console.log("enter");
      if (e.target.name === "current") {
        goalRef.current.focus();
      } else if (e.target.name === "goal") {
        submitRef.current.focus();
      }
    }
  };

  return (
    <>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
        alt="avatar"
      />
      <h2 className={title}>{goal.title}</h2>
      <form className={goalsForm} onSubmit={handleSubmit}>
        <label htmlFor="current">Current state</label>
        <input
          name="current"
          type="text"
          defaultValue={currentInput}
          onChange={handleInputChange}
          maxLength="10"
          ref={currentRef}
          onKeyUp={handleEnter}
          autoFocus
        ></input>
        <label htmlFor="goal">Goal</label>
        <input
          name="goal"
          type="text"
          defaultValue={goalInput}
          onChange={handleInputChange}
          maxLength="10"
          ref={goalRef}
          onKeyUp={handleEnter}
        ></input>
        <div className={buttons}>
          <button ref={submitRef}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
};

Goal.propTypes = {
  user: PropTypes.object,
  setGoal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
