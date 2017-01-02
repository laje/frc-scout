import React from "react";

export default class Home extends React.Component {
  render() {
    return (
      <div class='dynamic-page-container'>
        <h1 class='dynamic-page-header' id='header-home'> FRSCT - Home </h1>
        <h3>What is this thing?</h3>
        <p>
          The idea behind an accesable scouting application for the team is something that I believe is both interesting and valuable. If we are better able to keep track of the other teams at the competition, we could have a better chance at success. The ability to plan for our matches could potentialy be very valuable, since our strategy could be changed to coperate better with our allies and possibly combat our opponents' strengths.
        </p>
        <h3>Development on other platforms</h3>
        <p>
          The server backend for this app admitedly isn't the most robust. However, I had the primary intention of making something that can be accessed from any platform so that it's completely possible to make a client application for essentially any platform. Requests to the server are responded to with JSON objects, a widely observed data standard. Pretty much every programming language has native support or community projects for supporting this notation. <a class='inline' href='http://www.oracle.com/technetwork/articles/java/json-1973242.html'>(Android)</a> <a class='inline' href='https://developer.apple.com/swift/blog/?id=37'>(iOS</a> - <a class='inline' href='https://github.com/Alamofire/Alamofire'>Look at this, too)</a>.
        </p>
        <h3>Practical offline use</h3>
        <p>
          Still in progress, but this model can be used to easily create something that will work offline. If someone want's to bring a laptop and record what teams are doing in the game, it's unlikely they will have access to WiFi the whole time, so it's important that offline funtionality is a thing. I plan on implementing this using <a class='inline' href='http://electron.atom.io'> Electron</a>, and keeping local database records, so people aren't left in the dark. Syncing up wouldn't be too hard after that, so yeah. Just keep record of new entries and push them to the server once online again.
        </p>
      </div>
    );
  }
}
