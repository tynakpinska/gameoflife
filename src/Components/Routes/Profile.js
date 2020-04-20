import React, { Component } from "react";
import { connect } from "react-redux";
import avatar from "../../img/user.png";

const mapStateToProps = ({user}) => {
  return {user};
};

class Profile extends Component {
  render({user} = this.props) {
    return (
      <div className="container profile">
        <h1>{user.username}</h1>
        <img src={avatar} alt="avatar" />
        <p>Change profile image</p>
        <div><h4>Streak</h4></div>
        <div><h4>State of mind</h4></div>
        <div><h4>Body shape</h4></div>
        <div><h4>Bank balance</h4></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(Profile);
