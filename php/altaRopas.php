<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();

    //Datos
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $marca = $_POST["marca"];
    $talla = $_POST["talla"];
    $sexo = $_POST["sexo"];

    //Recibimos los datos de la imagen
    $nombreImagen = $_FILES["imagen"]["name"];
    $tipoImagen = $_FILES["imagen"]["type"];
    $tamañoImagen = $_FILES["imagen"]["size"];

    //Limitamos el tamaño de la imagen
    if ($tamañoImagen <= 2000000) {
        //Limitamos el tipo de imagen
        if ($tipoImagen == "image/jpeg" || $tipoImagen == "image/jpg" || $tipoImagen == "image/png") {
            $usuario = $_SESSION["email"];
            $sqlBusca = "SELECT id_Ropa FROM ropas WHERE nombre='".$nombre."' AND email_Usuario_Vendedor='".$usuario."'";
            $resultBusca = $conexion->query($sqlBusca);
            $numLineas = $resultBusca->num_rows;
            if ($numLineas == 0) {
                //Ruta de la carpeta destino en servidor
                $carpetaDestino = $_SERVER["DOCUMENT_ROOT"] . "/TFG/Codigo/imgRopas/";
                //Movemos la imagen de la carpeta temporal a la carpeta destino
                move_uploaded_file($_FILES['imagen']['tmp_name'], $carpetaDestino.$nombreImagen);
                //Insertamos el producto en ropas y compras
                $sqlInsertProd = "INSERT INTO ropas (id_Ropa, email_Usuario_Vendedor, nombre, estado, descripcion, precio, marca, talla, sexo, imagen_Ropa)";
                $sqlInsertProd .= " VALUES ('', '".$usuario."', '".$nombre."', '".$estado."', '".$descripcion."', '".$precio."', '".$marca."', '".$talla."', '".$sexo."', '".$nombreImagen."')";
                $resultInsert = $conexion->query($sqlInsertProd);
                $sqlId = "SELECT MAX(id_Ropa) AS id FROM ropas";
                $resultId = $conexion->query($sqlId);
                while ($fila = $resultId->fetch_assoc()) {
                    extract($fila);
                    $sqlInsertCompra = "INSERT INTO compra_ropas(id_Compra_Ropa, id_Ropa, email_Usuario_Comprador, estado_compra) VALUES ('', '".$id."', '', 'Disponible')";
                    $resultInsertCompra = $conexion->query($sqlInsertCompra);
                }
                $respuesta["error"] = 0;
                $respuesta["mensaje"] = "La prenda ha sido subido";
            } else {
                $respuesta["error"] = 1;
                $respuesta["mensaje"] = "Ese producto ya ha sido subido";
            }
        } else {
            $respuesta["error"] = 1;
            $respuesta["mensaje"] = "La imagen debe ser un jpeg, jpg o png";
        }
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "La imagen es demasiado pesada";
    }

    echo json_encode($respuesta);
    mysqli_close($conexion);
?>