import React, { Component } from "react";
import { connect } from "react-redux";
import Challenge from "../Challenge/Challenge";
import "./Start.css";

import { endTheGame } from "../../actions";

const mapStateToProps = state => {
  return {
    step: state.setStep.step,
    challenges: state.setChallenges.challenges
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endTheGame: end => dispatch(endTheGame(end))
  };
};

class Start extends Component {
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
    setInterval(({ leftParts } = this.state) => {
      const initDate = new Date();
      const initYear = initDate.getFullYear();
      const initMonth = `0${initDate.getMonth() + 1}`;
      const initDay = initDate.getDate();
      const nextDay = `${initYear}-${initMonth}-${initDay + 1}`;
      const nextDate = new Date(nextDay).setHours(0);
      const left = nextDate - initDate;
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
        this.props.endTheGame("end");
      }
    }, 1000);
  }

  handleDone = e => {
    this.props.handleDone(e.target.innerHTML)
  };


  render({ leftParts } = this.state) {
    return (
      <div className="start">
        <h1>Let's do it!</h1>
        {this.props.challenges.map(c => (
          <Challenge challenge={c} handleChallClick={this.handleDone}/>
        ))}
        <p className="timer">
          You've got{" "}
          <span>
            {leftParts.hours} : {leftParts.minutes} : {leftParts.seconds}
          </span>{" "}
          left
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start);
