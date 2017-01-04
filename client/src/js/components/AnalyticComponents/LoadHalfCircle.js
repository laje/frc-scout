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
  render(){
    let bgcol = "#CAD2C5";
    if( this.props.bgcol ) { bgcol = this.props.bgcol }

    let col = "#229954";
    if( this.props.color ) { col = this.props.color }

    let el = this.props.element
    let pcp = Math.floor(this.props.percent)

    let dtc = 78.25

    let circleStyle = {
      strokeDasharray: dtc * 2,
      //Switch to x + y instead in order to put the half circle above.
      strokeDashoffset: ((dtc * 2) - (dtc * pcp / 100))
    }

    return(
      <div>
        <svg width="200" height="175">
          <path style={circleStyle} id={"gr-" + this.props.element} stroke={col} strokeWidth="115"
              d="
              M 150, 100
              m -75, -25
              a 25,25 0 1,0 50,0
              a 25,25 0 1,0 -50,0
              "
          />
          {/*Covers the center. If you want the full circle shown, remove this.*/}
          <circle id="ci" fill={bgcol} r="40" cy="75" cx="100"/>
          <text fontSize="18px" x="16" y="45">
            {"|  " + el}
          </text>
          <text fontSize="24px" fontFamily="Courier New" x="82.5" y="80">
            {pcp + "%"}
          </text>
          <line stroke="#000" strokeWidth="2px" x1="17.5" x2="60" y1="72.5" y2="72.5"/>
          <line stroke="#000" strokeWidth="2px" x1="140" x2="182.5" y1="72.5" y2="72.5"/>
        </svg>
      </div>
    )
  }
}
