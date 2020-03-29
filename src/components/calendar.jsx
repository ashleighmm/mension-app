import React, { Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
class Cal extends Component {
  state = {
    start: new Date(this.props.startDate * 1000),
    end: new Date(((this.props.periodLength * 86400) + this.props.startDate)* 1000)
  }
  componentDidMount() {
    console.log(this.state)
  }
  render() {
    return (
      <div className="calliGirl">
        <Calendar calendarType={this.props.calendarType} showNeighboringMonth={this.props.neighboringMonth} value={[this.state.start, this.state.end]}/>;
      </div>
    );
  }
}

export default Cal;
