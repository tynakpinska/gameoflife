import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import Success from "./Success";
import Failure from "./Failure";

const mapStateToProps = ({ result }) => {
  return {result};
};

const End = props => props.result === "success" ? <Success /> : <Failure />;

End.propTypes = {
  result: PropTypes.string
}

export default connect(mapStateToProps, null)(End);
