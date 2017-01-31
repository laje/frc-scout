import React from "react";

import CurrentData from '../components/ScoutingComponents/SimpleDataFetcher';
import ScoutingHeader from '../components/ScoutingComponents/ScoutingHeader'

export default class Scouter extends React.Component {
  render() {

    let team = this.props.location.query.t;

    return (
      <div class='dynamic-page-container'>
        <h1 class='dynamic-page-header' id='header-scouter'>  Scouter </h1>
        <ScoutingHeader team={team}/>
        <div>
          <CurrentData query={this.props.location.query}/>
        </div>
      </div>
    );
  }
}
