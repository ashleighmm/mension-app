import React, { Component } from "react";
class Settings extends Component {
  state = {
    cal: true,
    ext: true
  };


  checkHandler2 = () => {
    this.setState({ext: !this.state.ext})
  };

  render() {
    return (
      <div className="Settings">
        <button className="fullScreen greyCloud">Load test data</button>
        <button className="fullScreen greyCloud">Delete all data</button>
        <button className="fullScreen greyCloud">Connect Google account</button>
        <button className="fullScreen greyCloud">
          <p>Mon - Sun calendar</p>
          <input
            style={{minHeight: "30px", minWidth: "30px"}}
            type="checkbox"
            checked={this.props.cal}
            onChange={this.props.calType}
          ></input>
        </button>
        <button className="fullScreen greyCloud">
          <p>Show extended month</p>
          <input 
            style={{minHeight: "30px", minWidth: "30px"}} 
            type="checkbox"
            checked={this.props.neighboringMonth}
            onChange={this.props.showMonth}
            />
        </button>
        <div className="fullScreen">
          <p>Period length</p>
          <div className="toggle">
            <button
              onClick={() =>
                this.props.adjustPeriod(this.props.periodLength - 1)
              }
              className="greyCloud square"
            >
              -
            </button>
            <p className="square">{this.props.periodLength}</p>
            <button
            style={{fontSize: "20"}}
              onClick={() =>
                this.props.adjustPeriod(this.props.periodLength + 1)
              }
              className="greyCloud square"
            >
              +
            </button>
          </div>
        </div>
        <div className="fullScreen">
          <p>Cycle length</p>
          <div className="toggle">
            <button
              onClick={() => this.props.adjustCycle(this.props.cycleLength - 1)}
              className="greyCloud square"
            >
              -
            </button>
            <p className="square">{this.props.cycleLength}</p>
            <button
              onClick={() => this.props.adjustCycle(this.props.cycleLength + 1)}
              className="greyCloud square"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
