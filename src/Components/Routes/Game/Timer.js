import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { timer, time } from "./Timer.module.css";

const Timer = ({ hours, minutes, seconds }) => {
  return (
    <p className={timer}>
      You've got{" "}
      <span className={time}>
        {hours} : {minutes} : {seconds}
      </span>{" "}
      left
    </p>
  );
};

Timer.propTypes = {
  hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default connect()(Timer);
