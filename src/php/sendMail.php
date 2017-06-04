<?php
	if(mail('Balthov60@gmail.com', 'Form Submission', $_GET['message'], 'linked'))
		echo 'Mail Send';
	else 
		echo 'Mail Not Send';
?>