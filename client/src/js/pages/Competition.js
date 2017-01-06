import React from "react";
import CompetitionBase from '../components/ScoutingComponents/CompetitionComponent.js'
import HalfCircle from '../components/AnalyticComponents/LoadHalfCircle.js'

export default class Competition extends React.Component {
  constructor(props){
    super(props)

    this.state = {rows: <p>No database connection...</p>, testing: 100}

    let participants = []
    let rows = []
    let comp = 'TestCompetition'

    if(this.props.location.query.competition){
      comp = this.props.location.query.competition;
    }

    let analyticData = {}

    fetch('http://localhost:8081/read?competition=' + comp)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Error: ' +
            response.status);
          return;
        }

        response.json().then(function(data) {
          analyticData.comp = data.criteria;
          analyticData.partic = data.participants;
          for(let i = 0; i < Object.keys(data.participants).length; i++) {
            rows.push(<CompetitionBase key={i} teamNumber={data.participants[i]}/>)
          }
          this.setState({rows: rows})
        }.bind(this));
      }.bind(this)
    )
    .catch(function(err) {
      console.log('Fetch Error: ', err);
    });

    // ====== IN PROGRESS: ACTUAL DATA IN THE ANALYTIC SECTION =======
    // let totalItems = Object.keys(analyticData.comp)
    //
    // for(let i = 0; i < Object.keys(analyticData.partic); i++){
    //   fetch('http://localhost:8081/read?team=' + analyticData.team)
    //   .then(
    //     function(response) {
    //       if (response.status !== 200) {
    //         console.log('Error: ' +
    //           response.status);
    //         return;
    //       }
    //
    //       response.json().then(function(data) {
    //
    //       }.bind(this));
    //     }.bind(this)
    //   )
    //   .catch(function(err) {
    //     console.log('Fetch Error: ', err);
    //   });
    //}

    setTimeout(() => {
      this.setState({"testing": 55})
    , 0})

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
            <div class='h-split-container'>
              <div class="horiz-split">
                <HalfCircle element="Overall Completion" percent={this.state.testing} color="#85929E"/>
                <HalfCircle element="Pit Completion" percent='2.379525' color="#EB984E"/>
                <HalfCircle element="Game Completion" percent='45' color="#F5B041"/>
              </div>
              <div class="horiz-split">
                <HalfCircle element="Practical Allies" percent='98.123' color="#5DADE2"/>
                <HalfCircle element="Difficult Opponents" percent='35.379525' color="#E74C3C"/>
                <HalfCircle element="Some other goal" percent='29' color="#78C8C5"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
