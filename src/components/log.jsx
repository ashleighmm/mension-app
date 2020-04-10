import React, { Component } from "react";
import Axios from "axios";

const api = "http://localhost:3000/api/log";
const api2 = "http://localhost:3000/api/log/create"

class Log extends Component {
  state = {
    adding: false,
    logbook: [],
    date: "",
    note: ""
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    Axios.get(api).then(result => {
      console.log(result.data);
      this.setState({ logbook: result.data, adding: false });
    });
  }

  postData = (e) => {
    e.preventDefault();
    Axios.post(api2, {date: this.state.date, note: this.state.note}).then(result => {
      console.log(result.data);
      this.getData();
    });
  }

  dateChange = (event) => {
    this.setState({
      date: event.target.value
    });
  };

  noteChange = (event) => {
    this.setState({
      note: event.target.value
    });
  };

  clickHandler = () => {
    let status = this.state.adding ? false : true
    this.setState({adding: status});
  }

  render() {
    return (
      <div style={{ height: "85vh" }}>
        <div className="greyCloud logDash" style={{paddingTop: "10px", paddingBottom: "10px", width: "100%"}}>
          <h2 style={{margin: "5px"}}>{this.props.cycleLength}</h2>
          <p style={{margin: "5px"}}>days in your average cycle</p>
        </div>
      
        <div className="logBook">
          <button style={{backgroundColor: "mediumspringgreen", borderRadius: "40px", padding: "10px", color: "dodgerblue", border: "3px solid dodgerblue"}} onClick={this.clickHandler}>Add an entry</button>
        </div>{this.state.adding ? 
        (<form style={{margin: "auto", width: "30vw", display: "flex", flexDirection: "column"}}>
          <label>Log</label>
          <input value={this.state.note} onChange={this.noteChange} type="text"style={{height: "20vh"}}></input>
          <label>Date</label>
          <input value={this.state.date}
            onChange={this.dateChange} type="date" />
          <button onClick={this.postData} style={{marginTop: "10px"}}>Submit</button>
        </form>)
        : 
        
        this.state.logbook.map(log => (
       <div style={{display: "flex", justifyContent: "center"}}> <p style={{ padding: "10px", color: "white", borderRadius: "10px", backgroundColor: "dodgerblue", border: "3px solid mediumspringgreen", width: "80vw", height: "auto"}}><strong style={{color: "mediumspringgreen"}}>{log.date.substr(0, 10)}:<nbsp/><nbsp/><nbsp/></strong> {log.note}</p></div>))}
      </div>
    );
  }
}

export default Log;
