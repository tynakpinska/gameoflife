import React, { Component } from "react";
import { connect } from "react-redux";
import {
  username,
  image,
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

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      newImageUrl: "",
      imageInput: false,
    };
  }

  handleImageUrlChange = e => {
    this.setState({ newImageUrl: e.target.value });
  };

  handleImageSubmit = () => {
    const { user, updateProfileImage, setProfileImage } = this.props;
    const { imageUrl, username } = user;
    const { newImageUrl } = this.state;
    const token = sessionStorage.getItem("token");
    if (newImageUrl) {
      imageUrl
        ? updateProfileImage(token, username, newImageUrl)
        : setProfileImage(token, username, newImageUrl);
      this.setState({ imageUrl: "", imageInput: false });
    }
  };

  render({ user } = this.props) {
    return (
      <>
        <h2 className={username}>{user.username}</h2>
        <img
          className={image}
          src={user.imageUrl || avatar}
          alt="avatar"
          onClick={() => this.setState({ imageInput: !this.state.imageInput })}
          title="Click to edit photo"
        />
        {this.state.imageInput ? (
          <>
            <label className={label} htmlFor="img">
              To change profile picture paste url below
            </label>
            <input
              type="url"
              id="img"
              name="img"
              placeholder="e.g. image.jpg"
              onChange={this.handleImageUrlChange}
              value={this.state.newImageUrl}
              className={input}
            />
            <i
              className={`demo-icon icon-upload ${i}`}
              onClick={this.handleImageSubmit}
            ></i>
          </>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
