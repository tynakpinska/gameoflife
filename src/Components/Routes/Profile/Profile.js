import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Profile.module.css";
import avatar from "../../../img/user.png";

import { setProfileImage } from "../../../redux/actions";

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    setProfileImage: (token, username, url) =>
      dispatch(setProfileImage(token, username, url)),
  };
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
    };
  }

  handleImageUrlChange = e => {
    this.setState({ imageUrl: e.target.value });
  };

  handleImageSubmit = () => {
    const token = sessionStorage.getItem("token");
    this.props.setProfileImage(
      token,
      this.props.user.username,
      this.state.imageUrl
    );
    this.setState({imageUrl: ""})
  };

  render({ user } = this.props) {
    return (
      <div className={styles.profile}>
        <h2>{user.username}</h2>
        <img src={user.imageUrl || avatar} alt="avatar" />
        <label htmlFor="img">
          Change profile picture - paste picture url below
        </label>
        <div className={styles.changePic}>
          <input
            type="url"
            id="img"
            name="img"
            placeholder="e.g. shorturl.at/fwW02"
            onChange={this.handleImageUrlChange}
            value={this.state.imageUrl}
          />
          <i
            className="demo-icon icon-upload"
            onClick={this.handleImageSubmit}
          ></i>
        </div>
        <div>
          <h4>Streak</h4>
        </div>
        <div>
          <h4>State of mind</h4>
        </div>
        <div>
          <h4>Body shape</h4>
        </div>
        <div>
          <h4>Bank balance</h4>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
