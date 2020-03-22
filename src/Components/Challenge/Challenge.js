import React from "react";
import "./Challenge.css";

function Challenge(props) {
    return (
        <div className="challenge">
            <p>{props.challenge}</p>
        </div>
    )
}

export default Challenge;