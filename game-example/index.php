<!DOCTYPE html>
<html><?php include('../globals/allPages.php'); ?>
  <head>
    <script src="gameJs.js"></script>
    <link href="style.css" rel="stylesheet">
  </head>
  <body>
    <div id="container">
      <h1 id="header-main" class="header">SCOUT: GAME</h1>
      <h2 id="header-stats" class="title">Participant Teams</h2>
      <div id="content-stats" class="primary stats-content">
        <!--Show the stats of the participating teams.-->
        <div id="stats-ally" class="stats-container">
          <div id="ally-1" class="stats ally">ally 1</div>
          <div id="ally-2" class="stats ally">ally 2</div>
          <div id="ally-3" class="stats ally">ally 3</div>
        </div>
        <div id="stats-enemy" class="stats-container">
          <div id="enemy-1" class="stats enemy">enemy 1</div>
          <div id="enemy-1" class="stats enemy">enemy 2</div>
          <div id="enemy-1" class="stats enemy">enemy 3</div>
        </div>
      </div>
      <h2 id="header-input" class="title">Match Details</h2>
      <div id="content-input" class="primary input-content">
        <div id="input-heading">Write about what's happening in the match as it happens.</div>
        <div id="input-container-0" class="input-container">
          <input id="input-data-0" value="What Happened?" class="live-input data">
          <input id="input-team-0" value="Which Team?" class="live-input team"><span id="rm-btn-0" class="remove-input-button">X  </span>
        </div>
      </div>
    </div>
  </body>
</html>