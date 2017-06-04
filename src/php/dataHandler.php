<?php
	$tonMessage = "blabla";
	if($_GET['lastName'] == '' || $_GET['firstName'] == '' || $_GET['email'] == '' || $_GET['tel'] == '')
		echo $tonMessage; //on  crée le code html de la variable pour pouvoir l'utiliser en JS
	else 
		echo 'noNeedAlert';
	
?>