<?php
   $conexion = new mysqli("localhost", "root", "", "buyfast2");
   $conexion->set_charset("utf8");

   session_start();
   $usuario = $_SESSION["email"];

   $sqlVehiculos = "SELECT vehiculos.id_Vehiculo, vehiculos.nombre, vehiculos.estado, vehiculos.descripcion, vehiculos.precio, vehiculos.modelo, vehiculos.color, vehiculos.kms, vehiculos.imagen_Vehiculo FROM vehiculos, compra_vehiculos WHERE vehiculos.id_Vehiculo = compra_vehiculos.id_Vehiculo AND vehiculos.email_Usuario_Vendedor != '".$usuario."' AND compra_vehiculos.estado_compra='Disponible'";   
   $resultVehiculos = $conexion->query($sqlVehiculos);
   $XML = '<?xml version="1.0" encoding="UTF-8"?>';
   $XML .= "<datos>";
   while ($fila = $resultVehiculos->fetch_assoc()) {
       extract($fila);
       $XML .= "<vehiculo>"; 
            $XML .= "<id>".$id_Vehiculo."</id>";
           $XML .= "<nombre>".$nombre."</nombre>";
           $XML .= "<estado>".$estado."</estado>";
           $XML .= "<descripcion>".$descripcion."</descripcion>";
           $XML .= "<precio>".$precio."</precio>";
           $XML .= "<modelo>".$modelo."</modelo>";
           $XML .= "<color>".$color."</color>";
           $XML .= "<kms>".$kms."</kms>";
           $XML .= "<imagen>".$imagen_Vehiculo."</imagen>";
       $XML .= "</vehiculo>";
   }
   $XML .= "</datos>";
   echo $XML;
   mysqli_close($conexion);
?>