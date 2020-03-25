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
      leftParts: {}
    };
  }

  addChallenge = challenge => {
    this.setState({ challenges: [...this.state.challenges, challenge] });
  };

  removeChallenge = challenge => {
    this.setState({
      challenges: this.state.challenges.filter(c => c !== challenge)
    });
  };

  startingTheGame = isStarted => {
    this.setState({ step: "start" });
  };

  handleDone = e => {
    console.log(e.target);
  };

  gettingTimeLeft = (hours, minutes, seconds) => {
    this.setState({
      leftParts: {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }
    });
  };

  endingGame = end => {
    if (end === "end") return this.setState({ step: "end" });
  };

  render() {
    if (this.state.step === "set") {
      return (
        <Set
          addChallenge={this.addChallenge}
          challenges={this.state.challenges}
          startingTheGame={this.startingTheGame}
          removeChallenge={this.removeChallenge}
        />
      );
    } else if (this.state.step === "start") {
      return (
        <Start
          challenges={this.state.challenges}
          leftParts={this.state.leftParts}
          gettingTimeLeft={this.gettingTimeLeft}
          endingGame={this.endingGame}
          handleDone={this.handleDone}
        />
      );
    } else {
      return <Result />;
    }
  }
}

export default App;
