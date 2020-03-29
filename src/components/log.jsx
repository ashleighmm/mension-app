import React, { Component } from "react";
import { findByLabelText } from "@testing-library/react";
class Log extends Component {
  state = {
    adding: false,
  }

  clickHandler = () => {
    let status = this.state.adding ? false : true
    this.setState({adding: status});
  }
  render() {
    return (
      <div style={{ height: "85vh" }}>
        <div className="greyCloud logDash">
          <h2>{this.props.cycleLength}</h2>
          <p>days in your average cycle</p>
        </div>
      
        <div className="logBook">
          <button onClick={this.clickHandler}>Add an entry</button>
        </div>{this.state.adding ? 
        (<form style={{margin: "auto", width: "30vw", display: "flex", flexDirection: "column"}}>
          <label>Log</label>
          <input type="text"style={{height: "20vh"}}></input>
          <label>Date</label>
          <input type="date" />
          <button style={{marginTop: "10px"}}>Submit</button>
        </form>)
        : null}
      </div>
    );
  }
}

export default Log;
