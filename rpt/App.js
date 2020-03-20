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
  state = {};
  render() {
    return (
      <React.Fragment>
        {" "}
        <Alerts />
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/calendar" component={Cal} />
          <Route path="/log" component={Log} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
