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
        challenge={c.name}
        key={c.key}
        id={c.key}
        isDone={c.isDone}
        challenges={challenges}
      />
    ));
  }
}

export default connect(mapStateToProps, null)(ChallengesList);
