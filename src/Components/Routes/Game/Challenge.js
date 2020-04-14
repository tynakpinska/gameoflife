import React, { Component } from "react";
import fist from "../../../img/fist.png";

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
        ? (e.target.style.color = "red")
        : (e.target.style.color = "blue");
    } else {
      e.target.style.color = "green";
    }
  };

  handleOnMouseLeave = e => {
    e.target.style.color = "inherit";
  };

  handleEdit = e => {
    this.setState({ isEditable: true });
  };

  handleEnter = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.props.editChallenge(e.target.value);
      this.setState({ isEditable: false });
    }
  };

  render({ isDone, handleChallClick, challenge, step, id } = this.props) {
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
                  onClick={handleChallClick}
                  className="demo-icon icon-trash"
                ></i>
              </div>
            </div>
          )
        ) : (
          <div className="challenge">
            {challenge}
            <div className="icons">
              <i
                onMouseOver={this.handleOnMouseOver}
                onMouseLeave={this.handleOnMouseLeave}
                onClick={handleChallClick}
                className={isDone ? "" : "demo-icon icon-ok"}
              ></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Challenge;
