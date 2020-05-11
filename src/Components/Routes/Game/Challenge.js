import React, { Component } from "react";
import styles from "./Challenge.module.css";
import fist from "../../../img/fist.png";
import { connect } from "react-redux";

import {
  removeChallenge,
  toggleChallenge,
  editChallenge,
  setStep,
  setResult,
} from "../../../redux/actions";

const mapStateToProps = ({ step, user, challenges }) => {
  return { step, user, challenges };
};

const mapDispatchToProps = dispatch => {
  return {
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    toggleChallenge: key => dispatch(toggleChallenge(key)),
    setStep: step => dispatch(setStep(step)),
    setResult: result => dispatch(setResult(result)),
  };
};

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      inputValue: "",
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

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleEnter = (e, { user, id } = this.props) => {
    const challenge = this.state.inputValue;
    if (
      (e.key === "Enter" && challenge !== "") ||
      (e.target.classList[1] === "icon-ok" && challenge !== "")
    ) {
      this.props.editChallenge(challenge, id);
      this.setState({ isEditable: false });
    }
  };

  handleChallClick = (
    e,
    { user, step, removeChallenge, toggleChallenge, id } = this.props
  ) => {
    if (step === "set") {
      removeChallenge(id);
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
      toggleChallenge(id);
    }
  };

  componentDidUpdate() {
    if (this.props.challenges.every(ch => ch.isDone)) {
      setTimeout(() => {
        this.props.setResult("success");
        this.props.setStep("end");
      }, 1000);
    }
  }

  render({ isDone, challenge, step } = this.props) {
    return (
      <div
        className={
          isDone ? styles.challElement + " " + styles.done : styles.challElement
        }
      >
        {isDone ? (
          <div className={styles.fist}>
            <img src={fist} alt="fist" />
          </div>
        ) : (
          <div></div>
        )}
        {step === "set" ? (
          this.state.isEditable ? (
            <div
              style={{ display: "flex", alignItems: "center", minWidth: "100%", margin: 'auto'}}
            >
              <input
                className={styles.challenge}
                type="text"
                defaultValue={challenge}
                onKeyPress={this.handleEnter}
                onChange={this.handleInputChange}
                autoFocus
                aria-label="Challenge"
              ></input>
              <i
                onMouseOver={this.handleOnMouseOver}
                onMouseLeave={this.handleOnMouseLeave}
                onClick={this.handleEnter}
                className={"demo-icon icon-ok"}
              ></i>
            </div>
          ) : (
            <div className={styles.challenge}>
              {challenge}
              <div className={styles.icons}>
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
          <div
            className={
              isDone ? styles.challenge + " " + styles.fade : styles.challenge
            }
          >
            {challenge}
            <div className={styles.icons}>
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
