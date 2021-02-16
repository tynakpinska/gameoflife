import React from "react";
import {warning} from "./Warning.module.css";

function Warning() {
  return (
    <div className={warning}>
        <p>
        Oooops... Something went wrong. Please try again.
        </p>
    </div>
  );
}

export default Warning;
