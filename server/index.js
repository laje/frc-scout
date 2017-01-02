var express = require('express');
var app = express();
var fs = require('fs');

/*
 *  Adds a bit of information to the request header
 *  This allows for cross origin references.
 *  Potentially important for the way some other languages work with requests.
 *  Also important if we run the server on a different domain than the client.
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//HANDLES READING DATA FROM THE DATABASE
app.get('/read', function(req, res){
  console.log(req.query);

  /*
   *  Precise determination of an error.
   *  If there's no team or competition request information,
   *  Return an invalid response which lets the requester know they've screwed up.
   */
  if(!req.query.team && !req.query.competition){
    res.end('You\'ve clearly done something wrong.');
  /*
   * If the requested data is for a team's information
   */
  } else if(req.query.team){
    fs.readFile(__dirname + '/db.json', 'utf8', function ( err, data ){
      var data = JSON.parse(data);

      if (req.query.team === 'all'){
        res.end(JSON.stringify(data.teams));
      } else if(!data.teams[req.query.team]){
        badTeam = {
          "bad_team": req.query.team
        }
        res.end(JSON.stringify(badTeam));
      } else {
        res.end(JSON.stringify(data.teams[req.query.team]));
      }
    });
  /*
   *  If the requested data is for a competition's information
   */
  } else if(req.query.competition){
    fs.readFile(__dirname + '/db.json', 'utf8', function ( err, data ){
      var data = JSON.parse(data);

      if (req.query.competition === 'all'){
        res.end(JSON.stringify(data.competitions));
      } else if(!data.competitions[req.query.competition]){
        res.end('That competition does not exist.');
      } else {
        res.end(JSON.stringify(data.competitions[req.query.competition]));
      }
    });
  }
})

//HANDLES ALL ACTIONS FOR WRITING DATA
app.get('/write', function(req, res){
  res.end("Hello, /write !");
})

//DECLARES THE APP
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Send spicy memes to %s", host, port)

})
