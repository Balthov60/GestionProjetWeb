<?php
	$message = "Réservation pour ".$_GET['qty']." personne(s) le ".$_GET['date']." à ".$_GET['hour'].
			 "\n"."Nom: ".$_GET['lastName'].
			 "\n"."Prenom: ".$_GET['firstName'].
			 "\n"."Mail: ".$_GET['email'].
			 "\n"."Téléphone: ".$_GET['tel'].
			 "\n\n"."Commentaire: "."\n".$_GET['commentary'];
	if(mail('Balthov60@gmail.com', 'Form Submission', $message, ''))
		echo 'Le mail à bien été envoyé, une réponse vous seras envoyé dans les plus bref délai.';
	else 
		echo 'Un problème à eu lieu avec le système de messagerie veuillez réessayer plus tard';
?>