import React from "react";
import {connect} from "react-redux";

import Success from "./Success";
import Failure from "./Failure";

const mapStateToProps = ({ result }) => {
  return {result};
};

const End = props => {
  return (
    <div className="container">
      {props.result === "success" ? <Success /> : <Failure />}
    </div>
  );
}

export default connect(mapStateToProps, null)(End);
