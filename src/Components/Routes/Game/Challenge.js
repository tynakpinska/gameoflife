import React, { useState } from "react";
import styles, {
  done,
  challElement,
  icons,
  fade,
} from "./Challenge.module.css";
import fist from "../../../img/fist.png";
import lightFist from "../../../img/fist-light.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    toggleChallenge: (key, token, username) =>
      dispatch(toggleChallenge(key, token, username)),
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
    const token = sessionStorage.getItem("token");
    if (step === "set") {
      removeChallenge(id);
    } else {
      if (user.username) {
        fetch(`${process.env.REACT_APP_API_URL}/toggleChallenge`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            user,
            key: id,
          }),
        })
          .then(resp => resp.json())
          .then(resp => toggleChallenge(resp.key, token, user.username))
          .catch(err => console.log(err));
      } else {
        toggleChallenge(id, token, user.username);
      }
    }
  };

  return (
    <div className={isDone ? challElement + " " + done : challElement}>
      {step === "set" ? (
        isEditable ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "100%"
            }}
          >
            <div style={{margin: "auto", visibility: "hidden"}}></div>
            <input
              className={styles.challenge}
              type="text"
              defaultValue={challenge}
              onKeyPress={handleEnter}
              onChange={handleInputChange}
              autoFocus
              aria-label="Challenge"
            ></input>
            <i className={"demo-icon icon-ok"} onClick={handleEnter} style={{marginRight: "auto"}} ></i>
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
        <>
          <div
            className={styles.fist}
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
            onClick={handleChallClick}
            style={isDone ? { borderRight: 0 } : null}
          >
            {isDone ? (
              <img
                src={window.innerWidth > "850" ? fist : lightFist}
                alt="fist"
              />
            ) : null}
          </div>
          <div
            className={
              isDone ? styles.challenge + " " + fade : styles.challenge
            }
          >
            {challenge}
          </div>
        </>
      )}
    </div>
  );
};

Challenge.propTypes = {
  step: PropTypes.string,
  user: PropTypes.exact({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    joined: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  removeChallenge: PropTypes.func,
  toggleChallenge: PropTypes.func,
  editChallenge: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
