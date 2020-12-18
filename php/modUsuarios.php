<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $gmail = $_POST["gmail"];
    $dni = $_POST["dni"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $direccion = $_POST["direccion"];
    $nomUsuario = $_POST["nomUsuario"];
    $password = $_POST["password"];

    $modUsuarios = "UPDATE usuarios SET dni='".$dni."', nombre='".$nombre."', apellido='".$apellido."', direccion='".$direccion."', nomUsuario='".$nomUsuario."', password='".$password."' WHERE email='".$usuario."'";
    $resultModUsuarios = $conexion->query($modUsuarios);
    if ($modUsuarios) {
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Usuario modificado correctamente"; 
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error al modificar el usuario";
    }

    echo json_encode($respuesta); 
    mysqli_close($conexion);
?>