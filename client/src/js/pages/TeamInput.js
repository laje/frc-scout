import React from "react";

export default class Home extends React.Component {
  constructor(props){
    super(props)

    let team = this.props.location.query.t

  /*
  TODO: ASYNC DATA RETRIEVE
    qslcl = []
    for(i = 0; i < Object.keys(data.x).length; i++){
      qscl.push(<TeamInputQuestion
        question={Object.keys(data.x)[i]}
      />)
    }
  */
    this.submitServerData = this.submitServerData.bind(this)
  }

  submitServerData(team, data){
    /*
    TODO: PUSH NEW DATA TO SERVER
    */
  }

  render() {
    return (
      <div>
        <h2>
          Modify the primary data for
          <span class="scouter-head-team">
            Team#{this.props.location.query.t}
          </span>
        </h2>
        <div>
          {/*this.state.qs*/}
        </div>
      </div>
    );
  }
}
