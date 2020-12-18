<?php
    $conexion = mysqli_connect("localhost", "root", "", "buyfast2") or die(mysqli_error($conexion));
    mysqli_set_charset($conexion, "utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $sql = "SELECT email, dni, nombre, apellido, direccion, nomUsuario, password FROM usuarios WHERE email='".$usuario."'";
    $resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
    $datos = [];

    while ($fila = mysqli_fetch_assoc($resultados)) {
        extract($fila);
        $datos["email"] = $email;
        $datos["dni"] = $dni;
        $datos["nombre"] = $nombre;
        $datos["apellido"] = $apellido;
        $datos["direccion"] = $direccion;
        $datos["nomUsuario"] = $nomUsuario;
        $datos["password"] = $password;
    }

    echo json_encode($datos); 

    mysqli_close($conexion);
?>