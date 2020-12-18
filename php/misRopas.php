<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sqlRopas = "SELECT ropas.id_Ropa, ropas.nombre, ropas.estado, ropas.descripcion, ropas.precio, ropas.marca, ropas.talla, ropas.sexo, ropas.imagen_Ropa, compra_ropas.estado_compra FROM ropas, compra_ropas WHERE ropas.id_Ropa = compra_ropas.id_Ropa AND ropas.email_Usuario_Vendedor = '".$usuario."'";
    $resultRopas = $conexion->query($sqlRopas);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>";
    while ($fila = $resultRopas->fetch_assoc()) {
        extract($fila);
        $XML .= "<ropa>"; 
            $XML .= "<id>".$id_Ropa."</id>";
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<marca>".$marca."</marca>";
            $XML .= "<talla>".$talla."</talla>";
            $XML .= "<sexo>".$sexo."</sexo>";
            $XML .= "<imagen>".$imagen_Ropa."</imagen>";
            $XML .= "<estadoCompra>".$estado_compra."</estadoCompra>";
        $XML .= "</ropa>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>