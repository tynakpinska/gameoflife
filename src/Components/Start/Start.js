import React from "react";
import Challenge from "../Challenge/Challenge";
import "./Start.css";

const Start = props => {
  setInterval(() => {
    const initDate = new Date();
    const initYear = initDate.getFullYear();
    const initMonth = `0${initDate.getMonth() + 1}`;
    const initDay = initDate.getDate();
    const nextDay = `${initYear}-${initMonth}-${initDay + 1}`;
    const nextDate = new Date(nextDay).setHours(0);
    const left = nextDate - initDate;
    const leftParts = {
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
      props.gettingTimeLeft(leftParts.hours, leftParts.minutes, leftParts.seconds);
  }, 1000);

  if (props.leftParts.hours === "00" && props.leftParts.minutes === "00" && props.leftParts.seconds === "00") {
    props.endingGame("end");
  }

  return (
    <div className="start">
      <h1>Let's do it!</h1>
      {props.challenges.map(c => (
        <Challenge challenge={c} key={c} onClick={props.handleDone(c)}/>
      ))}
      <p className="timer">
        You've got <span>{props.leftParts.hours} : {props.leftParts.minutes} : {props.leftParts.seconds}</span> left
      </p>
    </div>
  );
};

export default Start;
