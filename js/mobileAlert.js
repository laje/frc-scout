var bt;
$(window).scroll(function(){
  if($(document).scrollTop() <= 256){
    $('#mobile-notification').css('bottom', '0px')
  }
  if($(document).scrollTop() >= 256){
    bt = (256 - ($(document).scrollTop()))
    $('#mobile-notification').css('bottom', (bt + 'px'))
  }
});


$(window).ready(function(){
  if(jQuery.browser.mobile == false){
    $('#mobile-notification').addClass('hidden');
  }
});
