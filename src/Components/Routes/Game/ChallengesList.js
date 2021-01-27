import React from "react";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import styles from "./ChallengesList.module.css";
import "simplebar/dist/simplebar.min.css";
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
    <SimpleBar
      style={{
        maxHeight: "55%",
        width: "80%",
        margin: "auto",
      }}
    >
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
    </SimpleBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesList);
