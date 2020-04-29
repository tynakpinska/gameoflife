import React, { Component } from "react";
import { connect } from "react-redux";

import Challenge from "./Challenge";

const mapStateToProps = ({ challenges }) => {
  return { challenges };
};

class ChallengesList extends Component {
  render({ challenges } = this.props) {
    return challenges.map(c => (
      <Challenge
        challenge={c.challenge}
        key={c.key}
        id={c.key}
        isDone={c.isDone}
      />
    ));
  }
}

export default connect(mapStateToProps, null)(ChallengesList);
