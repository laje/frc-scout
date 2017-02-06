<?php
$ch = curl_init();
$url = str_split($_SERVER[PHP_SELF], 13);
$q = "";

for( $i = 1; $i < sizeof($url); $i++ ) {
  $q .= $url[$i];
}

curl_setopt($ch, CURLOPT_URL, "http://localhost:8081/$q?$_SERVER[QUERY_STRING]");
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
?>
