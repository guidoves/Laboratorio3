<?php
header('Content-Type: text/html; charset=utf-8');
$nombre = $_POST['nombre'];
$edad = $_POST['edad'];

sleep(3);

echo "Te llamas ". $nombre ." y tenes ". $edad ." años.";

 
?>