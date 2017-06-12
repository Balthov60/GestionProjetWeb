<?php
?>

<script>
$(document).ready(function(){
  $('#sendButton').click(function(){
    var lang = "<?php echo getLanguage(); ?>";
    submitForm(lang);
  });

  var request;
})

function getXMLHttpRequest() { 
    var xhr = null;
     
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
            }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}
             
function sendMail(url) {
    xhr_object = getXMLHttpRequest();
    xhr_object.open("GET", url, false);
    xhr_object.send(null); 

    if(xhr_object.readyState == 4){
        return xhr_object.responseText; //On retourne les données du script dataHandler.php
    }
    return(false);
}
 
             
function submitForm(lang) {
    var form = document.forms["booking"];

    /* Test Data */
    var date = form.date.value;
    if (!testDate(date,lang))
    {
    	return;
    }

   	var qty = form.number.value;
   	if (!testQty(qty,lang))
   		return;

    var lastName = form.lastname.value;
    if (!testName(lastName,lang))
    {
      return;
    }

    var firstName = form.firstname.value;
    if (!testName(firstName,lang))
    	return;

    var email = form.email.value;
    if (!testMail(email,lang))
    	return;

    var tel = form.tel.value;
    if (!testPhone(tel,lang))
    	return;

    

   	var hour = form.hour.value;
   	var commentary = form.text.value;

   	/* Format Request */
    request = "php/sendMail.php?date=" + date + "&hour=" + hour + "&qty=" + qty + "&lastName=" + lastName + "&firstName=" + firstName + "&email=" + email + "&tel=" + tel + "&commentary=" + commentary;

   	/* Format Message */ 
    if(lang=='fr')
    {      
      var messageConfirm = "<p class=\"recapMailText\">Reservation pour " + qty + " personne(s) le " + date + " à " + hour 
       			+ "</p><p class=\"recapMailText\">Nom: " + lastName
       			+ "</p><p class=\"recapMailText\">Prenom: " + firstName
       			+ "</p><p class=\"recapMailText\">Mail: " + email 
       			+ "</p><p class=\"recapMailText\">Téléphone: " + tel
       			+ "</p><p class=\"recapMailText\">Commentaire: " + commentary + "</p>";
    }

    else 
    {
      var messageConfirm = "<p class=\"recapMailText\">Booking for " + qty + " people on the " + date + " at " + hour 
            + "</p><p class=\"recapMailText\">Name: " + lastName
            + "</p><p class=\"recapMailText\">Firstname: " + firstName
            + "</p><p class=\"recapMailText\">E-mail: " + email 
            + "</p><p class=\"recapMailText\">Phone: " + tel
            + "</p><p class=\"recapMailText\">Commentary: " + commentary + "</p>";
    }

    if(lang == 'fr')
      launchModalRecap("Confirmation de l'envoie du mail", messageConfirm);   

    else
      launchModalRecap("Booking confirmation", messageConfirm);       
}

function launchModal_MailSent()
{
  if (lang == 'fr')
  {
    var success = "<strong>Félicitation!</strong> Le mail de réservation a été envoyé avec succès!."
    var titre = "Mail envoyé";
  }

  else
  {
    var success = "<strong>Success!</strong> The booking e-mail is just sent successfully!"
    var titre = "E-mail sent";
  }

  $('#modalSentMail_container').html("<div class=\"modal fade\" id=\"modalSentMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" + titre + "</h4></div><div class=\"modal-body\"><div class=\"alert alert-success\">" + success + "</div></div></div></div></div>");
  $('#modalSentMail').modal();
}

function launchModal_MailNotSent()
{
  if (lang == 'fr')
  {
    var failed = "<strong>Oups!</strong> Suite à un problème technique le mail n'a pas été envoyé... Veuillez réessayer plus tard!."
    var titre = "Mail non envoyé";
  }

  else
  {
    var failed = "<strong>Failed!</strong> Sorry we can't send your e-mail, please try again later!"
    var titre = "E-mail not sent";
  }

  $('#modalSentMail_container').html("<div class=\"modal fade\" id=\"modalSentMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" + titre + "</h4></div><div class=\"modal-body\"><div class=\"alert alert-success\">" + failed + "</div></div></div></div></div>");
  $('#modalSentMail').modal();
}

function launchModal_MailCancel()
{
  if (lang == 'fr')
  {
    var failed = "Vous avez bien annulé l'envoi de mail."
    var titre = "Mail non envoyé";
  }

  else
  {
    var failed = "You have cancel the form submission."
    var titre = "E-mail not sent";
  }

  $('#modalSentMail_container').html("<div class=\"modal fade\" id=\"modalSentMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" + titre + "</h4></div><div class=\"modal-body\"><div class=\"alert alert-success\">" + failed + "</div></div></div></div></div>");
  $('#modalSentMail').modal();
}

function launchModalRecap(title, expression)
{
  if(lang == 'fr')
    var buttonText = "Envoyer";

  else
    var buttonText = "Send";

  $('#modalRecapMail_container').html("<div class=\"modal fade\" id=\"modalRecapMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"cancelMail\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" +  title + "</h4></div><div class=\"modal-body-recapMail\">" + expression + "<input type=\"button\" class=\"sendMail_Button\" id=\"sendMail\" data-dismiss=\"modal\" aria-hidden=\"true\" value = \"" + buttonText + "\"/></div></div></div></div>");
  
  $('#sendMail').click(function() {
  	var testField = sendMail(request);
  	if (testField == "send") {
  	  launchModal_MailSent(); 
  	}
  	else {
      launchModal_MailNoSent();
  	}
  });

  $('#cancelMail').click(function() {
    launchModal_MailCancel();
  });

  $('#modalRecapMail').modal();

}

