import React from "react";

export default class QuestionListElem extends React.Component {
  constructor(props){
    super(props)

    let questionOpts = []

    if(this.props.questionType == "radio"){
      for(let i = 0; i < this.props.answerOptions.length; i++){
        questionOpts.push(
          <div key={i} class="button-tag">
            <input type='radio' name={"group-" + this.props.identifier} value={this.props.answerOptions[i]}/>
            <span>{this.props.answerOptions[i]}</span>
          </div>
        )
      }
    }
    else if(this.props.questionType == "text"){}

    this.state = {qops: questionOpts}
  }

  render() {
    return (
      <div class="question-group">
        <div class="title-group">
          <div class="titlegroup main">
            {this.props.displayText}
          </div>
          <div class="titlegroup sub">
            {this.props.questionText}
          </div>
        </div>
        <form class='button-group'>
          {this.state.qops}
        </form>
      </div>
    );
  }
}
