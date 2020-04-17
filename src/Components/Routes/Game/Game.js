import React from "react";
import { connect } from "react-redux";

import Start from "./Steps/Start";
import Set from "./Steps/Set";
import End from "./Steps/End";

const mapStateToProps = ({ step }) => {
  return { step };
};

const Game = ({ step }) => {
  return step === "set" ? <Set /> : step === "start" ? <Start /> : <End />;
};

export default connect(mapStateToProps, null)(Game);
