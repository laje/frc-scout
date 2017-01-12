import React from "react";
/*
  Half-Cirlce progress indicator.
  Expects Props [
    "Element" => The element Name
    "Percent" => The percentage of completion of the given element
    "Color" => The color of the half circle
      (Defaults to #229954)
    "BgColor" => The color of the background
      (Defaults to #CAD2C5)
  ]
*/

export default class HalfCircle extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      el: this.props.element,
      col: "#fff",
      bgCol: "#CAD2C5"
    }

    if( this.props.color ) { this.state.col = this.props.color }
  }

  render(){
    const dtc = 78.25
    const circleStyle = {
      strokeDasharray: dtc * 2,
      //Switch to x + y instead in order to put the half circle above.
      strokeDashoffset: ((dtc * 2) - (dtc * Math.floor(this.props.percent) / 100))
    }

    return(
      <div class='svg-container'>
        <svg width="200" height="175">
          <path style={circleStyle} id={"gr-" + this.props.element} stroke={this.state.col} strokeWidth="115"
              d="
              M 150, 100
              m -75, -25
              a 25,25 0 1,0 50,0
              a 25,25 0 1,0 -50,0
              "
          />
          <circle id="ci" fill={this.state.bgCol} r="40" cy="75" cx="100"/>
          <text fontSize="18px" x="16" y="45">
            {"|  " + this.state.el}
          </text>
          <text fontSize="24px" fontFamily="Courier New" x="82.5" y="80">
            {Math.floor(this.props.percent) + "%"}
          </text>
          <line stroke="#000" strokeWidth="2px" x1="17.5" x2="60" y1="72.5" y2="72.5"/>
          <line stroke="#000" strokeWidth="2px" x1="140" x2="182.5" y1="72.5" y2="72.5"/>
        </svg>
      </div>
    )
  }
}
