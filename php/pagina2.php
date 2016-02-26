<?php

$cad=json_decode($_REQUEST['letras'], true);

$conexion=mysqli_connect("localhost","root","","bdajax") or
    die("Problemas con la conexión");

//print_r($cad);
$x = $cad['x'];
$y = $cad['y'];
$codigo = $cad['codigo'];
  
//$registros=mysqli_query($conexion,"select letra,x,y,codigo from letras") or die("Problemas en el select".mysqli_error($conexion));

mysqli_query($conexion,"update letras set x=$x, y=$y where codigo=$codigo") or die("Problemas en el select".mysqli_error($conexion));

/*
$registros=mysqli_query($conexion,"select x,y,codigo from letras") or die("Problemas en el select".mysqli_error($conexion));

while ($reg=mysqli_fetch_array($registros))
{
  $vec[]=$reg;
}
*/
mysqli_close($conexion);
//$cad=json_encode ($vec);
//echo $cad;
?>