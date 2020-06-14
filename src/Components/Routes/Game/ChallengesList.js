import React, { useEffect } from "react";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import styles from "./ChallengesList.module.css";
import "simplebar/dist/simplebar.min.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Challenge from "./Challenge";

import { setStep, setResult } from "../../../redux/actions";

const mapStateToProps = ({ challenges, step }) => {
  return { challenges, step };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: step => dispatch(setStep(step)),
    setResult: result => dispatch(setResult(result)),
  };
};

const ChallengesList = ({ challenges, setResult, setStep }) => {
  useEffect(() => handleEndGame);

  const handleEndGame = () => {
    if (challenges[0]) {
      if (challenges.every(ch => ch.isDone)) {
        setResult("success");
        setStep("end");
      }
    }
  };

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
