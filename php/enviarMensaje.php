<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $contenido = $_POST["contenido"];
    $chat_id = $_POST["chat_id"];
    $date = date('Y-m-d H:i:s');

    $sqlInsert = "INSERT INTO mensajes (id, chat_id, email, contenido, date) VALUES ('', '".$chat_id."', '".$usuario."', '".$contenido."', '".$date."')";
    $resultInsert = $conexion->query($sqlInsert);
?>