import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Menu from "./components/menu";
import Home from "./components/home-section";
import Cal from "./components/calendar";
import Log from "./components/log";
import Settings from "./components/settings";
import Alerts from "./components/alerts";

class App extends Component {
  state = {
    startDate: undefined,
    cycleLength: 28
  };

  startBleed = date => {
    this.setState({ startDate: date });
  };

  render() {
    return (
      <React.Fragment>
        <header className="header">
          <p>Moon Keeper</p>
        </header>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                startDate={this.state.startDate}
                cycleLength={this.state.cycleLength}
                startBleed={this.startBleed}
              />
            )}
          />
          <Route path="/calendar" component={Cal} />
          <Route
            path="/log"
            component={() => (
              <Log
                startDate={this.state.startDate}
                cycleLength={this.state.cycleLength}
              />
            )}
          />
          <Route
            path="/settings"
            component={() => (
              <Settings
                startDate={this.state.startDate}
                cycleLength={this.state.cycleLength}
              />
            )}
          />
        </Switch>
        <footer>
          <Menu />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
