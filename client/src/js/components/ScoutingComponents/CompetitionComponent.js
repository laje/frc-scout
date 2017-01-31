import React from "react";

export default class CompetitionBase extends React.Component {
  constructor(props){
    super(props)

    this.state = {teamName: "[unknown]", teamHome: "[unknown]", teamRecord:{win: "?", loss: "?"}}

    fetch('http://' + window.hostName + ':8081/read?team=' + this.props.teamNumber)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Error: ' +
            response.status);
          return;
        }
        response.json().then(function(data) {
          if(data.teamName != "No Record"){
            this.setState(data)
          }
          else{
            let x = data.teamNumber
            // Alternate team lookup, access The Blue Alliance's
            // database if there isn't any data on record.
            // This isn't ideal, since they are often out of date
            // or just flat out wrong. For example, our team's name is
            // "2015 FRC Rookie Grant / Fiduciary Trust / Beverly Education Foundation & Beverly High"
            //So ideally, we use data that we collect ourselves.
            fetch('https://www.thebluealliance.com/api/v2/team/frc' + x + '?X-TBA-App-Id=frc5752:scouting-system:beta')
            .then(function(response){
              response.json().then(function(data){
                let tbaData = {
                  //indication that it's not from our db.
                  //The stupid color should be enough.
                  "teamName": ('☷ ' + data.nickname),
                  "teamHome": ('☷ ' + data.location),
                  "bad_team": data.bad_team
                }
                this.setState(tbaData)
              }.bind(this))
            }.bind(this))
          }
        }.bind(this));
      }.bind(this)
    )
    .catch(function(err) {
      console.log('Fetch Error: ', err);
    });
  }

  render() {

    let teamNumber = this.props.teamNumber

    //Function that gets called when the user clicks on any
    //of the teams that are on the list

    function openScout(team){
      window.location.href = ('#/scouter' + '?t=' + team)
    }

    // Give teams with a defined team colour a background style to represent it.
    // If a team doesn't have one, this style will be marked as invalid and
    // the default colour will be used instead.

    let style = {
      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0), ' + this.state.teamColour + ' 200%)',
    }

    return (
      <div style={style} class='teams-container' onClick={openScout.bind(this, this.props.teamNumber)}>
        <span class='teams-number'>
          {this.props.teamNumber}
        </span>
        <div class='teams-subcontainer'>
          <div class='teams-sub name'>{this.state.teamName}</div>
          <div class='teams-sub location'>{this.state.teamHome}</div>
          <div class='teams-sub stats'>{this.state.teamRecord.win} : {this.state.teamRecord.loss}</div>
        </div>
      </div>
    );
  }
}
