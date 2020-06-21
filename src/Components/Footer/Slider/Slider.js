import React, { useState } from "react";
import styles, {
  info,
  slider,
  textSpan,
  icon,
  iconLeft,
  iconRight,
  wrapper,
  buttons,
  button,
  current,
} from "./Slider.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleButtonClick = e => {
    setCurrentSlide(parseInt(e.target.id));
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
            className={`demo-icon icon-left-open-big  ${icon} ${iconLeft}`}
          ></span>
        ) : (
          <div style={{ flex: "1" }}></div>
        )}

        <TransitionGroup>
          <CSSTransition
            key={currentSlide}
            timeout={{ enter: 1000, exit: 1000 }}
            classNames={{ ...styles }}
          >
            <div className={wrapper}>
              {{
                2: (
                  <div>
                    <p>
                      <span className={textSpan}>First</span>, decide what do
                      you want your life to be like in three main areas
                      (according to{" "}
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
                    <span className={textSpan}>Second</span>, every morning
                    think of three to five todos that will significantly close
                    you to your dreams defined in the previous step. Add tasks
                    to your power list by clicking Enter.
                  </p>
                ),
                4: (
                  <p>
                    <span className={textSpan}>Finally</span>, start the game
                    and smash every todo! The app shows how much time till the
                    end of the day you have left. Consider it a game. If you do
                    all the challenges - you won the game. If you don't - you
                    lost.
                  </p>
                ),
                5: (
                  <p>
                    <b className={textSpan}>Additionaly</b>, after a busy day,
                    see your streak. Admire how hard you worked and see how
                    far it got you. Try it out and see it for yourself!
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
                  activities are and how powerful doing little tasks can make
                  you feel. After some time you'll build a habit of winning and
                  you'll start to feel extremely effective.
                </p>
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
        {currentSlide !== 5 ? (
          <div style={{ flex: "1" }}>
            <span
              onClick={handleChangeSlide}
              className={`demo-icon icon-right-open-big ${icon} ${iconRight}`}
            ></span>
          </div>
        ) : (
          <div style={{ flex: "1" }}></div>
        )}
      </div>
      <div className={buttons}>
        <button
          className={currentSlide === 1 ? `${button} ${current}` : button}
          id="1"
          onClick={handleButtonClick}
        ></button>
        <button
          className={currentSlide === 2 ? `${button} ${current}` : button}
          id="2"
          onClick={handleButtonClick}
        ></button>
        <button
          className={currentSlide === 3 ? `${button} ${current}` : button}
          id="3"
          onClick={handleButtonClick}
        ></button>
        <button
          className={currentSlide === 4 ? `${button} ${current}` : button}
          id="4"
          onClick={handleButtonClick}
        ></button>
        <button
          className={currentSlide === 5 ? `${button} ${current}` : button}
          id="5"
          onClick={handleButtonClick}
        ></button>
      </div>
    </div>
  );
};

export default Slider;
