<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sqlOtros = "SELECT otros.id_Otro, otros.nombre, otros.estado, otros.descripcion, otros.precio, otros.imagen_Otro, compra_otros.estado_compra FROM otros, compra_otros WHERE otros.id_Otro = compra_otros.id_Otro AND otros.email_Usuario_Vendedor = '".$usuario."'";
    $resultOtros = $conexion->query($sqlOtros);
    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>";
    while ($fila = $resultOtros->fetch_assoc()) {
        extract($fila);
        $XML .= "<otro>";
            $XML .= "<id>".$id_Otro."</id>";
            $XML .= "<nombre>".$nombre."</nombre>";
            $XML .= "<estado>".$estado."</estado>";
            $XML .= "<descripcion>".$descripcion."</descripcion>";
            $XML .= "<precio>".$precio."</precio>";
            $XML .= "<imagen>".$imagen_Otro."</imagen>";
            $XML .= "<estadoCompra>".$estado_compra."</estadoCompra>";
        $XML .= "</otro>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>
