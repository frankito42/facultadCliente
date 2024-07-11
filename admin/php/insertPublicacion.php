<?php
require "../../conn/conn.php";

// Supongamos que los valores de la publicación son los siguientes:
$titulo = $_POST['titulo'];
$texto = $_POST['texto'];
$fecha = date("Y-m-dHis"); // Fecha actual
$fechaCol = date("Y-m-d"); // Fecha actual

// Verifica si se ha subido un archivo
if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] === UPLOAD_ERR_OK) {
    $archivo_temporal = $_FILES['archivo']['tmp_name']; // Ruta temporal del archivo
    $extension = pathinfo($_FILES['archivo']['name'], PATHINFO_EXTENSION); // Extensión del archivo

    // Generar un nombre único para el archivo
    $nombre_archivo = "$fecha.$extension"; // Ejemplo: publicacion_20240710104717.pdf

    // Carpeta donde se guardarán los archivos subidos
    $ruta_destino = 'uploads/' . $nombre_archivo;

    // Mover el archivo a la carpeta de destino
    if (move_uploaded_file($archivo_temporal, $ruta_destino)) {
        // Consulta SQL para insertar la publicación
        $sql = "INSERT INTO publicaciones (titulo, texto, direccion_archivo, fecha)
                VALUES (:titulo, :texto, :direccion_archivo, :fecha)";

        // Preparar la consulta
        $stmt = $conn->prepare($sql);

        // Asociar los valores a los marcadores de posición
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':texto', $texto);
        $stmt->bindParam(':direccion_archivo', $ruta_destino); // Guardamos la ruta del archivo
        $stmt->bindParam(':fecha', $fechaCol);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode("ok");
        } else {
            echo json_encode("Error al insertar la publicación.");
        }
    } else {
        echo json_encode("Error al mover el archivo.");
    }
} else {
    // No se subió ningún archivo
    echo json_encode("No se ha seleccionado ningún archivo.");
}
?>
