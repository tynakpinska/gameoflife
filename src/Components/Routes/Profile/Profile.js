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
  const [userStreak, setUserStreak] = useState("");
  const [mindCurrent, setMindCurrent] = useState("anxious");
  const [mindGoal, setMindGoal] = useState("stoic");
  const [bodyCurrent, setBodyCurrent] = useState("BMI 27");
  const [bodyGoal, setBodyGoal] = useState("BMI 20");
  const [bankCurrent, setBankCurrent] = useState("income 3000$");
  const [bankGoal, setBankGoal] = useState("income 10000$");

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
        style={{backgroundImage: `url(${props.user.imageUrl || avatar})`}}
        alt="avatar"
        onClick={() => setImageInput(!imageInput)}
        title="Click to edit photo"
      />
      {imageInput ? (
        <form className={form} onSubmit={handleImageSubmit}>
          <label className={label} htmlFor="img">
            To change profile picture paste url below
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
        </div>
        <div
          className={`${part} ${state}`}
          title="Click to edit goal in State of mind area"
        >
          <h4>State of mind</h4>
        </div>
        <div
          className={`${part} ${body}`}
          title="Click to edit goal in Body shape area"
        >
          <h4>Body shape</h4>
        </div>
        <div
          className={`${part} ${bank}`}
          title="Click to edit goal in Bank balance area"
        >
          <h4>Bank balance</h4>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
