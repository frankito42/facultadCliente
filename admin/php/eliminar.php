<?php
require "../../conn/conn.php";
$sqlDelete="DELETE FROM `publicaciones` WHERE `idP`=$_GET[id]";
$delete=$conn->prepare($sqlDelete);


if($delete->execute()){
    echo json_encode("ok");
}else{
    echo json_encode("Ocurrio un error. Intente neuvamente");
}

?>