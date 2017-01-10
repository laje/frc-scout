import React from "react";
import TeamListElem from "./TeamListElement.js";
import QuestionListElem from "./QuestionListElement.js"

export default class PitBase extends React.Component {
  constructor(props){
    super(props);

    this.state = {items: {}}

    fetch('http://localhost:8081/read?competition=' + "TestCompetition")
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error: ' +
              response.status);
              console.log(response)
            return;
          }
          response.json().then(function(data) {
            let teamsArr = data.participants
            let questionsObj = data.criteria

            let teamComponents = []
            for( let i = 0; i < teamsArr.length; i++ ){
              teamComponents.push(<TeamListElem key={i} team={teamsArr[i]} />)
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
      </div>
    );
  }
}
