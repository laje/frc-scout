import React from "react";
import CompetitionBase from '../components/ScoutingComponents/CompetitionComponent.js'
import HalfCircle from '../components/AnalyticComponents/LoadHalfCircle.js'

export default class Competition extends React.Component {
  constructor(props){
    super(props)

    this.state = {rows: <p>No database connection...</p>}

    let participants = []
    let rows = []
    let comp = 'TestCompetition'

    if(this.props.location.query.competition){
      comp = this.props.location.query.competition;
    }

    fetch('http://localhost:8081/read?competition=' + comp)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Error: ' +
            response.status);
          return;
        }

        response.json().then(function(data) {
          for(let i = 0; i < Object.keys(data.participants).length; i++) {
            rows.push(<CompetitionBase key={i} teamNumber={data.participants[i]} testing={"123"}/>)
          }
          this.setState({rows: rows})
        }.bind(this));
      }.bind(this)
    )
    .catch(function(err) {
      console.log('Fetch Error: ', err);
    });
  }

  render() {
    return (
      <div class='dynamic-page-container competition'>
        <h1 class='dynamic-page-header' id='header-competition'> Competition </h1>
        <hr/>
        <div class='h-split-container'>
          <div class='horiz-split'>
            <h2 class='dynamic-page-subtitle'>
              Particpiant Teams
            </h2>
            {this.state.rows}
          </div>
          <div class='horiz-split' id='analytic'>
            <h2 class='dynamic-page-subtitle'>
              Analytic Data
            </h2>
            <HalfCircle element='Overall Completion' percent='86.123' color="#1FB2B1"/>
            <HalfCircle element="Teams worse than us" percent='2.379525' color="#DCA249"/>
            <HalfCircle element="Some other goal" percent='45' color="#78C8C5"/>
          </div>
        </div>
      </div>
    );
  }
}
