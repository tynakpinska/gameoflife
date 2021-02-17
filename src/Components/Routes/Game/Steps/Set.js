import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  inputContainer,
  typeChall,
  addChallButton,
  start,
  error,
} from "./Set.module.css";

import { v4 as uuidv4 } from "uuid"; // create random keys
import ChallengesList from "../ChallengesList";

import {
  addChallenge,
  removeChallenge,
  setStep,
  editChallenge,
  saveChallenges,
} from "../../../../redux/actions";

const mapStateToProps = ({ challenges, step, route, user }) => {
  return {
    route,
    step,
    challenges,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChallenge: (chall, key, date) =>
      dispatch(addChallenge(chall, key, date)),
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    setStep: step => dispatch(setStep(step)),
    saveChallenges: (user, challenges) => dispatch(saveChallenges(user, challenges))
  };
};

const Set = ({ challenges, user, addChallenge, setStep, saveChallenges }) => {
  const [startFailed, setStartFailed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tooMuchChallenges, setTooMuchChallenges] = useState(false);

  const handleEnter = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      const newChallenges = e.target.value.split(",");
      const date = new Date().toISOString().slice(0, 10);

      if (newChallenges.length + challenges.length > 5) {
        setTooMuchChallenges(true);
        setStartFailed(false);
      } else {
        newChallenges.forEach(challenge => {
          const id = uuidv4();
          addChallenge(challenge, id, date);
          setTooMuchChallenges(false);
          setStartFailed(false);
        });
        e.target.value = "";
        setStartFailed(false);
      }
    }
  };

  const handleStartClick = e => {
    if (challenges.length) {
      setStep("start");
      if (user.username) {
        saveChallenges(user, challenges);
      }
    } else {
      setStartFailed(true);
    }
  };

  const handleOnMouseOver = e => {
    e.target.style.color = "orange";
  };

  const handleOnMouseLeave = e => {
    e.target.style.color = "inherit";
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = e => {
    const challenge = inputValue;
    if (challenge !== "") {
      const id = uuidv4();
      addChallenge(challenge, id);
      document.querySelector(".Set_typeChall__1cuRv").value = "";
    }
  };

  return (
    <>
      {user.username ? (
        <h2>
          {user.username}, <br /> what are you playing today?
        </h2>
      ) : (
        <h2>What are you playing today?</h2>
      )}
      {challenges.length < 5 ? (
        <div className={inputContainer}>
          <input
            className={typeChall}
            type="text"
            placeholder="e.g. learn javascript"
            onKeyUp={handleEnter}
            onChange={handleInputChange}
            aria-label="Challenge"
          ></input>
          <i
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
            onClick={handleButtonClick}
            className={addChallButton + " demo-icon icon-plus-circled"}
          ></i>
        </div>
      ) : null}
      <ChallengesList />
      <p className={error}>
        {startFailed
          ? "Set at least 3 challenges before starting the game!"
          : tooMuchChallenges
          ? "You've set too much challenges! The limit is 5."
          : null}
      </p>

      {challenges.length > 2 ? (
        <button className={start} onClick={handleStartClick}>
          Start the game!
        </button>
      ) : null}
    </>
  );
};

Set.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object),
  step: PropTypes.string,
  route: PropTypes.string,
  user: PropTypes.object,
  addChalleng: PropTypes.func,
  removeChallenge: PropTypes.func,
  setStep: PropTypes.func,
  editChallenge: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Set);
