<?php

$conexion = mysqli_connect("localhost", "root", "", "buyfast2") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Consulta SQL para obtener los datos de los centros.
$sqlVehiculo = "DELETE FROM vehiculos WHERE id_Vehiculo='".$_POST["lstVehiculo"]."'";
$resultadoVehiculo = mysqli_query($conexion,$sqlVehiculo) or die(mysqli_error($conexion));

$sqlCompra = "DELETE FROM compra_vehiculos WHERE id_Vehiculo='".$_POST["lstVehiculo"]."'";
    $resultCompra =  mysqli_query($conexion,$sqlCompra) or die(mysqli_error($conexion));
if ($resultadoVehiculo){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Producto eliminado correctamente"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de eliminacion: ".mysqli_error($conexion);
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($respuesta); 

mysqli_close($conexion);
?>