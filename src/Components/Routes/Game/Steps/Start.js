import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ChallengesList from "../ChallengesList";
import Timer from "../Timer";
import Loader from "../../../Visual/Loader";

const mapStateToProps = ({ isLoading }) => {
  return {
    isLoading: isLoading,
  };
};

const Start = props => {
  return props.isLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Let's do it!</h2>
      <ChallengesList />
      <Timer />
    </>
  );
};

Start.propTypes = {
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(Start);
