import React from "react";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import Challenge from "./Challenge";

const mapStateToProps = ({ challenges }) => {
  return { challenges };
};

const ChallengesList = ({ challenges }) => {
  return (
    <SimpleBar
      style={{
        maxHeight: "55%",
        width: "80%",
        scrollbarColor: "#9b3800",
        margin: "auto",
      }}
    >
      {challenges.map(c => (
        <Challenge
          challenge={c.challenge}
          key={c.key}
          id={c.key}
          isDone={c.isDone}
        />
      ))}
    </SimpleBar>
  );
};

export default connect(mapStateToProps, null)(ChallengesList);
