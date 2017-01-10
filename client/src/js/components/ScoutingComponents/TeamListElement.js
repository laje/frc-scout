import React from "react";

export default class TeamListElem extends React.Component {
  render() {
    return (
      <div>
        <div class='pit-teamlist-elem'>{this.props.team}</div>
      </div>
    );
  }
}
