<?php
$conexion=mysqli_connect("localhost","root","","bdajax") or
    die("Problemas con la conexión");
  
$registros=mysqli_query($conexion,"select letra,x,y,codigo from letras") or die("Problemas en el select".mysqli_error($conexion));


$vec = Array();
$data = Array();
while ($reg=mysqli_fetch_array($registros))
{    
    $data['codigo'] = $reg['codigo'];
    $data['letra'] = $reg['letra'];
    $data['x'] = $reg['x'];
    $data['y'] = $reg['y'];
    $vec[]=$data;    
}
mysqli_close($conexion);

$cad=json_encode ($vec);
echo $cad;
?>