import React from "react";
import { Link } from "react-router";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <span>
           FIRST Robotics Competition Team
          <span class='bhs'> 5752</span>
        </span>
        <span class='spacer wide'></span>
        <span>
          <Link to="about">About the App</Link>
        </span>
        <span class='spacer'></span>
        <span>
          <a href='javascript:alert("Sorry, I got nothing!")'>About the Team</a>
        </span>
      </footer>
    );
  }
}
