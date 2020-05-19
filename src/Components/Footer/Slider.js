import React, { Component } from "react";
import { info, slider, textSpan, icon } from "./Slider.module.css";

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      slideNum: 1,
    };
  }

  handleInputChange = e => {
    this.setState({ slideNum: parseInt(e.target.value) });
  };

  handleChangeSlide = e => {
    e.target.classList[1] === "icon-right-open-big"
      ? this.setState(prevState => {
          return { slideNum: prevState.slideNum + 1 };
        })
      : this.setState(prevState => {
          return { slideNum: prevState.slideNum - 1 };
        });
  };

  render() {
    const { slideNum } = this.state;
    return (
      <div className={info}>
        <h2>What is the Game of Life?</h2>
        <div className={slider}>
          {slideNum !== 1 ? (
            <span
              onClick={this.handleChangeSlide}
              className={`demo-icon icon-left-open-big ${icon}`}
            ></span>
          ) : (
            <div style={{ flex: "1" }}></div>
          )}
          {{
            2: (
              <div>
                <p>
                  <span className={textSpan}>First</span>, decide what do you
                  want your life to be like in three main areas (according to{" "}
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
            ),
            3: (
              <p>
                <span className={textSpan}>Second</span>, every morning think of
                three to five todos that will significantly close you to your
                dreams defined in the previous step. Add tasks to your power
                list by clicking Enter.
              </p>
            ),
            4: (
              <p>
                <span className={textSpan}>Finally</span>, start the game and
                smash every todo! The app shows how much time till the end of
                the day you have left. Consider it a game. If you do all the
                challenges - you won the game. If you don't - you lost.
              </p>
            ),
            5: (
              <p>
                <b className={textSpan}>Additionaly</b>, after a busy day, see
                your stats. Admire how hard have you worked during a week, a
                year, and see how far it got you. Try it out and see it for
                yourself!
              </p>
            ),
          }[slideNum] || (
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
              podcast, that really helped me see how important everyday
              activities are and how powerful doing little tasks can make you
              feel. After some time you'll build a habit of winning and you'll
              start to feel extremely effective.
            </p>
          )}
          {slideNum !== 5 ? (
            <div>
              <span
                onClick={this.handleChangeSlide}
                className={`demo-icon icon-right-open-big ${icon}`}
              ></span>
            </div>
          ) : (
            <div style={{ flex: "1" }}></div>
          )}
        </div>
        <form>
          <input
            onChange={this.handleInputChange}
            type="radio"
            name="slide"
            aria-label="slide 1/6"
            value="1"
            checked={slideNum === 1}
          />
          <input
            onChange={this.handleInputChange}
            type="radio"
            name="slide"
            aria-label="slide 2/6"
            value="2"
            checked={slideNum === 2}
          />
          <input
            onChange={this.handleInputChange}
            type="radio"
            name="slide"
            aria-label="slide 3/6"
            value="3"
            checked={slideNum === 3}
          />
          <input
            onChange={this.handleInputChange}
            type="radio"
            name="slide"
            aria-label="slide 4/6"
            value="4"
            checked={slideNum === 4}
          />
          <input
            onChange={this.handleInputChange}
            type="radio"
            name="slide"
            aria-label="slide 5/6"
            value="5"
            checked={slideNum === 5}
          />
        </form>
      </div>
    );
  }
}

export default Slider;
