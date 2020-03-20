import React, { Component } from "react";

class Home extends Component {
  state = {
    startDate: "",
    cycleLength: 28
  };
  render() {
    return (
      <div>
        <div>
          <button>
            <h1>Period Just Started</h1>
            <p>tap here</p>
          </button>
        </div>
        <div>
          <input type="date" />
          <button>Cancel</button>
          <button>Save</button>
        </div>
        <div>
          <p>next: {this.state.startDate + this.state.cycleLength}</p>
          <p>
            days left:
            {this.state.startDate + this.state.cycleLength - Date.now()}
          </p>
          <p>period day: {Date.now() - this.state.startDate}</p>
        </div>
      </div>
    );
  }
}

export default Home;
