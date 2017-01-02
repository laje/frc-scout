import React from "react";
import { Link } from "react-router";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <span class='header-item large'>
          frsct
          <span class='header-item arrow'>>></span>
        </span>
        <span class='spacer wide'></span>
        <span class='header-item'>
          <Link to="Competition" class='header-link'>Competition</Link>
          <span class='header-item arrow small'>>></span>
        </span>
        <span class='spacer'></span>
        <span class='header-item'>
          <Link to="Pit" class='header-link'>Pits</Link>
        </span>
        <span class='spacer'></span>
        <span class='header-item'>
          <Link to="Game" class='header-link'>Game</Link>
        </span>
      </header>
    );
  }
}
