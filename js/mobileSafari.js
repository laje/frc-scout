function appleDetect() {
    return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
}

$(document).ready(function(){
  if(appleDetect()){
    $('#appleBar').removeClass('hidden');
    $('#container').addClass('appleMargin');
  }

  if (("standalone" in window.navigator) && window.navigator.standalone) {
      document.getElementById('mobile-notification').className = "hidden";
  }
});
