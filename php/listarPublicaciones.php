<?php
require "../conn/conn.php";
$sqlPublicaciones="SELECT * FROM `publicaciones` order by idP desc limit 3";
$res=$conn->prepare($sqlPublicaciones);
$res->execute();
$res=$res->fetchAll(PDO::FETCH_ASSOC);
$conn = null;
echo json_encode($res);
?>