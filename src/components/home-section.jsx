import React, { Component } from "react";
import "../App.css";

class Home extends Component {
  state = {
    first: true,
    second: false,
    third: false,
    input: undefined
  };

  clickListener1 = () => {
    this.setState({ first: false, second: true });
  };
  clickListener2 = () => {
    this.props.startBleed(null);
  };
  clickListener3 = () => {
    console.log(this.props.startDate);
    this.props.startBleed(this.state.input);
    this.setState({ first: false, second: false, third: true });
  };

  changeHandler = event => {
    let tick = new Date(event.target.value);
    let tock = tick.getTime() / 1000;
    this.setState({input: tock});
  };

  render() {
    return (
      <div className="homeScreen">
        {this.props.startDate === undefined && this.state.first === true ? (
          <div className="startScreen">
            <button onClick={this.clickListener1} className="C2A">
              <h1>Period Just Started</h1>
              <p>tap here</p>
            </button>
          </div>
        ) : null}
        {this.state.second ? (
          <div className="createEntry">
            <input onChange={this.changeHandler} type="date" />
            <div className="buttonTray">
              <button onClick={this.clickListener2}>Cancel</button>
              <button onClick={this.clickListener3}>Save</button>
            </div>
          </div>
        ) : null}
        {this.props.startDate !== undefined ? (
          <div className="statusDashboard">
            <p>
              next:{" "}
              {new Date(
                (this.props.cycleLength * 86400 + this.props.startDate) * 1000
              )
                .toString()
                .substr(0, 15)}
            </p>
            <p>
              days left:{" "}
              {(
                (this.props.cycleLength * 86400 -
                  ((new Date().getTime() / 1000).toFixed(0) -
                    this.props.startDate)) /
                86400
              ).toFixed(0)}
            </p>
            <p>
              period day:{" "}
              {(
                ((new Date().getTime() / 1000).toFixed(0) -
                  this.props.startDate) /
                  86400 +
                1
              ).toFixed(0)}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Home;
