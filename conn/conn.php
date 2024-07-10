<?php

$server = 'localhost';
$username = 'root';
$password = '';
$database = 'colegio';

try {
    $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
    $conn->exec("set names utf8");

} catch (PDOException $e) {
    die('Conexion fallida: lo sentimos mucho.'.$e->getMessage());
}
date_default_timezone_set('America/Argentina/Buenos_Aires');


?>