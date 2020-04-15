import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
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
    return (
      <div className="footer">
        <div className="top">
          <p>
            2020 &copy; Tyna Kpińska
            <a
              href="https://github.com/tynakpinska"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="demo-icon icon-github-circled"></i>
            </a>
          </p>
          <button onClick={this.handleAboutClick}>
            {this.state.aboutDisplay ? (
              <i className="demo-icon icon-down"></i>
            ) : (
              ""
            )}
            ABOUT
          </button>
        </div>

        <div className={this.state.aboutDisplay ? "info" : "info hide"}>
          <p>
            The goal of this app is to help you achieve success by motivating
            you to do something small, that closes you to fulfilling your
            dreams, each day. It was inspired by{" "}
            <a
              href="https://zenjaskiniowca.pl/jak-wyrobic-nawyk-wygrywania/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zen Jaskiniowca
            </a>{" "}
            podcast, that really helped me see how important every day
            activities are and how powerful doing little tasks can make you
            feel. After some time you'll build a habit of winning and you'll
            start to feel extremely effective.
          </p>
          <div>
          <p>
            <span>First</span>, decide what do you want your life to be like in
            three main areas (according to{" "}
            <a
              href="https://zenjaskiniowca.pl/o-mnie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rafał Mazur
            </a>
            ):{" "}
          </p>
          <ol>
            <li>body shape</li>
            <li>state of mind</li>
            <li>bank balance</li>
          </ol>
          </div>
          <p>
            <span>Second</span>, every morning think of three to five todos that
            will significantly close you to your dreams defined in previous
            step. Add tasks to your power list by clicking Enter.
          </p>
          <p>
            <span>Finally</span>, start the game and smash every todo! The app
            shows how much time till the end of the day you have left. Consider
            it a game. If you do all challenges - you won the game. If you don't
            - you lost.
          </p>
          <p>
            <b>Additionaly</b>, after a busy day, see your stats. Admire how hard you
            worked during a week, a year, and see how far it got you. Try it out
            and see it for yourself!
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
