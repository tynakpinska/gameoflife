import React, { useState } from "react";
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

  const handleInputChange = e => {
    e.target.name === "current"
      ? setCurrentInput(e.target.value)
      : setGoalInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    setGoal(token, user.username, {
      ...goal,
      current: currentInput,
      goal: goalInput,
    });
    setCurrentGoalForm(null);
  };

  const handleCancel = () => {
    setCurrentGoalForm(null);
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
        ></input>
        <label htmlFor="goal">Goal</label>
        <input
          name="goal"
          type="text"
          defaultValue={goalInput}
          onChange={handleInputChange}
          maxLength="10"
        ></input>
        <div className={buttons}>
          <button>Save</button>
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
