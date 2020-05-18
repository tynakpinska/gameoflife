import React, { Component } from "react";
import { footer, top } from "./Footer.module.css";
import Slider from "./Slider";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      aboutDisplay: false,
    };
  }

  handleAboutClick = () => {
    this.state.aboutDisplay
      ? this.setState({ aboutDisplay: false })
      : this.setState({ aboutDisplay: true });
  };

  render() {
    const { aboutDisplay } = this.state;
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
          <button onClick={this.handleAboutClick}>
            {aboutDisplay ? <i className="demo-icon icon-down"></i> : ""}
            ABOUT
          </button>
        </div>

        {aboutDisplay ? <Slider /> : null}
      </div>
    );
  }
}

export default Footer;
