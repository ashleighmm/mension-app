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
    cycleLength: 28,
    periodLength: 7,
    calendarType: "ISO 8601",
    cal: true,
    neighboringMonth: true
  };
  
  showMonth = () => {
    let status = (this.state.neighboringMonth ? false : true);
    this.setState({neighboringMonth: status});
    return this.state.neighboringMonth;
  }
  calType = () => {
    let status = (this.state.calendarType === "ISO 8601" ? "US" : "ISO 8601");
    this.setState({calendarType: status, cal: !this.state.cal});
    console.log(this.state.cal)
    console.log(this.state.calendarType)
    return status;
    
  };

  startBleed = date => {
    console.log(date)
    this.setState({ startDate: date });
  };

  adjustCycle = length => {
    this.setState({ cycleLength: length });
  };

  adjustPeriod = length => {
    this.setState({ periodLength: length });
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
          <Route
            path="/calendar"
            component={() => (
              <Cal
                neighboringMonth = {this.state.neighboringMonth}
                calendarType={this.state.calendarType}
                startDate={this.state.startDate}
                periodLength={this.state.periodLength}
              />
            )}
          />
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
                cal={this.state.cal}
                calType={this.calType}
                neighboringMonth={this.state.neighboringMonth}
                showMonth={this.showMonth}
                adjustPeriod={this.adjustPeriod}
                adjustCycle={this.adjustCycle}
                cycleLength={this.state.cycleLength}
                periodLength={this.state.periodLength}
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
