import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { timer, time } from "./Timer.module.css";

import { setStep, setResult } from "../../../redux/actions";

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    setResult: (result, token, username) =>
      dispatch(setResult(result, token, username)),
  };
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftParts: {
        hours: "--",
        minutes: "--",
        seconds: "--",
      },
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token");
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
              : `0${Math.floor((left / 1000) % 60)}`,
        },
      });
      if (
        leftParts.hours === "00" &&
        leftParts.minutes === "00" &&
        leftParts.seconds === "00"
      ) {
        this.props.setResult("failure", token, this.props.user.username);
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
      <p className={timer}>
        You've got{" "}
        <span className={time}>
          {leftParts.hours} : {leftParts.minutes} : {leftParts.seconds}
        </span>{" "}
        left
      </p>
    ) : (
      <div></div>
    );
  }
}

Timer.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    joined: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  setStep: PropTypes.func,
  setResult: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
