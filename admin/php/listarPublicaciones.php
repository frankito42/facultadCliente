<?php
require "../../conn/conn.php";
$sqlPublicaciones="SELECT * FROM `publicaciones` limit 10";
$res=$conn->prepare($sqlPublicaciones);
$res->execute();
$res=$res->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);
?>