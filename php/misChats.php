<?php
    $conexion = new mysqli("localhost", "root", "", "buyfast2");
    $conexion->set_charset("utf8");

    session_start();
    $usuario = $_SESSION["email"];

    $chatVend = "SELECT chats.id, usuarios.nomUsuario FROM chats, usuarios WHERE chats.email_comprador = usuarios.email AND chats.email_vendedor='".$usuario."'";
    $resultChatVend = $conexion->query($chatVend);
    $chatComp = "SELECT chats.id, usuarios.nomUsuario FROM chats, usuarios WHERE chats.email_vendedor=usuarios.email AND chats.email_comprador='".$usuario."'";
    $resultChatCom = $conexion->query($chatComp);

    $XML = '<?xml version="1.0" encoding="UTF-8"?>';
    $XML .= "<datos>";
    while ($fila = $resultChatVend->fetch_assoc()) {
        extract($fila);
        $XML .= "<compra>"; 
            $XML .= "<nombreUsuario>".$nomUsuario."</nombreUsuario>";
            $XML .= "<chat>".$id."</chat>";
        $XML .= "</compra>";
    }
    while ($fila = $resultChatCom->fetch_assoc()) {
        extract($fila);
        $XML .= "<compra>"; 
            $XML .= "<nombreUsuario>".$nomUsuario."</nombreUsuario>";
            $XML .= "<chat>".$id."</chat>";
        $XML .= "</compra>";
    }
    $XML .= "</datos>";
    echo $XML;
    mysqli_close($conexion);
?>