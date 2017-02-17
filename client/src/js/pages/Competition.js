import React from "react";
import CompetitionBase from '../components/ScoutingComponents/CompetitionComponent.js'
import HalfCircle from '../components/AnalyticComponents/LoadHalfCircle.js'

export default class Competition extends React.Component {
  constructor(props){
    super(props)

    this.state = {rows: <p>No database connection...</p>, anl: { pit: 33, game: 44, testing: 55 }}

    this.doAnalyze = this.doAnalyze.bind(this)

    let participants = []
    let rows = []

    let pitVal = 0
    let gameVal = 0

    let comp = 'Reading'

    if(this.props.location.query.competition){
      comp = this.props.location.query.competition;
    }

    let analyticData = { ttlPit: 0, ttlGame: 0}

    fetch('https://' + window.url + '/read?competition=' + comp)
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

          this.doAnalyze(analyticData.partic)


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
  }

  doAnalyze(teams) {
    //Compatible/incompatible teams
    let compats = []
    let unlikes = []

    console.log(teams)

    for (let team in Object.keys(teams)){
      fetch('https://' + window.url + '/compare/' + teams[team] + '/' + window.myTeam)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error: ' +
              response.status);
            return;
          }

          response.json().then(function(data) {
            if(data.compatibility >= 12.5){
              compats.push(teams[team])
            } else {
              unlikes.push(teams[team])
            }

            this.setState({
              anl:{
                pit: compats.length,
                game: unlikes.length
              }
            })
          }.bind(this)).catch(function(err){
            if(("" + err).match('/(\d$)/g')){console.log("E")}
          });
        }.bind(this)
      )
      .catch(function(err) {
        console.log('Fetch Error: ', err);
      });
    }

    this.setState({anl:{
      testing: teams.length,
      pit: 99,
      game: 22
    }})
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
                <HalfCircle element="Overall Completion" percent={this.state.anl.testing} color="#85929E"/>
                <HalfCircle element="Pit Completion" percent={this.state.anl.pit} color="#EB984E"/>
                <HalfCircle element="Game Completion" percent={this.state.anl.game} color="#F5B041"/>
              </div>
              <div class="horiz-split">
                <HalfCircle element="Practical Allies" percent='0' color="#5DADE2"/>
                <HalfCircle element="Difficult Opponents" percent='0' color="#E74C3C"/>
                <HalfCircle element="Some other goal" percent='0' color="#78C8C5"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
