import React, { useState } from "react";
import styles, { footer, top, visible, button } from "./Footer.module.css";
import Slider from "./Slider/Slider";
import { CSSTransition } from "react-transition-group";

const Footer = () => {
  const [about, setAbout] = useState(false);

  const handleAboutClick = () => {
    about ? setAbout(false) : setAbout(true);
  };

  return (
    
    <CSSTransition
    in={about}
    timeout={{ enter: 1000, exit: 1000 }}
    classNames={{ ...styles }}
  >
    <div className={`${footer} ${about ? visible : null}`}>
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
        <button className={button} onClick={handleAboutClick}>
          {about ? <i className="demo-icon icon-down"></i> : ""}
          ABOUT
        </button>
      </div>
      <Slider/>
      
    </div>
      </CSSTransition>
  );
};

export default Footer;
