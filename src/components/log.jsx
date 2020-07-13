import React, { Component } from "react";
import Axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);
const api = "http://localhost:3000/api/log";
const api2 = "http://localhost:3000/api/log/create";
const api3 = "http://localhost:3000/api/cycles";
const api4 = "http://localhost:3000/api/cycles/create";


class Log extends Component {
  state = {
    adding: false,
    logbook: [],
    date: "",
    flow: "",
    pain: "",
    location: "",
    note: "",
    start: new Date(this.props.startDate * 1000),
    end: new Date(((this.props.periodLength * 86400) + this.props.startDate)* 1000),
    events: []
  }
  
  componentDidMount() {
    this.postcycleData();
    this.getcycleData();
    this.getData();
  }

  // SYMPTOM LOG FUNCTIONS
  getData = () => {
    Axios.get(api).then(result => {
      console.log(result.data);
      this.setState({ logbook: result.data, adding: false });
    });
  };

  postData = () => {
    let myString =  "flow: " + `${this.state.flow}` + ", pain: " + `${this.state.pain}` + ", location: " + `${this.state.location}` + ", note: " + `${this.state.note}`;
    console.log(this.state.date);
    Axios.post(api2, {start: this.state.date, end: this.state.date, title: myString}).then(result => {
      console.log(result.data);
    });
    this.getData();
    console.log(this.state.logbook)
  };

  changeHandler = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  clickHandler = () => {
    let status = this.state.adding ? false : true
    this.setState({adding: !this.state.adding});
  }

// CYCLE TRACKING FUNCTIONS

  getcycleData = () => {
    Axios.get(api3).then(result => {
      console.log(result.data);
      this.setState({ events: result.data });
    });
  }

  postcycleData = () => {
    let start = this.state.start.toLocaleDateString("fr-ca").split('/').join('-');
    let end = this.state.end.toLocaleDateString("fr-ca").split('/').join('-');
    console.log(start, end)
    Axios.post(api4, {start: start, end: end}).then(result => {
      console.log(result.data);
    });
  }

  render() {
    console.log(this.props.views)
    return (
      <div style={{ height: "84.5vh" }}>
      
       {this.state.adding === true ? 
        (<form id="myForm" style={{margin: "auto", width: "300px", display: "flex", flexDirection: "column"}}>
          <h2>Daily Symptom Log:</h2>
          <label htmlFor="flow">How heavy is your flow</label>
            <select name="flow" onChange={this.changeHandler} id="flow">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <label htmlFor="pain">How severe is your pain?</label>
            <select name="pain" onChange={this.changeHandler} id="pain">
            <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="location">Where is your pain?</label>
            <select name="location" onChange={this.changeHandler} id="location">
              <option vale="N/A">None</option>
              <option value="Pelvis">Left</option>
              <option value="Legs">Middle</option>
              <option value="Back">Right</option>
              <option value="Other">Undetermined</option>
              <option value="Other">Bilateral</option>
            </select>
          <label>Any additional symptom notes?</label>
            <input name="note" value={this.state.note} onChange={this.changeHandler} type="text"style={{height: "20vh"}}></input>
          <label>Date</label>
             <input name="date" value={this.state.date}
             onChange={this.changeHandler} type="date" />
          <button style={{backgroundColor: "dodgerblue", marginTop: "10px", borderRadius: "40px", padding: "10px", color: "mediumspringgreen", border: "3px solid mediumspringgreen"}} onClick={this.postData} type="submit">Submit</button>
        </form>)
        : 
        <div style={{height: "77vh"}}>
         
        <Calendar
            events={this.state.logbook.concat(this.state.events)}
            defaultView={this.props.defaultView}
            views={['month', 'day', 'week']}
            view={this.props.defaultView}
            onView={this.props.onViewChange}
            onNavigate={this.props.onNavigate}
            startAccessor="start"
            endAccessor="end"
            desc="description"
            allDayAccessor="allDay"
            toolbar={true}
            selectable={true}
            showMultiDayTimes={true}
            drilldownView="day"
            step={30}
            date={this.props.currentDate}
            defaultDate={new Date()}
            localizer={localizer}
          />
        </div>
  }  <div className="logBook">
  <button style={{backgroundColor: "mediumspringgreen", borderRadius: "40px", width: "300px", padding: "10px", color: "dodgerblue", border: "3px solid dodgerblue"}} onClick={this.clickHandler}> {!this.state.adding ? "Add an entry" : "Cancel"}</button>
  </div>
      </div>
      
    );
  }
}

export default Log;
