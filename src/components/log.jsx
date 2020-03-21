import React, { Component } from "react";
class Log extends Component {
  render() {
    return (
      <div style={{ height: "85vh" }}>
        <div className="greyCloud logDash">
          <h2>{this.props.cycleLength}</h2>
          <p>days in your average cycle</p>
        </div>
        <div className="logBook">
          <button>Add an entry</button>
        </div>
      </div>
    );
  }
}

export default Log;