function launchAlertModal(title, expression)
{
  $('#modalAlertMail_container').html("<div class=\"modal fade\" id=\"modalAlertMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" +  title + "</h4></div><div class=\"modal-body\">" + expression + "</div></div></div></div>");  
  $('#modalAlertMail').modal();
}




function testDate(value, lang) {
    var patt = new RegExp('^((0?[1-9])|([12][0-9])|(3[0-1]))[-/](0?[1-9]|1[0-2])$');
    
   	if (value == "" && lang=='fr') {
        launchAlertModal("Date non renseignée", "Vous devez renseigner une date.")
   		return false;
   	}
   	else if (!patt.test(value) && lang=='fr') {
      launchAlertModal("Date non valide", "Vous devez renseigner une date au format suivant : dd/mm.")
   		return false;
   	}

    else if (value == "" && lang=='en') {
        launchAlertModal("Date not set", "Please tell about a date.")
      return false;
    }

    else if (!patt.test(value) && lang=='en') {
      launchAlertModal("Date not available", "Please set a correct date following this format : dd/mm")
      return false;
    }
   	return true;
}

function testQty(value, lang) {
  
	if (value == "" && lang=='fr') {
      launchAlertModal("Nombre de personne non renseigné", "Vous devez renseigner un nombre de personne.")
   		//alert("Vous devez renseigner un nombre de personne.");
   		return false;
   	}
   	else if (value > 5 && lang == 'fr') {
      launchAlertModal("Nombre de personne trop important", "Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.")
   		//alert("Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.");
   		return false;
   	}
   	else if (value <= 0 && lang == 'fr') {
      launchAlertModal("Nombre de personne non nul", "Le nombre de personne minimum est 1.")
   		//alert("Le nombre de personne minimum est 1.");
   		return false;
   	}

    if (value == "" && lang=='en') {
      launchAlertModal("Number of person not set", "Please tell us about a number of person")
      //alert("Vous devez renseigner un nombre de personne.");
      return false;
    }
    else if (value > 5 && lang == 'en') {
      launchAlertModal("Too much people", "To book over 5 people please contact us by phone.")
      //alert("Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.");
      return false;
    }
    else if (value <= 0 && lang == 'en') {
      launchAlertModal("Number of person null", "The minimum number of person is 1.")
      //alert("Le nombre de personne minimum est 1.");
      return false;
    }
   	return true;
}



function testName(value, lang) {
	var patt = new RegExp('^([éàèëïêîA-Za-z \-]*)$');
  
	if (value == "" && lang=='fr') {
    launchAlertModal("Nom et prénom non renseignés", "Vous devez renseigner un nom et un prenom.")
		//alert("Vous devez renseigner un nom et un prenom.");
		return false;
	}
	else if (!patt.test(value) && lang=='fr') {
    launchAlertModal("Format non valide", "Vous devez renseigner un nom et un prenom valide.")
		//alert("Format du nom ou prenom non valide.");
		return false;
	}
	
  if (value == "" && lang=='en') {
    launchAlertModal("Name and firstname not set", "Please tell about a name and firstname.")
    //alert("Vous devez renseigner un nom et un prenom.");
    return false;
  }
  else if (!patt.test(value) && lang=='en') {
    launchAlertModal("Format not available", "Please set a correct name and firstname.")
    //alert("Format du nom ou prenom non valide.");
    return false;
  }
  return true;
}

function testMail(value, lang) {
  var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;	
  
  if (value == "" && lang=='fr') {
    launchAlertModal("Mail non renseignée", "Vous devez renseigner une adresse mail.")
		//alert("Vous devez renseigner une adresse mail.");
		return false;
	}
	else if (!patt.test(value) && lang=='fr') {
    launchAlertModal("Mail non valide", "Vous devez renseigner une adresse mail valide.")
		//alert("Format du mail non valide.");
		return false;
	}

  if (value == "" && lang=='en') {
    launchAlertModal("E-mail not set", "Please tell about an e-mail address.")
    //alert("Vous devez renseigner une adresse mail.");
    return false;
  }
  else if (!patt.test(value) && lang=='en') {
    launchAlertModal("E-mail address not available", "Please set a correct e-mail address.")
    //alert("Format du mail non valide.");
    return false;
  }
	return true;
}

function testPhone(value, lang) {
  var patt = /^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/;	
  if (value == "" && lang=='fr') {
    launchAlertModal("Telephone non renseigné", "Vous devez renseigner un numero de téléphone.")
		//alert("Vous devez renseigner un numéro de téléphone.");
		return false;
	}
	else if (!patt.test(value) && lang=='fr') {
    launchAlertModal("Telephone non valide", "Vous devez renseigner un numero de téléphone valide.")
		//alert("Numéro de téléphone non valide.");
		return false;
	}

  if (value == "" && lang=='en') {
    launchAlertModal("Phone number not set", "Please tell about a phone number.")
    //alert("Vous devez renseigner un numéro de téléphone.");
    return false;
  }
  else if (!patt.test(value) && lang=='en') {
    launchAlertModal("Phone number not available", "Please tell about a correct phone number.")
    //alert("Numéro de téléphone non valide.");
    return false;
  }
	return true;
}

</script>