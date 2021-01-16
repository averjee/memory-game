import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Game from "./components/game/game";
import Results from "./components/results/results";
import Home from "./components/home/home";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/results" component={Results} />
      </Switch>
    );
  }
}
