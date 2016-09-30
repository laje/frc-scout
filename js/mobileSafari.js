function appleDetect() {
    return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
}

$(document).ready(function(){
  if(appleDetect()){
    $('#appleBar').removeClass('hidden');
    $('#container').addClass('appleMargin');

    // if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
    //     $('#mobile-notification').addClass('hidden');
    //     alert('mobile-apple-pseudostandalone');
    // }
  }
});
