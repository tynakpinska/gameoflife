import React, { useState } from "react";
import { goalsForm } from "./Goal.module.css";

const Goal = ({ goal, setGoal, setCurrentGoalForm }) => {
  const [currentInput, setCurrentInput] = useState(goal.current);
  const [goalInput, setGoalInput] = useState(goal.goal);

  const handleInputChange = e => {
    e.target.name === "current"
      ? setCurrentInput(e.target.value)
      : setGoalInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setGoal({ ...goal, current: currentInput, goal: goalInput });
    setCurrentGoalForm(null);
  };
  return (
    <>
      <h2>{goal.title}</h2>
      <form className={goalsForm} onSubmit={handleSubmit}>
        <label htmlFor="current">Current state</label>
        <input
          name="current"
          type="text"
          defaultValue={currentInput}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="goal">Goal</label>
        <input
          name="goal"
          type="text"
          defaultValue={goalInput}
          onChange={handleInputChange}
        ></input>
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </>
  );
};

export default Goal;
