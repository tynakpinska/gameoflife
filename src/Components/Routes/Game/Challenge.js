import React, { useState } from "react";
import styles, {
  done,
  challElement,
  icons,
  fade,
} from "./Challenge.module.css";
import fist from "../../../img/fist.png";
import { connect } from "react-redux";

import {
  removeChallenge,
  toggleChallenge,
  editChallenge,
} from "../../../redux/actions";

const mapStateToProps = ({ step, user }) => {
  return { step, user };
};

const mapDispatchToProps = dispatch => {
  return {
    editChallenge: (chall, key) => dispatch(editChallenge(chall, key)),
    removeChallenge: key => dispatch(removeChallenge(key)),
    toggleChallenge: key => dispatch(toggleChallenge(key)),
  };
};

const Challenge = ({
  isDone,
  challenge,
  step,
  editChallenge,
  user,
  removeChallenge,
  toggleChallenge,
  id,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOnMouseOver = e => {
    if (step === "set") {
      e.target.classList[1] === "icon-trash"
        ? (e.target.style.color = "#FF5C00")
        : (e.target.style.color = "#FF9C64");
    } else {
      e.target.style.color = "#48DD00";
    }
  };

  const handleOnMouseLeave = e => {
    e.target.style.color = "inherit";
  };

  const handleEdit = e => {
    setIsEditable(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleEnter = e => {
    const challenge = inputValue;
    if (
      (e.key === "Enter" && challenge !== "") ||
      (e.target.classList[1] === "icon-ok" && challenge !== "")
    ) {
      editChallenge(challenge, id);
      setIsEditable(false);
    }
  };

  const handleChallClick = () => {
    if (step === "set") {
      removeChallenge(id);
    } else {
      if (user.username) {
        fetch("http://localhost:3000/toggleChallenge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            user,
            key: id,
          }),
        })
          .then(resp => resp.json())
          .then(resp => toggleChallenge(resp.key))
          .catch(err => console.log(err));
      } else {
        toggleChallenge(id);
      }
    }
  };

  return (
    <div className={isDone ? challElement + " " + done : challElement}>
      {isDone ? (
        <div className={styles.fist}>
          <img src={fist} alt="fist" />
        </div>
      ) : (
        <div></div>
      )}
      {step === "set" ? (
        isEditable ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "100%",
              margin: "auto",
            }}
          >
            <input
              className={styles.challenge}
              type="text"
              defaultValue={challenge}
              onKeyPress={handleEnter}
              onChange={handleInputChange}
              autoFocus
              aria-label="Challenge"
            ></input>
            <i
              onMouseOver={handleOnMouseOver}
              onMouseLeave={handleOnMouseLeave}
              onClick={handleEnter}
              className={"demo-icon icon-ok"}
            ></i>
          </div>
        ) : (
          <div className={styles.challenge}>
            {challenge}
            <div className={icons}>
              <i
                onMouseOver={handleOnMouseOver}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleEdit}
                className="demo-icon icon-pencil"
              ></i>
              <i
                onMouseOver={handleOnMouseOver}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleChallClick}
                className="demo-icon icon-trash"
              ></i>
            </div>
          </div>
        )
      ) : (
        <div
          className={isDone ? styles.challenge + " " + fade : styles.challenge}
        >
          {challenge}
          <div className={icons}>
            <i
              onMouseOver={handleOnMouseOver}
              onMouseLeave={handleOnMouseLeave}
              onClick={handleChallClick}
              className={isDone ? "demo-icon icon-ccw" : "demo-icon icon-ok"}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
