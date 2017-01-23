fs = require('fs')

exports.indVal = (t, v, i) ->
  if v? then v = JSON.parse(v)
  return getIndividualValue(t, v, i)

exports.compareTeams = (a, b) ->
  return checkCompliment(a, b)

getPitData = (team) ->
  j = JSON.parse(fs.readFileSync("#{__dirname}/db.json", 'utf8', (err, data) -> if err then console.log(err)))
  if j.teams[team].scout.pit? then return j.teams[team].scout.pit
  else return {"Error":"NoPitData"}

contains = (itm, arr) ->
  for i in arr
    if i is itm then return true
  return false

#These are the default values - I really don't know what we should prioritize, but I sort of just made these numbers up.
getIndividualValue = (team, vals = {"ClimbRope": 50,"LowGoal": 10,"HighGoal": 25,"GearScore": 20,"HopperCollect": 15,"CrossAuto": 15}, ignored=[]) ->
    data = getPitData(team)
    individualValue = 0
    for itm in Object.keys(data)
      if itm is "hidden" then return {"Hidden": true}
      if !contains(itm, ignored)
        ###Encompasses some (2) things:
            * Yes/No Options (Yes will default to a multiplier of 1, no modified to 0)
            * Autonomous Selection (Teleop defaults to 1, auto to 2, both to 2.25)###
        multiplier = switch data[itm]
          when "Auto" then 2
          when "Both" then 2.25
          when "No" then 0
          else 1
        if vals[itm]? then individualValue += vals[itm] * multiplier
        else console.log("ERROR: No value specified for item '#{itm}' (#{team})")
    return individualValue

checkMultiData = (data, itm, condition) ->
  if contains(data[0][itm], condition) then data[0][itm] = true
  if contains(data[1][itm], condition) then data[1][itm] = true

  return data

checkCompliment = (team1, team2, vals = {"ClimbRope": 50,"LowGoal": 10,"HighGoal": 25,"GearScore": 20,"HopperCollect": 15,"CrossAuto": 15}) ->
  checkedVals = []
  same = []
  diff = []
  compat = 0

  data = [getPitData(team1), getPitData(team2)]
  ###
  The idea here is that if only one of two teams posess some given attribute,
  that is a good thing. If both of the teams can do something, that is not
  going to benefit us as much in the competition. For example, a gear-bot and
  a shooter-bot would do well together, since they can actively focus on more
  than one objective. However, we don't want to penalize teams for being similar
  too harshly, since they might be able to do a lot of stuff.
  ###
  for itm in Object.keys(data[0])
    if itm is "hidden" then return {"Hidden": true}

    checkedVals.push(itm)
    if vals[itm]?
      data = checkMultiData(data, itm, ["Teleop", "Auto", "Both"])

      if data[0][itm] is data[1][itm]
        compat -= vals[itm]/4
        same.push({"element": itm, "value": data[0][itm], "penalty": vals[itm]/4})
      else
        compat += vals[itm]
        diff.push({ "element": itm, "values": [data[0][itm], data[1][itm]], "award": vals[itm] })

  for itm in Object.keys(data[1])
    if !contains(itm, checkedVals) and vals[itm]?
      data = checkMultiData(data, itm, ["Teleop", "Auto", "Both"])

      if data[0][itm] is data[1][itm]
        compat -= vals[itm]/4
        same.push({"element": itm, "value": data[0][itm], "penalty": vals[itm]/4})
      else
        compat += vals[itm]
        diff.push({ "element": itm, "values": [data[0][itm], data[1][itm]], "award": vals[itm] })

  res = {"compatibility": compat, "simmilar": same, "different": diff}
  return res
