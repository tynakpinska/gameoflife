import React, { useState } from "react";
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

import { setProfileImage, updateProfileImage } from "../../../redux/actions";

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    setProfileImage: (token, username, url) =>
      dispatch(setProfileImage(token, username, url)),
    updateProfileImage: (token, username, url) =>
      dispatch(updateProfileImage(token, username, url)),
  };
};

const Profile = props => {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageInput, setImageInput] = useState(false);
  const [userStreak, setUserStreak] = useState("5 days");
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
        <div className={`${part} ${streak}`} title="Click to see more stats">
          <h4>Streak</h4>
          <div className={text}>
            <p>{userStreak}</p>
          </div>
        </div>

        {goals.map(g => {
          return (
            <div
              className={`${part} ${g.className}`}
              title={`Click to edit goal in ${g.title} area`}
              key={g.className}
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
