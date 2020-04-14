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
    console.log(e.target.parentNode.previousSibling);
    this.setState({ isEditable: true });
  };

  render({ isDone, handleChallClick, challenge, step } = this.props) {
    return (
      <div className={isDone ? "challElement done" : "challElement"}>
        {isDone ? (
          <div className="fist">
            <img src={fist} alt="fist" />
          </div>
        ) : (
          <div></div>
        )}
        <div className="challenge">
          {this.state.isEditable ? <input type="text"></input> : `${challenge}`}
          {step === "set" ? (
            <div>
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
          ) : (
            <i
              onMouseOver={this.handleOnMouseOver}
              onMouseLeave={this.handleOnMouseLeave}
              onClick={handleChallClick}
              className={isDone ? "" : "demo-icon icon-ok"}
            ></i>
          )}
        </div>
      </div>
    );
  }
}

export default Challenge;
