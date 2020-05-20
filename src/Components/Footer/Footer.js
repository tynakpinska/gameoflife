import React, { useState } from "react";
import { footer, top } from "./Footer.module.css";
import Slider from "./Slider/Slider";

const Footer = () => {
  const [aboutDisplay, setAboutDisplay] = useState(false);

  const handleAboutClick = () => {
    aboutDisplay ? setAboutDisplay(false) : setAboutDisplay(true);
  };

  return (
    <div className={footer}>
      <div className={top}>
        <p>
          2020 &copy; Tyna Kpińska
          <a
            href="https://github.com/tynakpinska"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <i className="demo-icon icon-github-circled"></i>
          </a>
        </p>
        <button onClick={handleAboutClick}>
          {aboutDisplay ? <i className="demo-icon icon-down"></i> : ""}
          ABOUT
        </button>
      </div>

      {aboutDisplay ? <Slider /> : null}
    </div>
  );
};

export default Footer;
