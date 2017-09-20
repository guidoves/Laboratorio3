<?php
header('Content-Type: text/html; charset=utf-8');
$nombre = $_REQUEST['nombre'];
$edad = $_REQUEST['edad'];

sleep(3);

echo "Te llamas ". $nombre ." y tenes ". $edad ." años.";

 
?>