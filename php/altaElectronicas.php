<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();

    //Datos
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $modelo = $_POST["modelo"];
    $tipo = $_POST["tipo"];

    //Recibimos los datos de la imagen
    $nombreImagen = $_FILES["imagen"]["name"];
    $tipoImagen = $_FILES["imagen"]["type"];
    $tamañoImagen = $_FILES["imagen"]["size"];

    //Limitamos el tamaño de la imagen
    if ($tamañoImagen <= 2000000) {
        //Limitamos el tipo de imagen
        if ($tipoImagen == "image/jpeg" || $tipoImagen == "image/jpg" || $tipoImagen == "image/png") {
            $usuario = $_SESSION["email"];
            $sqlBusca = "SELECT id_Electronica FROM electronicas WHERE nombre='".$nombre."' AND email_Usuario_Vendedor='".$usuario."'";
            $resultBusca = $conexion->query($sqlBusca);
            $numLineas = $resultBusca->num_rows;
            if ($numLineas == 0) {
                //Ruta de la carpeta destino en servidor
                $carpetaDestino = $_SERVER["DOCUMENT_ROOT"] . "/TFG/Codigo/imgElectronicas/";
                //Movemos la imagen de la carpeta temporal a la carpeta destino
                move_uploaded_file($_FILES['imagen']['tmp_name'], $carpetaDestino.$nombreImagen);
                $sqlInsertProd = "INSERT INTO electronicas (id_Electronica, email_Usuario_Vendedor, nombre, estado, descripcion, precio, modelo, tipo, imagen_Electronica)";
                $sqlInsertProd .= " VALUES ('', '".$usuario."', '".$nombre."', '".$estado."', '".$descripcion."', '".$precio."', '".$modelo."', '".$tipo."', '".$nombreImagen."')";
                $resultInsert = $conexion->query($sqlInsertProd);
                $sqlId = "SELECT MAX(id_Electronica) AS id FROM electronicas";
                $resultId = $conexion->query($sqlId);
                while ($fila = $resultId->fetch_assoc()) {
                    extract($fila);
                    $sqlInsertCompra = "INSERT INTO compra_Electronicas(id_Compra_Electronica, id_Electronica, email_Usuario_Comprador, estado_compra) VALUES ('', '".$id."', '', 'Disponible')";
                    $resultInsertCompra = $conexion->query($sqlInsertCompra);
                }
                $respuesta["error"] = 0;
                $respuesta["mensaje"] = "El producto ha sido subido";
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