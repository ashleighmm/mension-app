import React, { Component } from "react";
import Axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
    



class Cal extends Component {
  state = {
    start: new Date(this.props.startDate * 1000),
    end: new Date(((this.props.periodLength * 86400) + this.props.startDate)* 1000),
    events: []
  }
  componentDidMount() {
    this.postcycleData();
    this.getcycleData();
    console.log(this.state);
  }

  getcycleData = () => {
    Axios.get(api).then(result => {
      console.log(result.data);
      this.setState({ events: result.data });
    });
  }

  postcycleData = () => {
    Axios.post(api2, {start: this.state.start, end: this.state.end}).then(result => {
      console.log(result.data);
    });
  }

  render() {

    return (
      <div className="calliGirl">
          <Calendar
            events={this.state.logbook}
            startAccessor="start"
            endAccessor="start"
            allDay="true"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
      </div>
    );
  }
}

export default Cal;
