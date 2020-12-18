<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sqlElectonicas = "SELECT electronicas.id_Electronica, electronicas.nombre, electronicas.estado, electronicas.descripcion, electronicas.precio, electronicas.modelo, electronicas.tipo, electronicas.imagen_Electronica, compra_electronicas.estado_compra FROM electronicas, compra_electronicas WHERE electronicas.id_Electronica = compra_electronicas.id_Electronica AND electronicas.email_Usuario_Vendedor = '".$usuario."'";
    $resultElectronicas = $conexion->query($sqlElectonicas);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>";
    while ($fila = $resultElectronicas->fetch_assoc()) {
        extract($fila);
        $XML .= "<electronica>"; 
            $XML .= "<id>".$id_Electronica."</id>"; 
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<modelo>".$modelo."</modelo>";
            $XML .= "<tipo>".$tipo."</tipo>";
            $XML .= "<imagen>".$imagen_Electronica."</imagen>";
            $XML .= "<estadoCompra>".$estado_compra."</estadoCompra>";
        $XML .= "</electronica>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>