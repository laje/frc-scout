# Accessing Analytic Data
There are two simple functions in the analytic component here. One will give a value that represents an individual team's value, the other will compare two teams and give a number representing their compatibility.

+ [Individual](/#Individual)
+ [Comparison](/#Compare)

## Individual
### Determine an individual team's value
Required Parameters:

+ Team – the number of the team in question

Optional Parameters:

+ Vals – A JSON object with values of objectives specified. There is a default if none is replied.
+ Idnored – Objectives to be ignored by the calculator. Anything listed here will not be counted towards the total.

Simple Example Request
```javascript
~/value/5752
```
this will return a json object.
```javascript
{
  "Value": 165,
  "Components": [
    {
      "Element": MainPoint
      "BaseValue": 50,
      "Multiplier": 1,
      "Final": 50
    }, ...
  ]
}
```
As seen, the request includes a value, and an array of objects which go into detail about where the points are coming from.

A more complex request may look like this
```javascript
~/value/5752/{"ClimbRope":999, "GearScore":123}/GearScore
```
This request would evaluate our team on one objective: `ClimbRope`, since the only other value specified is `GearScore`, and that value is also ignored.

## Compare
### Determine the value of two teams working together
*\*Note that this is not based on performance, but on the robots' defining features.*

Required Parameters:

+ Team1 – The first of the two teams to compare
+ Team2 – The second of the two teams to compare.

*\*Team order does* ***not*** *matter.*

Optional Parameters:

**Currently Disabled.**

Example Request:
```javascript
~/compare/5752/1234
```
similar to the individual evaluator, this returns a json object.
```javascript
{
  "compatibility": 3.75,
  "similar": [
    {
      "element": "ClimbRope",
      "value": "Yes",
      "penalty": 12.5
    }, ...
  ],
  "different": [
    {
      "element": "CrossAuto",
      "values": [
        "Yes",
        "No"
      ],
      "award": 15
    }, ...
  ]
}
```
The returned object contains a value for the score, `compatibility`, an array of objects `similar`, which the two teams shared, and an array of objects `different`, containing the elements that the two teams did not share.
`Similar` and `Different` have the same structure, specifying the `element`, the `values` specified for each of the teams, and the `award` or `penalty` – which contain the value of points either credited or deducted from the total value.
