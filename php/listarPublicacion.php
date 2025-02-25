<?php
require "../conn/conn.php";
$sqlPublicaciones="SELECT * FROM `publicaciones` where idP=$_GET[id]";
$res=$conn->prepare($sqlPublicaciones);
$res->execute();
$res=$res->fetch(PDO::FETCH_ASSOC);
$conn = null;
echo json_encode($res);
?>