<?php

//Define the name of the api forwarder here. Literally this file's name. It shouldn't change, to be honest.
$filename = 'api\.php';

//Update to allow CORs. I didn't notice this until I tried to do something with another app.
//I think that this is all that's needed. Hopefully it doesn't cause any trouble.
header("Access-Control-Allow-Origin: *");

$ch = curl_init();

preg_match('/'.$filename.'\/$|'.$filename.'$/', $_SERVER[PHP_SELF], $pl, PREG_OFFSET_CAPTURE);
if( $pl[0][1] > 0 ){
  $ne = true;
  echo("
  <style>
    *{
      font-family: 'Avenir', 'Source Sans Pro', 'Arial';
    }
    h1,h2,h3{
      text-align: center;
    }
    body{
      width: 70%;
      padding-left: 128px;
      line-height: 1.75;
    }
    code{
      font-family: 'Consolas', 'Courier New', 'Courier';
      background-color: rgba(0, 0, 0, 0.075);
      border-radius: 6px;
      padding: 2px 3px;
    }
    pre>code{
      background-color: #fff;
    }
  </style>
    <h1>
      Looks like you've sent an empty request.
    </h1>
    <h2>
      Here's how to use the API
    </h2>
    <h1>
      CRU Functions
    </h1>
    <h2><a id=\"Accessing_Data_0\"></a>Accessing Data</h2>
    <p>An <code>HTTP GET</code> request can be sent to the server in order to easily retrieve data from the server. The response will always be in <code>text/json</code>. There are two ways to retrieve data, shown as follows.</p>
    <h3><a id=\"Using_Query_Strings_2\"></a>Using Query Strings</h3>
    <p>A request can be sent to <code>~/read</code>, with the following parameters specified.</p>
    <ul>
    <li><code>team</code> or <code>competition</code>, set equal to the desired team or competition. Alternatively, <em>all</em> can be requested, returning the entire set of teams or competitions, respectively.</li>
    <li>If no parameters are specified in the query, the entire data set will be returned.</li>
    </ul>
    <p>Example:</p>
    <pre><code>~/read?team=5752
    </code></pre>
    <p>will return</p>
    <pre><code>{
      &quot;teamName&quot;: &quot;BevBotics&quot;,
      &quot;teamNumber&quot;: 5752,
      &quot;teamHome&quot;: &quot;Beverly, MA&quot;,
      &quot;teamColour&quot;: &quot;#E67E22&quot;,
      &quot;teamRecord&quot;: {
        &quot;win&quot;: 0,
        &quot;loss&quot;: 0,
        &quot;tie&quot;: 0
      },
      &quot;scout&quot;: {
        &quot;game&quot;: [],
        &quot;pit&quot;: {
          &quot;ClimbRope&quot;: &quot;Yes&quot;,
          &quot;OtherElem&quot;: ...
        }
      },
    }
    </code></pre>
    <h3><a id=\"Using_URL_32\"></a>Using URL</h3>
    <p>Any request to <code>~/read2</code> will not accept query string parameters. Instead, requests should be formatted like so: <code>~/read2/[type]/[spec]</code>.<br>
    Required parameters are naturally:</p>
    <ul>
    <li><code>type</code>, either <em>comp</em> or <em>team</em>. Each doing exactly what you would expect.</li>
    <li><code>spec</code>, the specific element to target. If <code>team</code> is the specified type, then a <em>team number</em> is expected. If <code>comp</code> is specified, a <em>competition name</em> is expected.</li>
    </ul>
    <h2><a id=\"Adding_New_Data_and_Modifying_Existing_Data_39\"></a>Adding New Data and Modifying Existing Data</h2>
    <blockquote>
    <p>As of current, only scouting data can be modified. <em>competition</em> and <em>team</em> data <strong>cannot</strong> be modified.</p>
    </blockquote>
    <p>An <code>HTTP GET</code> or <code>POST</code> request to <code>~/write</code> can be made to write to the database. If you do this in any way, then the structure for the specified team will be created if it does not exist (Currently immutatable elements included).</p>
    <p>A strung query of <code>JSON</code> is expected. The required parameters are</p>
    <ul>
    <li><code>sTeamNumber</code>, the selected team number. Quite simply, this specifies which team to target.</li>
    <li><code>chosenOptions</code>, an <em>object</em> in the format</li>
    </ul>
    <pre><code>{
      &quot;optionName&quot;: &quot;optionValue&quot;,
      ...
    }
    </code></pre>
    <p>with as many options as you wish specified.</p>
    <ul>
    <li>To write to the GameScout dataset, an external <code>game</code> parameter must be set to <code>true</code>.</li>
    </ul>
    <p>Example: A team has been scouted and the data for <code>GearAuto</code> needs to be changed to <code>true</code> for team <code>5752</code>.</p>
    <pre><code>~/write?q={&quot;chosenOptions&quot;:{&quot;GearAuto&quot;: true}, &quot;sTeamNumber&quot;: 5752}
    </code></pre>
    <p>This will modify the correct values.</p>
    <h2><a id=\"Mark_Values_as_Hidden_63\"></a>Mark Values as Hidden</h2>
    <p>Complete removal is essentially pointless. There should not be any situation where data is deleted. It can simply be overwritten as specified previously. If, for whatever, reason, a hide needs to be executed, a dataset and all of it’s children can be marked as hidden.</p>
    <p>An <code>HTTP DELETE</code> request must be sent to <code>~/rm</code>.<br>
    The expected format is <code>~/rm/[type]/[param1]/...</code><br>
    Up to four additional parameters can be specified, though only one is required.</p>
    <ul>
    <li><code>Type</code> must be either <em>comp</em> or <em>team</em>.</li>
    <li><code>param1</code> must be either the <em>team number</em> or <em>competition name</em></li>
    <li>Params 2-4 must be following children elements.</li>
    </ul>
    <p>Example:</p>
    <pre><code>~/rm/team/5752/scout/pit/GearAuto
    </code></pre>
    <p>will target our team’s pit scout element <em>GearAuto</em>.</p>

    <h1><a id=\"Accessing_Analytic_Data_0\"></a>Accessing Analytic Data</h1>
    <p>There are two simple functions in the analytic component here. One will give a value that represents an individual team’s value, the other will compare two teams and give a number representing their compatibility.</p>
    <h2><a id=\"Individual_6\"></a>Individual</h2>
    <h3><a id=\"Determine_an_individual_teams_value_7\"></a>Determine an individual team’s value</h3>
    <p>Required Parameters:</p>
    <ul>
    <li>Team – the number of the team in question</li>
    </ul>
    <p>Optional Parameters:</p>
    <ul>
    <li>Vals – A JSON object with values of objectives specified. There is a default if none is replied.</li>
    <li>Idnored – Objectives to be ignored by the calculator. Anything listed here will not be counted towards the total.</li>
    </ul>
    <p>Simple Example Request</p>
    <pre><code class=\"language-javascript\">~<span class=\"hljs-regexp\">/value/</span><span class=\"hljs-number\">5752</span>
    </code></pre>
    <p>this will return a json object.</p>
    <pre><code class=\"language-javascript\">{
      <span class=\"hljs-string\">\"Value\"</span>: <span class=\"hljs-number\">165</span>,
      <span class=\"hljs-string\">\"Components\"</span>: [
        {
          <span class=\"hljs-string\">\"Element\"</span>: MainPoint
          <span class=\"hljs-string\">\"BaseValue\"</span>: <span class=\"hljs-number\">50</span>,
          <span class=\"hljs-string\">\"Multiplier\"</span>: <span class=\"hljs-number\">1</span>,
          <span class=\"hljs-string\">\"Final\"</span>: <span class=\"hljs-number\">50</span>
        }, ...
      ]
    }
    </code></pre>
    <p>As seen, the request includes a value, and an array of objects which go into detail about where the points are coming from.</p>
    <p>A more complex request may look like this</p>
    <pre><code class=\"language-javascript\">~<span class=\"hljs-regexp\">/value/</span><span class=\"hljs-number\">5752</span>/{<span class=\"hljs-string\">\"ClimbRope\"</span>:<span class=\"hljs-number\">999</span>, <span class=\"hljs-string\">\"GearScore\"</span>:<span class=\"hljs-number\">123</span>}/GearScore
    </code></pre>
    <p>This request would evaluate our team on one objective: <code>ClimbRope</code>, since the only other value specified is <code>GearScore</code>, and that value is also ignored.</p>
    <h2><a id=\"Compare_43\"></a>Compare</h2>
    <h3><a id=\"Determine_the_value_of_two_teams_working_together_44\"></a>Determine the value of two teams working together</h3>
    <p><em>*Note that this is not based on performance, but on the robots’ defining features.</em></p>
    <p>Required Parameters:</p>
    <ul>
    <li>Team1 – The first of the two teams to compare</li>
    <li>Team2 – The second of the two teams to compare.</li>
    </ul>
    <p><em>*Team order does</em> <strong><em>not</em></strong> <em>matter.</em></p>
    <p>Optional Parameters:</p>
    <p><strong>Currently Disabled.</strong></p>
    <p>Example Request:</p>
    <pre><code class=\"language-javascript\">~<span class=\"hljs-regexp\">/compare/</span><span class=\"hljs-number\">5752</span>/<span class=\"hljs-number\">1234</span>
    </code></pre>
    <p>similar to the individual evaluator, this returns a json object.</p>
    <pre><code class=\"language-javascript\">{
      <span class=\"hljs-string\">\"compatibility\"</span>: <span class=\"hljs-number\">3.75</span>,
      <span class=\"hljs-string\">\"similar\"</span>: [
        {
          <span class=\"hljs-string\">\"element\"</span>: <span class=\"hljs-string\">\"ClimbRope\"</span>,
          <span class=\"hljs-string\">\"value\"</span>: <span class=\"hljs-string\">\"Yes\"</span>,
          <span class=\"hljs-string\">\"penalty\"</span>: <span class=\"hljs-number\">12.5</span>
        }, ...
      ],
      <span class=\"hljs-string\">\"different\"</span>: [
        {
          <span class=\"hljs-string\">\"element\"</span>: <span class=\"hljs-string\">\"CrossAuto\"</span>,
          <span class=\"hljs-string\">\"values\"</span>: [
            <span class=\"hljs-string\">\"Yes\"</span>,
            <span class=\"hljs-string\">\"No\"</span>
          ],
          <span class=\"hljs-string\">\"award\"</span>: <span class=\"hljs-number\">15</span>
        }, ...
      ]
    }
    </code></pre>
    <p>The returned object contains a value for the score, <code>compatibility</code>, an array of objects <code>similar</code>, which the two teams shared, and an array of objects <code>different</code>, containing the elements that the two teams did not share.<br>
    <code>Similar</code> and <code>Different</code> have the same structure, specifying the <code>element</code>, the <code>values</code> specified for each of the teams, and the <code>award</code> or <code>penalty</code> – which contain the value of points either credited or deducted from the total value.</p>

    <div style='display: none'>
  ");
}

//i had to read like ten doc pages to figure out how to do this.
//tip of the iceberg yet still the least regular thing I've seen
preg_match('/'.$filename.'(.*)/', $_SERVER[PHP_SELF], $m, PREG_OFFSET_CAPTURE);

$f = 'http://localhost:8081'.$m[1][0].'?'.$_SERVER[QUERY_STRING];


curl_setopt($ch, CURLOPT_URL, $f);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$urlContent = curl_exec($ch);

if(!curl_errno($ch))
{
   $info = curl_getinfo($ch);
   header('Content-type: '.$info['content_type']);
   echo $urlContent;
}
curl_close($ch);
if($ne == true){
  echo('</div>');
}
?>
