import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Goal from "./Goal/Goal";
import {
  username,
  image,
  form,
  label,
  input,
  cancel,
  i,
  parts,
  part,
  streak,
  state,
  body,
  bank,
  span,
  text,
} from "./Profile.module.css";
import avatar from "../../../img/user.png";

import {
  setProfileImage,
  updateProfileImage,
  getStreak,
} from "../../../redux/actions";

const mapStateToProps = ({ user, streak }) => {
  return { user, streak };
};

const mapDispatchToProps = dispatch => {
  return {
    setProfileImage: (token, username, url) =>
      dispatch(setProfileImage(token, username, url)),
    updateProfileImage: (token, username, url) =>
      dispatch(updateProfileImage(token, username, url)),
    getStreak: (token, username) => dispatch(getStreak(token, username)),
  };
};

const Profile = props => {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageInput, setImageInput] = useState(false);
  const [currentGoalForm, setCurrentGoalForm] = useState(null);
  const [goal0, setGoal0] = useState({
    title: "State of mind",
    current: "anxious",
    goal: "stoic",
    className: state,
  });
  const [goal1, setGoal1] = useState({
    title: "Body shape",
    current: "BMI 27",
    goal: "BMI 20",
    className: body,
  });
  const [goal2, setGoal2] = useState({
    title: "Bank balance",
    current: "income 3000$",
    goal: "income 10000$",
    className: bank,
  });
  const goals = [goal0, goal1, goal2];
  const setGoals = [setGoal0, setGoal1, setGoal2];

  useEffect(({ getStreak, user } = props) => {
    const token = sessionStorage.getItem("token");
    getStreak(token, user.username);
  }, []);

  const handlePartClick = e => {
    switch (e.currentTarget.classList[1]) {
      case state:
        setCurrentGoalForm(0);
        return;
      case body:
        setCurrentGoalForm(1);
        return;
      case bank:
        setCurrentGoalForm(2);
        return;
      default:
        setCurrentGoalForm(null);
    }
  };

  const handleImageUrlChange = e => {
    setNewImageUrl(e.target.value);
  };

  const handleImageSubmit = e => {
    e.preventDefault();
    const { user, updateProfileImage, setProfileImage } = props;
    const { imageUrl, username } = user;
    const token = sessionStorage.getItem("token");
    if (newImageUrl) {
      imageUrl
        ? updateProfileImage(token, username, newImageUrl)
        : setProfileImage(token, username, newImageUrl);
      setNewImageUrl("");
      setImageInput(false);
    }
  };

  return currentGoalForm !== null ? (
    <Goal
      goal={goals[currentGoalForm]}
      setGoal={setGoals[currentGoalForm]}
      setCurrentGoalForm={setCurrentGoalForm}
    />
  ) : (
    <>
      <h2 className={username}>{props.user.username}</h2>
      <div
        className={image}
        style={{ backgroundImage: `url(${props.user.imageUrl || avatar})` }}
        alt="avatar"
        onClick={() => setImageInput(!imageInput)}
        title="Click to edit photo"
      />
      {imageInput ? (
        <form className={form} onSubmit={handleImageSubmit}>
          <i
            className={`demo-icon icon-cancel ${cancel}`}
            onClick={() => setImageInput(!imageInput)}
          ></i>
          <label className={label} htmlFor="img">
            Paste image url
          </label>
          <input
            type="url"
            id="img"
            name="img"
            placeholder="e.g. image.jpg"
            onChange={handleImageUrlChange}
            value={newImageUrl}
            className={input}
          />
          <i
            className={`demo-icon icon-upload ${i}`}
            onClick={handleImageSubmit}
          ></i>
        </form>
      ) : null}
      <div className={parts}>
        <div
          className={`${part} ${streak}`}
          title="Click to see more stats"
          onClick={handlePartClick}
        >
          <h4>Streak</h4>
          <p className={text}>
            {props.streak} {props.streak === 1 ? "day" : "days"}
          </p>
        </div>

        {goals.map(g => {
          return (
            <div
              className={`${part} ${g.className}`}
              title={`Click to edit goal in ${g.title} area`}
              key={g.className}
              onClick={handlePartClick}
            >
              <h4>{g.title}</h4>
              <div className={text}>
                <p>{g.current}</p>
                <span className={span}>Goal:</span> {g.goal}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
