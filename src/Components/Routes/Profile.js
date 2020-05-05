import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Profile.module.css";
import avatar from "../../img/user.png";

const mapStateToProps = ({ user }) => {
  return { user };
};

class Profile extends Component {
  render({ user } = this.props) {
    return (
      <div className={"container " + styles.profile}>
        <h2>{user.username}</h2>
        <img src={avatar} alt="avatar" />
        <label htmlFor="img"><i className="demo-icon icon-upload"></i>Change profile picture</label>
        <input type="file" id="img" name="img" accept="image/*" />
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

export default connect(mapStateToProps, {})(Profile);
