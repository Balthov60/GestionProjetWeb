<?php
	$message = "Réservation pour ".$_GET['qty']." personne(s) le ".$_GET['date']." à ".$_GET['hour'].
			 "\n"."Nom: ".$_GET['lastName'].
			 "\n"."Prenom: ".$_GET['firstName'].
			 "\n"."Mail: ".$_GET['email'].
			 "\n"."Téléphone: ".$_GET['tel'].
			 "\n\n"."Commentaire: "."\n".$_GET['commentary'];
	if(mail('lesadretsGPW@gmail.com', 'Form Submission', $message, ''))
		echo 'send';
	else 
		echo 'not_send';
?>