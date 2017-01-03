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

import react from "React";

export default class HalfCircle extends React.component{
  constructor(props){
    super(props)

    let ce = document.getElementById("gr-" + this.props.element);
      function tick(x){
        ce.style.strokeDasharray = x;
        //475-238 is half. % => (238+[%*238])
        let q = 238 + (this.props.completion*238)
          if(x>q){setTimeout(function(){
            tick(x-1)}, 1);
          }
      }
    tick(475);
  }
  render(){
    bgcol = "#CAD2C5";
    if this.props.element{
      bgcol = this.props.element;
    }

    col = "#229954";
    if this.props.color{
      col = this.props.element;
    }

    return(
      <svg width="400" height="400">
        <path id="gr-{this.props.element}" stroke="#fff" fill="{col}" stroke-width="115"
            d="
            M 100, 100
            m -75, 0
            a 75,75 0 1,0 150,0
            a 75,75 0 1,0 -150,0
            "
        />
        {/*Covers the center. If you want the full circle shown, remove this.*/}
        <circle id="ci" fill="{bgcol}" r="25" cy="100" cx="100"/>
      </svg>
    )
  }
}
