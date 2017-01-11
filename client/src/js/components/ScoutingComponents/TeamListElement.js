import React from "react";

export default class TeamListElem extends React.Component {
  constructor(){
    super()
    this.selectTeam = this.selectTeam.bind(this)
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
        <div class="pit-teamlist-elem" id={"pitTeam-" + this.props.team} onClick={this.selectTeam}>{this.props.team}</div>
      </div>
    );
  }
}
