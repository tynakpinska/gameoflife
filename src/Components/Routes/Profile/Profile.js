import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  username,
  image,
  form,
  label,
  input,
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
  const [goals, setGoals] = useState([
    {
      title: "State of mind",
      current: "anxious",
      goal: "stoic",
      className: state,
    },
    {
      title: "Body shape",
      current: "BMI 27",
      goal: "BMI 20",
      className: body,
    },
    {
      title: "Bank balance",
      current: "income 3000$",
      goal: "income 10000$",
      className: bank,
    },
  ]);
  useEffect(({getStreak, user} = props) => {
    const token = sessionStorage.getItem("token");
    getStreak(token, user.username);
  }, []);

  const handlePartClick = e => {
    switch (e.currentTarget.classList[1]) {
      case streak:
        return console.log("streak");
      case state:
        return console.log("mind");
      case body:
        return console.log("body");
      case bank:
        return console.log("bank");
      default:
        console.log("default");
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

  return (
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
          <div className={text}>
            <p>{props.streak} days</p>
          </div>
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
                <p>
                  <span className={span}>Goal:</span> {g.goal}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
