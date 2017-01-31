import React from "react"

export default class ScoutingHeader extends React.Component {
  constructor(props){
    super(props)

    this.openPage = this.openPage.bind(this)
  }

  openPage(s){
    window.location.href = "#/" + s + "?t=" + this.props.team
  }

  render(){
    return(
      <div>
        <h2>Quick Actions</h2>
        <div id="scout-qamenu">
          <div class="scout-btn" id="sh-game">
            <span class="c" onClick={this.openPage.bind(this, "Game")}>
              Start Game Scout
            </span>
          </div>
          <div class="scout-btn" id="sh-pit" >
            <span class="c" onClick={this.openPage.bind(this, "Pit")}>
              Start Pit Scout
            </span>
          </div>
          <div class="scout-btn" id='sh-entry'>
            <span class="c" onClick={this.openPage.bind(this, "TeamIn")}>
              Modify Team Entry
            </span>
          </div>
        </div>
      </div>
    )
  }
}
