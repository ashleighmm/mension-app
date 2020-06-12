import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import moment from 'moment';

import Menu from "./components/menu";
import Home from "./components/home-section";
import Log from "./components/log";
import Settings from "./components/settings";


class App extends Component {
  state = {
    startDate: undefined,
    cycleLength: 28,
    periodLength: 7,
    defaultView: "month",
    currentDate: new Date(),
  };
  
  showMonth = () => {
    this.setState({defaultView: "month"});
  }

  showWeek = () => {;
    this.setState({defaultView: "week"});
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

  onViewChange = newView => { 
    this.setState({defaultView: newView})
  };

  
  setCurrentDate = async (date) => {
  	await this.setState({currentDate: date});
  }
 
  computeDisplayedDateRange = () => {
  	const {currentDate, defaultView} = this.state;
  	let start = moment(currentDate).startOf(defaultView);
  	let end = moment(currentDate).endOf(defaultView);
	if(defaultView == 'month') {
		start = start.startOf('week');
		end = end.endOf('week');
	}
  }
  render() {
    
    return (
      <React.Fragment>
        <header className="header">
          <p style={{paddingLeft: "20px"}}>Moon Keeper</p>
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
            path="/log"
            component={() => (
              <Log
                currentDate={this.state.currentDate}
                onNavigate={this.setCurrentDate}
                onViewChange={this.onViewChange}
                defaultView={this.state.defaultView}
                startDate={this.state.startDate}
                periodLength={this.state.periodLength}
                cycleLength={this.state.cycleLength}
              />
            )}
          />
          <Route
            path="/settings"
            component={() => (
              <Settings
                defaultView={this.state.defaultView}
                showWeek={this.showWeek}
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
          <Menu startDate={this.state.startDate}/>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
