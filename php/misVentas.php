<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sqlVenta = "SELECT usuarios.nomUsuario, vehiculos.nombre, compra_vehiculos.chat FROM usuarios, vehiculos, compra_vehiculos WHERE usuarios.email = compra_vehiculos.email_Usuario_Comprador AND vehiculos.id_Vehiculo = compra_vehiculos.id_Vehiculo AND vehiculos.email_Usuario_Vendedor='".$usuario."' AND compra_vehiculos.estado_compra='Negociacion'";
    $resultVenta = $conexion->query($sqlVenta);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>";
    while ($fila = $resultVenta->fetch_assoc()) {
        extract($fila);
        $XML .= "<venta>"; 
            $XML .= "<nombreUsuario>".$nomUsuario."</nombreUsuario>";
            $XML .= "<nombreProducto>".$nombre."</nombreProducto>";
            $XML .= "<chat>".$chat."</chat>";
        $XML .= "</venta>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>