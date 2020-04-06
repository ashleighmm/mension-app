import React, { Component } from "react";
import Calendar from "react-calendar";
import Axios from "axios";
import "react-calendar/dist/Calendar.css";

const api = "http://localhost:3000/api/cycles";
const api2 = "http://localhost:3000/api/cycles/create";

class Cal extends Component {
  state = {
    start: new Date(this.props.startDate * 1000),
    end: new Date(((this.props.periodLength * 86400) + this.props.startDate)* 1000),
    cycles: []
  }
  componentDidMount() {
    this.getData();
    console.log(this.state);
  }

  componentDidUpdate() {
    this.postData()
    console.log(this.state)
  }

  getData() {
    Axios.get(api).then(result => {
      console.log(result.data);
      this.setState({ cycles: result.data });
    });
  }

  postData() {
    Axios.post(api2, {start: this.state.start, end: this.state.end}).then(result => {
      console.log(result.data);
    });
  }

  render() {
    return (
      <div className="calliGirl">
      {this.props.startDate !== undefined ? (
       <div>
          <Calendar calendarType={this.props.calendarType} showNeighboringMonth={this.props.neighboringMonth} value={[this.state.start, this.state.end]}/>
       </div>) : <Calendar calendarType={this.props.calendarType} showNeighboringMonth={this.props.neighboringMonth} /> }
       <div className="cycleLog">
          <h3 style={{textAlign: "left"}}>Past Cycles</h3>
          { this.state.cycles.length > 0 ? 
          this.state.cycles.map(cycle => (
          <p>{cycle.start.substr(0, 10)} - {cycle.end.substr(0, 10)}</p>)) : null }
       </div>
      </div>
    );
  }
}

export default Cal;
