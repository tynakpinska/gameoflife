import React from "react";
import { connect } from "react-redux";

import ChallengesList from "../ChallengesList";
import Timer from "../Timer";
import Loader from '../../../Visual/Loader';


const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
  };
};


const Start = props => {
    return props.isLoading? <Loader /> : (
      <>
        <h2>Let's do it!</h2>
        <ChallengesList />
        <Timer />
      </>
    );
}

export default connect(mapStateToProps)(Start);