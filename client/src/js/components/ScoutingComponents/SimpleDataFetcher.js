import React from "react";

import SimpleData from "./SimpleDataObject.js";

export default class CurrentData extends React.Component {
  constructor(props){
    super(props);

    this.state = {compData: <p>No database connection...</p>}

    let compEls = [];
    let winLoss = "[   ]"

    fetch('http://localhost:8081/read?team=' + this.props.query.t)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error: ' +
              response.status);
            return;
          }
          response.json().then(function(data) {
            let scoutData = data.scout.pit
            winLoss = (data.teamRecord.win + "/" + data.teamRecord.loss + "/" + data.teamRecord.tie);
            for(let i = 0; i < Object.keys(scoutData).length; i++){
              let item = Object.keys(scoutData)[i]
              compEls.push(<SimpleData key={i} data={{
                'id': i,
                'elem': item,
                'data': scoutData[item]
              }}/>);
            }

            this.setState({compData: compEls, winLoss: winLoss});
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
        <h3> Current Data on Team #{this.props.query.t} ({this.state.winLoss})</h3>
        <div id='display-data-list'>
          {this.state.compData}
        </div>
      </div>
    );
  }
}
