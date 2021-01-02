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
  streakpart,
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
  getGoals
} from "../../../redux/actions";

const mapStateToProps = ({ user, streak, goals }) => {
  return { user, streak, goals };
};

const mapDispatchToProps = dispatch => {
  return {
    setProfileImage: (token, username, url) =>
      dispatch(setProfileImage(token, username, url)),
    updateProfileImage: (token, username, url) =>
      dispatch(updateProfileImage(token, username, url)),
    getStreak: (token, username) => dispatch(getStreak(token, username)),
    getGoals: (token, username) => dispatch(getGoals(token, username))
  };
};

const Profile = ({user, streak, goals, setProfileImage, updateProfileImage, getStreak, getGoals}) => {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageInput, setImageInput] = useState(false);
  const [currentGoalForm, setCurrentGoalForm] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getStreak(token, user.username);
    getGoals(token, user.username);
  }, [streak, getStreak, getGoals, user.username]);

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
      setCurrentGoalForm={setCurrentGoalForm}
      image={user.imageUrl || avatar}
    />
  ) : (
    <>
      <h2 className={username}>{user.username}</h2>
      <div
        className={image}
        style={{ backgroundImage: `url(${user.imageUrl || avatar})` }}
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
          className={`${part} ${streakpart}`}
          onClick={handlePartClick}
        >
          <h4>Streak</h4>
          <p className={text}>
            {streak} {streak === 1 ? "day" : "days"}
          </p>
        </div>

        {goals.map(g => {
          return (
            <div
              className={`${part} ${g.className}`}
              title={`Click to edit goal in ${g.title} area`}
              key={Math.random()}
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
