var ndx;
ndx = 0;

var tb;
tb = false;

activePlayers = {
  "allies":{
    "1":"5752",
    "2":"5753",
    "3":"5754",
  },
  "enemies":{
    "1":"5755",
    "2":"5756",
    "3":"5757",
  }
};

$(document).keydown(function(k){
  var cc = document.getElementById('input-data-' + ndx);
  var ct = document.getElementById('input-team-' + ndx);

  $ct = ('#input-team-0');
  console.log(k);
  console.log($ct);
  if ((tb == true && cc.val != 'What Happened?') && (r.target = $ct)){
    alert("!");
  }
});

$(document).keydown(function(e) {
    if(e.which == 13 || e.which == 9) {
      tb = true;
      var cc = document.getElementById('input-data-' + ndx);
      var ct = document.getElementById('input-team-' + ndx);
      if (cc.value != 'What Happened?' && ct.value != 'Which Team?'){
        ndx++;
        tb = false;
        var newContentInput = '<div id="input-container-' + ndx + '" class="input-container"><input id="input-data-' + ndx + '" value="What Happened?" class="live-input data"><input id="input-team-' + ndx + '" value="Which Team?" class="live-input team"><span id="rm-btn-' + ndx + '" class="remove-input-button">X</div></div>';
        $('#content-input').append(newContentInput);
      }
    }
});
