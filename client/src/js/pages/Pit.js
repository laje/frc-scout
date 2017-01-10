import React from "react";
import PitBase from "../Components/ScoutingComponents/PitComponent.js"

export default class Pit extends React.Component {
  render() {
    return (
      <div class='dynamic-page-container'>
        <h1 class='dynamic-page-header' id='header-pit'> Pit Scout </h1>
        <PitBase />
      </div>
    );
  }
}
