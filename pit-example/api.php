<?php
  $postData = $_POST['userData'];

  $jsonData = json_decode($postData);

  var_dump($jsonData);
?>
