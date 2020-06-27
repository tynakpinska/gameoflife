import React, { useState } from "react";
import { connect } from "react-redux";
import {
  inputContainer,
  typeChall,
  addChallButton,
  start,
} from "./Set.module.css";

import { v4 as uuidv4 } from "uuid"; // create random keys
import ChallengesList from "../ChallengesList";

import {
  addChallenge,
  removeChallenge,
  setStep,
  editChallenge,
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
  };
};

const Set = ({ challenges, user, addChallenge, setStep }) => {
  const [startFailed, setStartFailed] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEnter = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      const challenge = e.target.value;
      const id = uuidv4();
      const date = new Date().toISOString().slice(0, 10);
      addChallenge(challenge, id, date);
      e.target.value = "";
      setStartFailed(false);
    }
  };

  const handleStartClick = e => {
    if (challenges.length) {
      setStep("start");
      if (user.username) {
        fetch("https://game-of-life-api.herokuapp.com/saveChallenges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
            "Access-Control-Allow-Origin":
              "https://game-of-life-front.herokuapp.com/",
          },
          body: JSON.stringify({
            user,
            challenges,
          }),
        })
          .then(resp => resp.json())
          .then(resp => console.log(resp))
          .catch(err => console.log(err, "Unable to save challenges"));
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
      document.querySelector(".Set_typeChall__1l0Vq").value = "";
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
      {startFailed ? (
        <p
          style={{
            color: "#3E0000",
          }}
        >
          Set challenges before starting the game!
        </p>
      ) : null}
      {challenges.length > 2 ? (
        <button className={start} onClick={handleStartClick}>
          Start the game!
        </button>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Set);
