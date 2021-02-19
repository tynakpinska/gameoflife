import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ChallengesList from "../ChallengesList";
import Timer from "../Timer";
import Loader from "../../../Visual/Loader";

import { setLoading, setResult, setStep } from "../../../../redux/actions";

const mapStateToProps = ({ isLoading, user}) => {
  return { isLoading, user };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: loading => dispatch(setLoading(loading)),
    setResult: result => dispatch(setResult(result)),
    setStep: result => dispatch(setStep(result)),
  };
};

const Start = ({ isLoading, setLoading, setResult, setStep, user }) => {
  const [hours, setHours] = useState("--");
  const [minutes, setMinutes] = useState("--");
  const [seconds, setSeconds] = useState("--");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const interval = setInterval(() => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const left = tomorrow - today;
      setHours(
        Math.floor((left / (1000 * 60 * 60)) % 24) > 9
          ? Math.floor((left / (1000 * 60 * 60)) % 24)
          : `0${Math.floor((left / (1000 * 60 * 60)) % 24)}`
      );
      setMinutes(
        Math.floor((left / 1000 / 60) % 60) > 9
          ? Math.floor((left / 1000 / 60) % 60)
          : `0${Math.floor((left / 1000 / 60) % 60)}`
      );
      setSeconds(
        Math.floor((left / 1000) % 60) > 9
          ? Math.floor((left / 1000) % 60)
          : `0${Math.floor((left / 1000) % 60)}`
      );
      if (
        hours !== "--" &&
        minutes !== "--" &&
        seconds !== "--" &&
        isLoading === true
      )
        setLoading(false);
      if (hours === "00" && minutes === "00" && seconds === "00") {
        if (token && user.username) {
          const date = new Date(new Date() - 7200000);
          const dateStr = date.toISOString().slice(0, 10);
          fetch(`${process.env.REACT_APP_API_URL}/setResult`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
              "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
            },
            body: JSON.stringify({
              dateStr,
              result: "failure",
              username: user.username,
            }),
          })
            .then(resp => resp.json())
            .then(resp => {
              setResult("failure");
            })
            .catch(console.log);
        } else {
          setResult("failure");
        }

        setStep("end");
      }
    }, 1000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, [
    hours,
    minutes,
    seconds,
    setLoading,
    setResult,
    setStep,
    user,
    isLoading,
  ]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Let's do it!</h2>
      <ChallengesList />
      <Timer hours={hours} minutes={minutes} seconds={seconds} />
    </>
  );
};

Start.propTypes = {
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
