import React from "react";

export default class SimpleData extends React.Component {
  constructor(props){
    super(props)
    let content = this.props.data;

    content.li = "li-" + content.elem;
    content.lie = "lie-" + content.elem;
    content.bu = "bu-" + content.elem;
    content.bue = "bue-" + content.elem;

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
    console.log(this.state)
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
    alert("This doesn't work! Your change of " + this.state.content.elem + " to " + this.state.content.data + " did not go through!")
  }

  render() {
    return (
      <div class='display-data-container'>
        <div class='display-data-element'>
          <span class='display-data-contents elem'>{this.state.content.elem}</span>
          <span class='display-data-contents data' id={this.state.content.li}>{this.state.content.data}</span>
          <input type='text' class='hidden' value={this.state.content.data} onChange={this.onChange} id={this.state.content.lie}/>
          <span class='display-data-contents edit' id={this.state.content.bu} onClick={this.openEditData.bind(this)}>edit</span>
          <span class='hidden' id={this.state.content.bue} onClick={this.closeEditData.bind(this)}>done</span>
        </div>
      </div>
    )
  }
}
