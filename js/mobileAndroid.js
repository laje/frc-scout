$(function(){
  if(jQuery.browser.mobile){
    document.getElementById('mobile-notification').className = "mobile-animation";
  }
});

if (window.matchMedia('(display-mode: standalone)').matches) {
  $('mobile-notification').addClass('hidden');
}
