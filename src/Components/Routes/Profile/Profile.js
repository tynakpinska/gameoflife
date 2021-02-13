import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Goal from "./Goal/Goal";
import {
  username,
  image,
  label,
  inputLabel,
  input,
  icon,
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
  getGoals,
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
    getGoals: (token, username) => dispatch(getGoals(token, username)),
  };
};

const Profile = ({
  user,
  streak,
  goals,
  setProfileImage,
  updateProfileImage,
  getStreak,
  getGoals,
}) => {
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

  const CLOUDINARY_UPLOAD_PRESET = "pgk0nz6q";
  const CLOUDINARY_UPLOAD_URL =
    "https://api.cloudinary.com/v1_1/tynnacloud/upload";

  const uploadImage = image => {
    const { imageUrl, username } = user;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const options = {
      method: "POST",
      body: formData,
    };
    fetch(CLOUDINARY_UPLOAD_URL, options)
      .then(res => res.json())
      .then(res => {
        const token = sessionStorage.getItem("token");
        imageUrl
          ? updateProfileImage(token, username, res.secure_url)
          : setProfileImage(token, username, res.secure_url);
      })
      .catch(err => console.log(err));
  };

  const readFile = image => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  };

  const handleChange = e => {
    const image = e.target.files[0];
    readFile(image);
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
        title="Click to edit photo"
      />

      <label htmlFor="upload" className={inputLabel}>
        <i className={`demo-icon icon-upload ${icon}`}></i>
        <input
          id="upload"
          type="file"
          accept="image/png, image/jpeg"
          hidden
          onChange={handleChange}
        />
      </label>

      <div className={parts}>
        <div className={`${part} ${streakpart}`} onClick={handlePartClick}>
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

Profile.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    joined: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  streak: PropTypes.number,
  goals: PropTypes.arrayOf(PropTypes.object),
  setProfileImage: PropTypes.func,
  updateProfileImage: PropTypes.func,
  getStreak: PropTypes.func,
  getGoals: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
