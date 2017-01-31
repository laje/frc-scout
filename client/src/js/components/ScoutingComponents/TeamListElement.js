import React from "react";

export default class TeamListElem extends React.Component {
  constructor(props){
    super(props)
    this.selectTeam = this.selectTeam.bind(this)

    this.state = {TeamName: ""}

    let TeamName = fetch('http://localhost:8081/read?team=' + this.props.team)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error: ' +
              response.status);
            return;
          }
          response.json().then(function(data) {
            if(data.teamName != "No Record"){
              this.setState({TeamName: data.teamName})
            } else {
              fetch('https://www.thebluealliance.com/api/v2/team/frc' + this.props.team + '?X-TBA-App-Id=frc5752:scouting-system:beta')
              .then(function(response){
                response.json().then(function(data){
                  this.setState({TeamName: data.nickname})
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

  selectTeam(){
    window.pitData.currentSelectedTeam = this.props.team

    for(let i = 0; i < document.getElementById('pit-teamlist').children.length; i++){
      document.getElementById('pit-teamlist').children[i].children[0].style.backgroundColor = "#CAD2C5"
    }

    document.getElementById('pitTeam-' + this.props.team).style.backgroundColor = "#3EDBB2"
  }

  render() {
    return (
      <div>
        <div class="pit-teamlist-elem" id={"pitTeam-" + this.props.team} onClick={this.selectTeam}>{this.props.team} - {this.state.TeamName}</div>
      </div>
    );
  }
}
