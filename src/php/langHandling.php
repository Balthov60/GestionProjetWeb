<?php
  if(isset($_GET['lang']))
    $lang = $_GET['lang'];
  else 
    $lang = 'fr';

  if($lang == 'en')
    include('lang/en_lang.php');
  else
    include('lang/fr_lang.php');
?>