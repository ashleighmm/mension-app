import React, { Component } from "react";
import Axios from "axios";

const api5 = "http://localhost:3000/api/delete/logs";
const api6 = "http://localhost:3000/api/delete/cycles";


class Settings extends Component {
  state = {
    cal: true,
    ext: true
  };
  
deleteLogs = () => {
    Axios.delete(api5).then(result => {
      console.log(result.data);
    });
}

deleteCycles = () => {
  Axios.delete(api6).then(result => {
    console.log(result.data);
  });
}
  render() {
    return (
      <div className="Settings">
        <button onClick={this.deleteCycles} className="fullScreen greyCloud">Delete all cycle data</button>
        <button onClick={this.deleteLogs} className="fullScreen greyCloud">Delete all log data</button>
        <button className="fullScreen greyCloud">
          <p>Week to view</p>
          <input
            style={{minHeight: "30px", minWidth: "30px"}}
            type="checkbox"
            checked={this.props.defaultView === "week" ? true : false}
            onChange={this.props.showWeek}
          ></input>
        </button>
        <button className="fullScreen greyCloud">
          <p>Month to view</p>
          <input 
            style={{minHeight: "30px", minWidth: "30px"}} 
            type="checkbox"
            checked={ this.props.defaultView === "month" ? true : false}
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
