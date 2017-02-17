import React from "react";

export default class Game extends React.Component {
  constructor(props){
    super(props)

    let iS = {currentInput: "", lastpress: 0, active: false, newInputs: []}

    this.inputChanged = this.inputChanged.bind(this)
    this.checkKeyType = this.checkKeyType.bind(this)
    this.pushLine = this.pushLine.bind(this)

    if(this.props.location.query.t != undefined){
      iS.team = this.props.location.query.t
    } else {
      iS.team = prompt("Team not prespecified. Enter a team number: ")
    }

    this.state = iS
  }

  inputChanged(e){
    const val = e.target.value
    this.setState({currentInput: val});
  }

  pushLine(line){
    /*
    TODO: Server Post Request for New Data Line
    */

    fetch('https://' + window.url + '/writed?team=' + this.state.team + '&line=' + line)
    .then(function (response) { console.log(response) })
    //.then(function (res) { console.log(res) })
  }

  checkKeyType(target) {
    if(target.charCode==13){
      let d = new Date()
      let diff = d.getTime() - this.state.lastpress
      if( diff < 1000 ){
        this.pushLine(target.target.value)
        this.state.newInputs.push(<div key={target.target.value} class={"game-submitted-list"}>> {target.target.value}</div>)
        this.setState({lastpress: 0, currentInput: ""})
        target.target.value = ""
        document.getElementById('enteragain').className = "ea hidden"
      } else {
        this.setState({lastpress: d.getTime()})
        document.getElementById('enteragain').className = "ea"
        setTimeout(() => {
          document.getElementById('enteragain').className = "ea hidden"
        }, 1000)
      }
    }
  }

  render() {
    return (
      <div class='dynamic-page-container'>
        <h1 class='dynamic-page-header' id='header-game'> Game Scout </h1>
        <div id='new-inputs'>
          <h2 class='small-head'>New inputs</h2>
          {this.state.newInputs}
        </div>
        <textarea id="game-input" onChange={this.inputChanged} onKeyPress={this.checkKeyType}/>
        <div id="enteragain" class="ea hidden">⏎ Again to submit</div>
      </div>
    );
  }
}
