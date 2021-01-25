<!DOCTYPE html>
<html>
<head>
	<title>Primer Formulario</title>
</head>
<body>
<?php
$nombres = $_GET['nombres'];
$apellidos = $_GET['apellidos'];
?>
<h1><?=$nombres." ".$apellidos?></h1>
</body>
</html>