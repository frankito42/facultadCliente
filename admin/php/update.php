<?php
require "../../conn/conn.php";

// Obtén los datos enviados desde el formulario de edición
$idp = $_POST['idPxd'];
$nuevo_titulo = $_POST['tituloUp'];
$nuevo_texto = $_POST['textoUp'];

// Consulta SQL para actualizar la publicación
$sql = "UPDATE publicaciones
        SET titulo = :nuevo_titulo, texto = :nuevo_texto
        WHERE idP = :idP";

// Preparar la consulta
$stmt = $conn->prepare($sql);
$stmt->bindParam(':nuevo_titulo', $nuevo_titulo);
$stmt->bindParam(':nuevo_texto', $nuevo_texto);
$stmt->bindParam(':idP', $idp);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode("ok");
} else {
    echo json_encode("Error al actualizar la publicación.");
}
?>
