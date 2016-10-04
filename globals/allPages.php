<?php

// META, MOBILE DEVICES
$themeColor = '#E67E22';
  print "
        <meta name='theme-color' content='{$themeColor}'>
        <meta name='msapplication-navbutton-color' content='{$themeColor}'>

        <meta name='description' content='Team 5752 Scouting app prototype'>
        <meta name='keywords' content='FRC, FIRST, Scouting'>
        <meta name='author' content='Dan Lynch'>

        <title>frsct</title>
        <link rel='icon' type='image/png' href='/frc/res/appIcon.png'>
        "
        . //APLE GARBAGE
        "
        <meta name='apple-mobile-web-app-capable' content='yes'>
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent'>
        <link rel='apple-touch-icon' href='/frc/res/appIcon.png'>
        <link rel='apple-touch-startup-image' href='res/appIcon.png'>

        <div id='appleBar' class='hidden'></div>

  ";
  // IMPORT SCRIPTS THAT WILL BE USED ON ALL PAGES
  // Note: These will run at the BEGINNING of the load.
  print "
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>

        <script src='/frc/js/mobileAlert.js'></script>

        <script src='/frc/js/mobile.js'></script>
        "
        .//Andorid first, since that's where the detector for all mobile browsers is. I know it's sloppy, but it just isn't realistic to put three lines of code in their own file.
        "
        <script src='/frc/js/mobileAndroid.js'></script>
        <script src='/frc/js/mobileSafari.js'></script>
  ";

  print "
        <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,400i' rel='stylesheet'>
        <link href='/frc/globals/globalCss.css' rel='stylesheet'>
  ";
 ?>
