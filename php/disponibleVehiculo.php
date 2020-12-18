<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $id = $_POST["id"];

    $sqlUpdateComra = "UPDATE compra_vehiculos SET estado_compra = 'Disponible', email_Usuario_Comprador='' WHERE id_Vehiculo='".$id."'";
    $resultUpdateCompra = $conexion->query($sqlUpdateComra);

    if ($resultUpdateCompra) {
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Actualizado correctamente";
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "ERROR";
    }

    echo json_encode($respuesta);
    mysqli_close($conexion);
?>