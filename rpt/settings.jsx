import React, { Component } from "react";
class Settings extends Component {
  state = {};
  render() {
    return (
      <div>
        <button>Load test data</button>
        <button>Delete all data</button>
        <button>Connect Google account</button>
        <button>Mon - Sun calendar</button>
        <button>Show extended month</button>
        <p>Period length</p>
        <button>-</button>
        <p>{this.state.periodLength}</p>
        <button>+</button>
        <p>Cycle length</p>
        <button>-</button>
        <p>{this.state.cycleLength}</p>
        <button>+</button>
      </div>
    );
  }
}

export default Settings;
