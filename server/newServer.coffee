express = require('express')
ex = express()
fs = require('fs')

ex.use( (req, res, next) ->
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
)

getItems = (req) ->
  console.log(req)
  if req.ream != null then return readDb("team", req.team, null) else if req.competition != null then readDb("competition", null, req.competition) else readDb("all", null, null)

readDb = (url = "all", team, comp) ->
  console.log("#{url}, #{team}, #{comp}")
  fs.readFile("#{__dirname}/db.json", 'utf8', (err, data) ->
    if err then console.log(err)
    return switch url
      when "team" then dbTeam(data, team)
      when "competition" then dbComp(data, comp)
      when "all" then data
      else "Error"
  )

dbTeam = (data, team="all") ->
  data = JSON.parse(data)
  if team is "all"
    return data.teams
  else
    return data.teams["" + team]

dbComp = (data, comp="all") ->
  return data.competition

ex.get('/read', (req, res) ->
  res.end(JSON.stringify(getItems(req.query)))
  console.log(readDb("team", 5752))
)

server = ex.listen(8081, () ->
  host = server.address().address
  port = server.address().port

  console.log("Server Online~ [#{host}:#{port}]")
)
