<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $marca = $_POST["marca"];
    $talla = $_POST["talla"];
    $sexo = $_POST["sexo"];

    
    $modProducto = "UPDATE ropas SET nombre = '".$nombre."', estado = '".$estado."',descripcion = '".$descripcion."',precio = '".$precio."',marca = '".$marca."',talla = '".$talla."',sexo = '".$sexo."' WHERE id_Ropa='".$id."'";
    $resultProducto = $conexion->query($modProducto);

    

    if (!empty($_FILES["imagen"]["name"])) {
        $nombreImagen = $_FILES["imagen"]["name"]; //Acceder a $_FILES directamente sin variable
        $tipoImagen = $_FILES["imagen"]["type"];
        $tamañoImagen = $_FILES["imagen"]["size"];
        //Limitamos el tamaño de la imagen
        if ($tamañoImagen <= 2000000) {
            //Limitamos el tipo de imagen
            if ($tipoImagen == "image/jpeg" || $tipoImagen == "image/jpg" || $tipoImagen == "image/png") {
                //Ruta de la carpeta destino en servidor
                $carpetaDestino = $_SERVER["DOCUMENT_ROOT"] . "/TFG/Codigo/imgRopas/";
                //Movemos la imagen de la carpeta temporal a la carpeta destino
                move_uploaded_file($_FILES['imagen']['tmp_name'], $carpetaDestino.$nombreImagen);
                $modImagen = "UPDATE ropas SET imagen_Ropa= '".$nombreImagen."' WHERE id_Ropa='".$id."'";
                $resultImagen = $conexion->query($modImagen);
                if ($resultProducto && $resultImagen) {
                    $respuesta["error"] = 0;
                    $respuesta["mensaje"] = "Producto modificado correctamente"; 
                } else {
                    $respuesta["error"] = 1;
                    $respuesta["mensaje"] = "Error al modificar el producto";
                }
            } else {
                $respuesta["error"] = 1;
                $respuesta["mensaje"] = "Tipo de imagen no válido";
            }
        } else {
            $respuesta["error"] = 1;
            $respuesta["mensaje"] = "La imagen pesa demasiado";
        }
    } else {
        if ($resultProducto) {
            $respuesta["error"] = 0;
            $respuesta["mensaje"] = "Producto modificado correctamente"; 
        } else {
            $respuesta["error"] = 1;
            $respuesta["mensaje"] = "Error al modificar el producto";
        }
    }

    echo json_encode($respuesta); 
    mysqli_close($conexion);
?>