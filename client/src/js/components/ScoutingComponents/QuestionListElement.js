import React from "react";

export default class QuestionListElem extends React.Component {
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.updateRadioSelection = this.updateRadioSelection.bind(this)
    let questionOpts = []

    this.state = {input: ""}

    if(this.props.questionType == "radio"){
      for(let i = 0; i < this.props.answerOptions.length; i++){
        questionOpts.push(
          <div key={i} class="button-tag" id={'pitRadio-' + this.props.answerOptions[1] + "-" + this.props.identifier}>
            <input
              type='radio'
              name={"group-" + this.props.identifier}
              value={this.props.answerOptions[i]}
              onClick={this.updateRadioSelection}
            />
            <span>{this.props.answerOptions[i]}</span>
          </div>
        )
      }
    }
    else if(this.props.questionType == "text"){
      questionOpts.push(
        <div key={this.props.identifier} class="text-input-container" id={'pitText-' + this.props.identifier}>
          <span class="text-tag">Input: </span>
          <input type="text" value={this.state.inputValue} onChange={this.onChange} id={"pitTextInput-" + this.props.identifier}/>
        </div>
      )
    }

    this.state = {qops: questionOpts}
  }

  updateRadioSelection(){
    for(let i = 0; i < document.getElementById('buttonGroup-' + this.props.identifier).children.length; i++){
      if (document.getElementById('buttonGroup-' + this.props.identifier).children[i].children[0].checked == true){
        window.pitData.chosenOptions[this.props.identifier] = document.getElementById('buttonGroup-' + this.props.identifier).children[i].children[0].value
      }
    }
  }

  onChange(e){
    const newText = e.target.value;

    window.pitData.chosenOptions[this.props.identifier] = newText
    this.setState({inputValue: newText});
  }

  render() {
    return (
      <div class="question-group-c">
        <div class="question-group">
          <div class="title-group">
            <div class="titlegroup main">
              {this.props.displayText}
            </div>
            <div class="titlegroup sub">
              {this.props.questionText}
            </div>
          </div>
          <form class='button-group' id={'buttonGroup-' + this.props.identifier}>
            {this.state.qops}
          </form>
        </div>
      </div>
    );
  }
}
