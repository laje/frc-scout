express = require('express')
ex = express()
fs = require('fs')

ex.use( (req, res, next) ->
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
)

# READING THE DATABASE
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
  if team isnt "all" then data = cleanDbData(data, team)

  if team is "all" then return data.teams
  else if data.teams["#{team}"].teamName is "No Record" then return({bad_team: team})
  else return data.teams["#{team}"]

dbComp = (data, comp="all") ->
  if comp is "all" then return data.competitions
  else return data.competitions["#{comp}"]

ex.get('/read', (req, res) ->
  res.end(JSON.stringify(getItems(req.query)))
  return
)

# WRITING TO THE DATABASE
cleanDbData = (data, team) ->
  if !data.teams[team]? then data.teams[team] = {}

  if !data.teams[team].teamName? then data.teams[team].teamName = "No Record"
  if !data.teams[team].teamHome? then data.teams[team].teamHome = "No Record"
  if !data.teams[team].teamNumber? then data.teams[team].teamNumber = team
  if !data.teams[team].teamColour? then data.teams[team].teamColour = "#ffffff"
  if !data.teams[team].teamRecord? then data.teams[team].teamRecord = {win: 0, loss: 0, tie: 0}

  if !data.teams[team].scout? then data.teams[team].scout = {}

  if !data.teams[team].scout.pit? then data.teams[team].scout.pit = {}
  if !data.teams[team].scout.game? then data.teams[team].scout.game = {}

  return data

writeDb = (data) ->
  options = data.chosenOptions
  team = data.currentSelectedTeam

  dbData = JSON.parse(fs.readFileSync("#{__dirname}/db.json", 'utf8', (err, data) -> if err then console.log(err)))
  dbData = cleanDbData(dbData, team)

  for option in Object.keys(options)
    dbData.teams[team].scout.pit[option] = options[option]

  return saveData(dbData)

editDb = (data) ->
  val = data.value
  itm = data.element
  team = data.teamNumber

  dbData = JSON.parse(fs.readFileSync("#{__dirname}/db.json", 'utf8', (err, data) -> if err then console.log(err)))
  dbData = cleanDbData(dbData, team)

  dbData.teams[team].scout.pit[itm] = val

  saveData(dbData)

saveData = (data) ->
  if !fs.writeFileSync("#{__dirname}/db.json", JSON.stringify(data))? then return {success: true}

ex.get('/write', (req, res) ->
  if req.query.e? then res.end(JSON.stringify(editDb(JSON.parse(req.query.q))))
  else res.end(JSON.stringify(writeDb(JSON.parse(req.query.q))))
)

server = ex.listen(8081, () ->
  host = server.address().address
  port = server.address().port
  console.log("Server Online~ [#{host}:#{port}]")
)
