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
  }

  postData = () => {
    let myString =  "flow: " + `${this.state.flow}` + " pain: " + `${this.state.pain}` + " location: " + `${this.state.location}` + " note: " + `${this.state.note}`;
    console.log(myString);
    Axios.post(api2, {start: this.state.date, end: this.state.date, title: myString}).then(result => {
      console.log(result.data);
    });
    this.getData();
    console.log(this.state.logbook)
  }

  changeHandler = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };



  clickHandler = () => {
    let status = this.state.adding ? false : true
    this.setState({adding: status});
  }

// CYCLE TRACKING FUNCTIONS

  getcycleData = () => {
    Axios.get(api3).then(result => {
      console.log(result.data);
      this.setState({ events: result.data });
    });
  }

  postcycleData = () => {
    Axios.post(api4, {start: this.state.start, end: this.state.end}).then(result => {
      console.log(result.data);
    });
  }

  render() {
    return (
      <div style={{ height: "85vh" }}>
        <div className="greyCloud logDash" style={{paddingTop: "10px", paddingBottom: "10px"}}>
          <h2 style={{margin: "5px"}}>{this.props.cycleLength}</h2>
          <p style={{margin: "5px"}}>days in your average cycle</p>
        </div>
      
        <div className="logBook">
          <button style={{backgroundColor: "mediumspringgreen", borderRadius: "40px", padding: "10px", color: "dodgerblue", border: "3px solid dodgerblue"}} onClick={this.clickHandler}>Add an entry</button>
        </div>{this.state.adding === true ? 
        (<form id="myForm" style={{margin: "auto", width: "30vw", display: "flex", flexDirection: "column"}}>
          <label htmlFor="flow">How heavy is your flow</label>
            <select name="flow" onChange={this.changeHandler} id="flow">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="pain">How bad is your pain?</label>
            <select name="pain" onChange={this.changeHandler} id="pain">
            <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="location">Where is your pain?</label>
            <select name="location" onChange={this.changeHandler} id="location" multiple>
              <option vale="N/A">N/A</option>
              <option value="Pelvis">Pelvis</option>
              <option value="Legs">Legs</option>
              <option value="Back">Back</option>
              <option value="Other">Other</option>
            </select>
          <label>Any additional symptom notes?</label>
            <input name="note" value={this.state.note} onChange={this.changeHandler} type="text"style={{height: "20vh"}}></input>
          <label>Date</label>
             <input name="date" value={this.state.date}
             onChange={this.changeHandler} type="date" />
          <button onClick={this.postData} type="submit" style={{marginTop: "10px"}}>Submit</button>
        </form>)
        : 
        <div style={{height: "60vh"}}>
        <Calendar
            events={this.state.logbook.concat(this.state.events)}
            startAccessor="start"
            endAccessor="end"
            desc="description"
            allDay="true"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
  }
      </div>
      
    );
  }
}

export default Log;
