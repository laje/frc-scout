<?php

//Define the name of the api forwarder here. Literally this file's name. It shouldn't change, to be honest.
$filename = 'api.php';

//Update to allow CORs. I didn't notice this until I tried to do something with another app.
//I think that this is all that's needed. Hopefully it doesn't cause any trouble.
header("Access-Control-Allow-Origin: *");

$ch = curl_init();

//i had to read like ten doc pages to figure out how to do this.
//tip of the iceberg yet still the least regular thing I've seen
preg_match('/'.$filename.'(.*)/', $_SERVER[PHP_SELF], $matches, PREG_OFFSET_CAPTURE);

$f = 'http://localhost:8081'.$matches[1][0].'?'.$_SERVER[QUERY_STRING];


curl_setopt($ch, CURLOPT_URL, $f);
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
