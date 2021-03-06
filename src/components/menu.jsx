import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <nav className="Navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/log">Calendar</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;
