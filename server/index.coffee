express = require('express')
ex = express()
fs = require('fs')

ex.use( (req, res, next) ->
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
)

getItems = (req) ->
  return switch
    when req.team then readDb("team", req.team, null)
    when req.competition then readDb("competition", null, req.competition)
    else readDb()

readDb = (url = "all", team, comp) ->
  gdata = JSON.parse(fs.readFileSync("#{__dirname}/db.json", 'utf8', (err, data) -> if err then console.log(err)))
  return switch url
    when "team" then dbTeam(gdata, team)
    when "competition" then dbComp(gdata, comp)
    when "all" then gdata
    else "Error"

dbTeam = (data, team="all") ->
  if team is "all" then return data.teams
  else if !data.teams["#{team}"] then return({bad_team: team})
  else return data.teams["#{team}"]

dbComp = (data, comp="all") ->
  if comp is "all" then return data.competitions
  else return data.competitions["#{comp}"]

ex.get('/read', (req, res) ->
  console.log(req.query)
  res.end(JSON.stringify(getItems(req.query)))
  return
)

server = ex.listen(8081, () ->
  host = server.address().address
  port = server.address().port
  console.log("Server Online~ [#{host}:#{port}]")
)
