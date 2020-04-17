import React, { Component } from "react";
import { connect } from "react-redux";

import { setStep } from "../../../redux/actions"

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step))
  };
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftParts: {
        hours: "--",
        minutes: "--",
        seconds: "--"
      }
    };
  }

  componentDidMount() {
    this.interval = setInterval(({ leftParts } = this.state) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const left = tomorrow - today;
      this.setState({
        leftParts: {
          hours:
            Math.floor((left / (1000 * 60 * 60)) % 24) > 9
              ? Math.floor((left / (1000 * 60 * 60)) % 24)
              : `0${Math.floor((left / (1000 * 60 * 60)) % 24)}`,
          minutes:
            Math.floor((left / 1000 / 60) % 60) > 9
              ? Math.floor((left / 1000 / 60) % 60)
              : `0${Math.floor((left / 1000 / 60) % 60)}`,
          seconds:
            Math.floor((left / 1000) % 60) > 9
              ? Math.floor((left / 1000) % 60)
              : `0${Math.floor((left / 1000) % 60)}`
        }
      });
      if (
        leftParts.hours === "00" &&
        leftParts.minutes === "00" &&
        leftParts.seconds === "00"
      ) {
        this.props.setStep("end");
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render({ leftParts } = this.state) {
    return leftParts.hours !== "--" &&
      leftParts.minutes !== "--" &&
      leftParts.seconds ? (
      <p className="timer">
        You've got{" "}
        <span>
          {leftParts.hours} : {leftParts.minutes} : {leftParts.seconds}
        </span>{" "}
        left
      </p>
    ) : (
      <div></div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Timer);
