import React, { Component } from "react";
import Set from "./Components/Set/Set";
import Start from "./Components/Start/Start";
import Result from "./Components/Result/Result";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: "set",
      challenges: []
    }
  }

  addChallenge = (challenge) => {
    this.setState({challenges: [...this.state.challenges, challenge]});
  }

  startingTheGame = (isStarted) => {
    this.setState({step: "start"});
  }


  render() {
    if (this.state.step === "set") { return <Set addChallenge={this.addChallenge} challenges={this.state.challenges} startingTheGame={this.startingTheGame}/>}
    else if (this.state.step === "start") { return <Start challenges={this.state.challenges}/>}
    else { return <Result />}
  }
}

export default App;
