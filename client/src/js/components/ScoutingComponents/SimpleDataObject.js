import React from "react";

export default class SimpleData extends React.Component {
  constructor(props){
    super(props)
    let content = this.props.data;

    this.state = {};
    this.state.content = content;

    this.onChange = this.onChange.bind(this);
    this.pushNewData = this.pushNewData.bind(this);
  }

  onChange(e){
    const newText = e.target.value;

    let ns = this.state;
    ns.content.data = newText;
    this.setState(ns);
  }

  openEditData(){
    // console.log(this.state)
    var domElem = document.getElementById("li-" + this.state.content.elem);
    var inputElem = document.getElementById("lie-" + this.state.content.elem);
    var buttonElem = document.getElementById("bu-" + this.state.content.elem);
    var buttonDoneElem = document.getElementById("bue-" + this.state.content.elem);

    domElem.className = "hidden";
    inputElem.className = "modify-data-contents";

    buttonElem.className = "hidden";
    buttonDoneElem.className = "display-data-contents close";
  }

  closeEditData(){
    var domElem = document.getElementById("li-" + this.state.content.elem);
    var inputElem = document.getElementById("lie-" + this.state.content.elem);
    var buttonElem = document.getElementById("bu-" + this.state.content.elem);
    var buttonDoneElem = document.getElementById("bue-" + this.state.content.elem);

    domElem.className = "displat-data-contents data";
    inputElem.className = "hidden";

    buttonElem.className = "display-data-contents edit";
    buttonDoneElem.className = "hidden";

    this.pushNewData();
  }

  pushNewData(){
    //TODO: ADD A POST REQ TO MODIFY THE DATABSE. THIS DOES NOTHING RIGHT NOW.
    let query = JSON.stringify({element: this.state.content.elem, value: this.state.content.data, teamNumber: this.props.data.teamNumber})

    fetch('http://' + window.url + '/write?e=true&q=' + query)
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
      <div class='display-data-container'>
        <div class='display-data-element'>
          <span class='display-data-contents elem'>{this.state.content.elem}</span>
          <span class='display-data-contents data' id={"li-" + this.props.data.elem}>{this.state.content.data}</span>
          <input type='text' class='hidden' value={this.state.content.data} onChange={this.onChange} id={"lie-" + this.props.data.elem}/>
          <span class='display-data-contents edit' id={"bu-" + this.props.data.elem} onClick={this.openEditData.bind(this)}>edit</span>
          <span class='hidden' id={"bue-" + this.props.data.elem} onClick={this.closeEditData.bind(this)}>done</span>
        </div>
      </div>
    )
  }
}
