import React, { Component } from "react";
class Settings extends Component {
  state = {};
  render() {
    return (
      <div className="Settings">
        <button className="fullScreen greyCloud">Load test data</button>
        <button className="fullScreen greyCloud">Delete all data</button>
        <button className="fullScreen greyCloud">Connect Google account</button>
        <button className="fullScreen greyCloud">
          <p>Mon - Sun calendar</p>
          <input type="checkbox" checked="checked"></input>
        </button>
        <button className="fullScreen greyCloud">
          <p>Show extended month</p>
          <input type="checkbox" checked="checked"></input>
        </button>
        <div className="fullScreen">
          <p>Period length</p>
          <div className="toggle">
            <button className="greyCloud square">-</button>
            <p className="square">{this.props.periodLength}</p>
            <button className="greyCloud square">+</button>
          </div>
        </div>
        <div className="fullScreen">
          <p>Cycle length</p>
          <div className="toggle">
            <button className="greyCloud square">-</button>
            <p className="square">{this.props.cycleLength}</p>
            <button className="greyCloud square">+</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
