function radioOption(option, value) {
    //get the active option for the form input element.
    var activeOption = document.getElementById('option-' + option);
    //define the two options, yes and no (according to the standard template).
    var activeYes = document.getElementById('option-' + option + '-yes');
    var activeNo = document.getElementById('option-' + option + '-no');

    var activeInputBox = document.getElementById('variable-' + option);
    //set the value of the form option
    //set the clicked buttons class names to the corect ones
    //*important* don't use className +=, in case the user clicks one option and then the other.

    if (value == true) {
        activeOption.value = "true";

        activeInputBox.readOnly = false;
        activeInputBox.className = "variable-option";

        activeYes.className = "option-button options-yes pronounced";
        activeNo.className = "option-button options-no faded";
    } else {
        activeOption.value = "false";

        activeInputBox.readOnly = true;
        activeInputBox.className += " disable";
        activeInputBox.value = 0

        activeNo.className = "option-button options-no pronounced";
        activeYes.className = "option-button options-yes faded";

    }
}

function toggleOption(option) {
    var activeOption = document.getElementById('option-' + option);
    var obstacleOption = document.getElementById('option-obstacle-' + option);

    if (activeOption.on == true) {
        activeOption.className = "option-button options-yes";
        obstacleOption.value = "false";
        activeOption.on = false;
    } else {
        activeOption.className = "option-button options-yes pronounced";
        obstacleOption.value = "true";
        activeOption.on = true;
    }
}

var jsonObject = null;

function submitData(){
    jsonObject = {"userData":{
      "teamnumber":document.getElementById('variable-team').value,
      "highGoalBool":document.getElementById('option-highgoal').value,
      "highGoalVal":document.getElementById('variable-highgoal').value,
      "lowGoalBool":document.getElementById('option-lowgoal').value,
      "lowGoalVal":document.getElementById('variable-lowgoal').value,
      "portcullis":document.getElementById('option-obstacle-portcullis').value,
      "cheval":document.getElementById('option-obstacle-cheval').value,
      "moat":document.getElementById('option-obstacle-moat').value,
      "rampart":document.getElementById('option-obstacle-rampart').value,
      "drawbridge":document.getElementById('option-obstacle-drawbridge').value,
      "sallyport":document.getElementById('option-obstacle-sallyport').value,
      "terrain":document.getElementById('option-obstacle-terrain').value,
      "rockwall":document.getElementById('option-obstacle-rockwall').value,
      "lowbar":document.getElementById('option-obstacle-lowbar').value,
      "wheeltype":document.getElementById('variable-wheels').value,
    }};

    // $.ajax({
    //   dataType: "json",
    //   url: "api.php",
    //   data: jsonObject,
    //   success: function(result){
    //     console.log(result);
    //   }
    // });

    console.log("sent the following JSON object: " + jsonObject);
    console.log(jsonObject);

    prompt("I didn't write a backend for this. If you actually want to save the data, copy this json object and save it in a document or something." , JSON.stringify(jsonObject));

    return true;
}
