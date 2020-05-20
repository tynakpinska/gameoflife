import React, { useState } from "react";
import { info, slider, textSpan, icon } from "./Slider.module.css";
import { CSSTransitionGroup } from 'react-transition-group';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleInputChange = e => {
    setCurrentSlide(parseInt(e.target.value));
  };

  const handleChangeSlide = e => {
    e.target.classList[1] === "icon-right-open-big"
      ? setCurrentSlide(currentSlide + 1)
      : setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className={info}>
      <h2>What is the Game of Life?</h2>
      <div className={slider} style={{ flex: "1" }}>
        {currentSlide !== 1 ? (
          <span
            onClick={handleChangeSlide}
            className={`demo-icon icon-left-open-big ${icon}`}
          ></span>
        ) : (
          <div style={{ flex: "1" }}></div>
        )}
        <CSSTransitionGroup
        transitionName="carousel"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        key={currentSlide}>
            {{
              2: (
                <>
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
                </>
              ),
              3: (
                <p>
                  <span className={textSpan}>Second</span>, every morning think
                  of three to five todos that will significantly close you to
                  your dreams defined in the previous step. Add tasks to your
                  power list by clicking Enter.
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
            }[currentSlide] || (
              <p>
                The goal of this app is to help you achieve success by
                motivating you to do something small, that closes you to
                fulfilling your dreams, each day. It was inspired by{" "}
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
        </CSSTransitionGroup>
        {currentSlide !== 5 ? (
          <div style={{ flex: "1" }}>
            <span
              onClick={handleChangeSlide}
              className={`demo-icon icon-right-open-big ${icon}`}
            ></span>
          </div>
        ) : (
          <div style={{ flex: "1" }}></div>
        )}
      </div>
      <form>
        <input
          onChange={handleInputChange}
          type="radio"
          name="slide"
          aria-label="slide 1/6"
          value="1"
          checked={currentSlide === 1}
        />
        <input
          onChange={handleInputChange}
          type="radio"
          name="slide"
          aria-label="slide 2/6"
          value="2"
          checked={currentSlide === 2}
        />
        <input
          onChange={handleInputChange}
          type="radio"
          name="slide"
          aria-label="slide 3/6"
          value="3"
          checked={currentSlide === 3}
        />
        <input
          onChange={handleInputChange}
          type="radio"
          name="slide"
          aria-label="slide 4/6"
          value="4"
          checked={currentSlide === 4}
        />
        <input
          onChange={handleInputChange}
          type="radio"
          name="slide"
          aria-label="slide 5/6"
          value="5"
          checked={currentSlide === 5}
        />
      </form>
    </div>
  );
};

export default Slider;