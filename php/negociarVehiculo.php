<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $id = $_POST["id"];

    $sqlUpdateComra = "UPDATE compra_vehiculos SET email_Usuario_Comprador = '".$usuario."', estado_compra = 'Negociacion' WHERE id_Vehiculo='".$id."'";
    $resultUpdateCompra = $conexion->query($sqlUpdateComra);
    $sqlEmailUsuarioVendedor = "SELECT email_Usuario_Vendedor FROM vehiculos WHERE id_Vehiculo='".$id."'";
    $resultEmailUsuarioVendedor = $conexion->query($sqlEmailUsuarioVendedor);
    while ($fila = $resultEmailUsuarioVendedor->fetch_assoc()) {
        extract($fila);
        $sqlBuscaChats = "SELECT id FROM chats WHERE (email_comprador='".$usuario."' OR email_comprador ='".$email_Usuario_Vendedor."') AND (email_vendedor='".$usuario."' OR email_vendedor = '".$email_Usuario_Vendedor."')";
        $resultBuscaChats = $conexion->query($sqlBuscaChats);
        $numChats = $resultBuscaChats->num_rows;
        if ($numChats == 0) {
            $sqlCreaChat = "INSERT INTO chats (id, email_comprador, email_vendedor) VALUES ('', '".$usuario."', '".$email_Usuario_Vendedor."')";
            $resultCreaChat = $conexion->query($sqlCreaChat);
        } 
    } 
    if($resultUpdateCompra) {
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Empieza la negociación";
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "ERROR";
    }

    echo json_encode($respuesta);
    mysqli_close($conexion);
?>