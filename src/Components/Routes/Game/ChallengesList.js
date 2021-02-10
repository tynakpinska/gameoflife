import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ChallengesList.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Challenge from "./Challenge";

import { setStep, setResult, setLoading } from "../../../redux/actions";

const mapStateToProps = ({ challenges, step, user }) => {
  return { challenges, step, user };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    setResult: result => dispatch(setResult(result)),
    setLoading: loading => dispatch(setLoading(loading)),
  };
};

const ChallengesList = ({ challenges }) => {
  return (
    <TransitionGroup>
      {challenges.map(c => (
        <CSSTransition
          key={c.key}
          timeout={{ enter: 1000, exit: 1000 }}
          classNames={{ ...styles }}
        >
          <Challenge
            challenge={c.challenge}
            key={c.key}
            id={c.key}
            isDone={c.isDone}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ChallengesList.propTypes = {
  challenges: PropTypes.array,
  step: PropTypes.string,
  user: PropTypes.object,
  setStep: PropTypes.func,
  setResult: PropTypes.func,
  setLoading: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesList);
