import React from "react";
import CompetitionBase from '../components/ScoutingComponents/CompetitionComponent.js'

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
      <div class='dynamic-page-container'>
        <h1 class='dynamic-page-header' id='header-competition'> Competition </h1>
        <hr/>
        <div>{this.state.rows}</div>
      </div>
    );
  }
}
