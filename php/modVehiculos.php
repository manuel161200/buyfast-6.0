<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $modelo = $_POST["modelo"];
    $color = $_POST["color"];
    $kms = $_POST["kms"];

    // $nombreImagen = $_FILES["imagen"]["name"]; //Acceder a $_FILES directamente sin variable
    // $tipoImagen = $_FILES["imagen"]["type"];
    // $tamañoImagen = $_FILES["imagen"]["size"];
    
    $modProducto = "UPDATE vehiculos SET nombre = '".$nombre."', estado = '".$estado."',descripcion = '".$descripcion."',precio = '".$precio."',modelo = '".$modelo."',color = '".$color."',kms = '".$kms."' WHERE id_Vehiculo='".$id."'";
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
                $carpetaDestino = $_SERVER["DOCUMENT_ROOT"] . "/TFG/CodigoimgVehiculos/";
                //Movemos la imagen de la carpeta temporal a la carpeta destino
                move_uploaded_file($_FILES['imagen']['tmp_name'], $carpetaDestino.$nombreImagen);
                $modImagen = "UPDATE vehiculos SET imagen_Vehiculo= '".$nombreImagen."' WHERE id_Vehiculo='".$id."'";
                $resultImagen = $conexion->query($modImagen);
                if ($resultImagen && $resultProducto) {
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