import React, { Component } from "react";
import fist from "../../../img/fist.png";
import { connect } from "react-redux";

import {
  removeChallenge,
  toggleChallenge,
  editChallenge,
  setStep,
  setResult
} from "../../../redux/actions";

const mapStateToProps = ({ step, user }) => {
  return { step, user };
};

const mapDispatchToProps = dispatch => {
  return {
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    toggleChallenge: key => dispatch(toggleChallenge(key)),
    setStep: step => dispatch(setStep(step)),
    setResult: result => dispatch(setResult(result))
  };
};

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    };
  }
  handleOnMouseOver = e => {
    if (this.props.step === "set") {
      e.target.classList[1] === "icon-trash"
        ? (e.target.style.color = "#FF5C00")
        : (e.target.style.color = "#FF9C64");
    } else {
      e.target.style.color = "#48DD00";
    }
  };

  handleOnMouseLeave = e => {
    e.target.style.color = "inherit";
  };

  handleEdit = e => {
    this.setState({ isEditable: true });
  };

  handleEnter = (e, { user, id } = this.props) => {
    if (e.key === "Enter" && e.target.value !== "") {
      if (user.username) {
        fetch("http://localhost:3000/editChallenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user,
            changedChallenge: e.target.value,
            key: id,
          }),
        })
          .then(resp => resp.json())
          .then(resp => console.log(resp))
          .catch(err => console.log(err));
      }

      this.props.editChallenge(e.target.value, id);
      this.setState({ isEditable: false });
    }
  };

  handleChallClick = async (e, { user, challenges, id } = this.props) => {
    if (this.props.step === "set") {
      this.props.removeChallenge(id);
      if (user.username) {
        fetch("http://localhost:3000/removeChallenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user,
            key: id,
          }),
        })
          .then(resp => resp.json())
          .then(resp => console.log(resp))
          .catch(err => console.log(err));
      }
    } else {
     if (user.username) {
       fetch("http://localhost:3000/toggleChallenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user,
            key: id,
          }),
        })
          .then(resp => resp.json())
          .then(resp => console.log(resp))
          .catch(err => console.log(err));
        }

      await this.props.toggleChallenge(id);
      if (this.props.challenges.every(ch => ch.isDone)) {
        setTimeout(() => {
          this.props.setResult("success");
          this.props.setStep("end");
        }, 1000);
      }
    }
  };

  render({ isDone, challenge, step } = this.props) {
    return (
      <div className={isDone ? "challElement done" : "challElement"}>
        {isDone ? (
          <div className="fist">
            <img src={fist} alt="fist" />
          </div>
        ) : (
          <div></div>
        )}
        {step === "set" ? (
          this.state.isEditable ? (
            <div className="challenge">
              <input
                type="text"
                defaultValue={challenge}
                onKeyPress={this.handleEnter}
                autoFocus
              ></input>
            </div>
          ) : (
            <div className="challenge">
              {challenge}
              <div className="icons">
                <i
                  onMouseOver={this.handleOnMouseOver}
                  onMouseLeave={this.handleOnMouseLeave}
                  onClick={this.handleEdit}
                  className="demo-icon icon-pencil"
                ></i>
                <i
                  onMouseOver={this.handleOnMouseOver}
                  onMouseLeave={this.handleOnMouseLeave}
                  onClick={this.handleChallClick}
                  className="demo-icon icon-trash"
                ></i>
              </div>
            </div>
          )
        ) : (
          <div className={isDone ? "challenge fade" : "challenge"}>
            {challenge}
            <div className="icons">
              <i
                onMouseOver={this.handleOnMouseOver}
                onMouseLeave={this.handleOnMouseLeave}
                onClick={this.handleChallClick}
                className={isDone ? "demo-icon icon-ccw" : "demo-icon icon-ok"}
              ></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
