import React from "react";
import TeamListElem from "./TeamListElement.js";
import QuestionListElem from "./QuestionListElement.js"

export default class PitBase extends React.Component {
  constructor(props){
    super(props);

    this.submitData = this.submitData.bind(this)
    this.state = {items: {}}
    window.pitData = {pitTeams: [], chosenOptions: {}, currentSelectedTeam: null}

    fetch('https://' + window.url + '/read?competition=' + "Reading")
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error: ' +
              response.status);
            return;
          }
          response.json().then(function(data) {
            let teamsArr = data.participants
            let questionsObj = data.criteria

            let teamComponents = []
            if(this.props.t == undefined){
              for( let i = 0; i < teamsArr.length; i++ ){

                window.pitData.pitTeams.push(teamsArr[i])
                teamComponents.push(<TeamListElem
                  key={i}
                  team={teamsArr[i]}
                />)
              }
            } else {
              window.pitData.currentSelectedTeam = this.props.t
              teamComponents.push(<div class='pit-preselect'>
                <h3>Prespecified team: {this.props.t}</h3>
              </div>)
            }

            let questionsComponents = []
            for( let i = 0; i < questionsObj.length; i++ ){
              questionsComponents.push(<QuestionListElem
                key={i}
                identifier={questionsObj[i].id}
                displayText={questionsObj[i].display}
                questionText={questionsObj[i].question}
                questionType={questionsObj[i].type}
                answerOptions={questionsObj[i].options}
                />
              )
            }
            this.setState({teams: teamComponents, questions: questionsComponents})
          }.bind(this));
        }.bind(this)
      )
      .catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  submitData(){
    window.pitData.sTeamNumber = window.pitData.currentSelectedTeam
    let query = JSON.stringify(window.pitData)

    fetch('https://' + window.url + '/write?q=' + query)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error: ' +
              response.status);
            return;
          }
          response.json().then(function(data) {
            if(data.success){
              document.getElementById("successnotifier").className = "notifier notify"
              setTimeout(() => {
                document.getElementById("successnotifier").className = "notifier unnotify"
              }, 3500)
            } else {
              document.getElementById("failurenotifier").className = "notifier notify"
              setTimeout(() => {
                document.getElementById("failurenotifier").className = "notifier unnotify"
              }, 3500)
            }
          }.bind(this));
        }.bind(this)
      )
      .catch(function(err) {
        console.log('Fetch Error: ', err);
        document.getElementById("failurenotifier").className = "notifier notify"
        setTimeout(() => {
          document.getElementById("failurenotifier").className = "notifier unnotify"
        }, 3500)
      });
  }

  render() {
    return (
      <div>
      {/* Note that this mirrors the structure of QuestionListElement.js's export.
      It's contents it simply too remote to push through as an alternate case. */}
        <div class="question-group">
          <div class="title-group">
            <div class="titlegroup main">Which team is being scouted?</div>
            <div class="titlegroup sub">(Teams in this competition)</div>
          </div>
          <div id='pit-teamlist'>
            {this.state.teams}
          </div>
        </div>
        {this.state.questions}
        <div id="pit-submission-button-container" onClick={this.submitData}>
          <span id="pit-submission-button">
            Submit Data
          </span>
        </div>
      </div>
    );
  }
}
