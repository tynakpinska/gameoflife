import React, { Component } from "react";
import Set from "./Components/Set/Set";
import Start from "./Components/Start/Start";
import Result from "./Components/Result/Result";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: "set",
      challenges: [],
      leftParts: {
        hours: "00",
        minutes: "00",
        seconds: "00"
      }
    };
  }

  addChallenge = challenge => {
    this.setState({ challenges: [...this.state.challenges, challenge] });
  };

  startingTheGame = isStarted => {
    this.setState({ step: "start" });
    setInterval(() => {
      const initDate = new Date();
      const initYear = initDate.getFullYear();
      const initMonth = `0${initDate.getMonth() + 1}`;
      const initDay = initDate.getDate();
      const nextDay = `${initYear}-${initMonth}-${initDay + 1}`;
      const nextDate = new Date(nextDay).setHours(0);
      const left = nextDate - initDate;
      this.setState({
        leftParts: {
          hours:
            Math.floor((left / (1000 * 60 * 60)) % 24) > 9
              ? Math.floor((left / (1000 * 60 * 60)) % 24)
              : `0${Math.floor((left / (1000 * 60 * 60)) % 24)}`,
          minutes:
            Math.floor((left / 1000 / 60) % 60) > 9
              ? Math.floor((left / 1000 / 60) % 60)
              : `0${Math.floor((left / 1000 / 60) % 60)}`,
          seconds:
            Math.floor((left / 1000) % 60) > 9
              ? Math.floor((left / 1000) % 60)
              : `0${Math.floor((left / 1000) % 60)}`
        }
      });
    }, 1000);
  };

  render() {
    if (this.state.step === "set") {
      return (
        <Set
          addChallenge={this.addChallenge}
          challenges={this.state.challenges}
          startingTheGame={this.startingTheGame}
        />
      );
    } else if (this.state.step === "start") {
      return (
        <Start
          challenges={this.state.challenges}
          leftParts={this.state.leftParts}
        />
      );
    } else {
      return <Result />;
    }
  }
}

export default App;
