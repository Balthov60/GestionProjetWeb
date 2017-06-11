
$(document).ready(function(){
  $('#modalRecapMail_container').on('hidden.bs.modal', function () {
    launchModal_MailSent();
  });
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
 
             
function submitForm() {
    var form = document.forms["booking"];

    /* Test Data */
    var date = form.date.value;
    if (!testDate(date))
    {
    	return;
    }

   	var qty = form.number.value;
   	if (!testQty(qty))
   		return;

    var lastName = form.lastname.value;
    if (!testName(lastName))
    {
      return;
    }

    var firstName = form.firstname.value;
    if (!testName(firstName))
    	return;

    var email = form.email.value;
    if (!testMail(email))
    	return;

    var tel = form.tel.value;
    if (!testPhone(tel))
    	return;

    

   	var hour = form.hour.value;
   	var commentary = form.text.value;

   	// Confirmation du mail ? amélioration possible, à garder.
   	/* Format Message */ 
    var messageConfirm = "<p class=\"recapMailText\">Reservation pour " + qty + " personne(s) le " + date + " à " + hour 
     			+ "</p><p class=\"recapMailText\">Nom: " + lastName
     			+ "</p><p class=\"recapMailText\">Prenom: " + firstName
     			+ "</p><p class=\"recapMailText\">Mail: " + email 
     			+ "</p><p class=\"recapMailText\">Téléphone: " + tel
     			+ "</p><p class=\"recapMailText\">Commentaire: " + commentary + "</p>";

    launchModalRecap("Confirmation de l'envoie du mail", messageConfirm);

    /* Format Request */
    var request = "php/sendMail.php?date=" + date + "&hour=" + hour + "&qty=" + qty + "&lastName=" + lastName + "&firstName=" + firstName + "&email=" + email + "&tel=" + tel + "&commentary=" + commentary;

    /* Send Mail */
    var testField = sendMail(request);
    
}

function launchModal_MailSent()
{
  $('#modalSentMail_container').html("<div class=\"modal fade\" id=\"modalSentMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">Mail envoyé</h4></div><div class=\"modal-body\"><div class=\"alert alert-success\"><strong>Félicitation!</strong> Le mail de réservation a été envoyé avec succès!.</div></div></div></div></div>");
  $('#modalSentMail').modal();
}

function launchModalRecap(title, expression)
{
  $('#modalRecapMail_container').html("<div class=\"modal fade\" id=\"modalRecapMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" +  title + "</h4></div><div class=\"modal-body-recapMail\">" + expression + "<input type=\"button\" class=\"sendMail_Button\" data-dismiss=\"modal\" aria-hidden=\"true\" value=\"Envoyer le mail\"/></div></div></div></div>");
  $('#modalRecapMail').modal();

}

function launchAlertModal(title, expression)
{
  $('#modalAlertMail_container').html("<div class=\"modal fade\" id=\"modalAlertMail\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" +  title + "</h4></div><div class=\"modal-body\">" + expression + "</div></div></div></div>");  
  $('#modalAlertMail').modal();
}




function testDate(value) {
    var patt = new RegExp('^((0?[1-9])|([12][0-9])|(3[0-1]))[-/](0?[1-9]|1[0-2])$');
    
   	if (value == "") {
        launchAlertModal("Date non renseignée", "Vous devez renseigner une date.")
   		return false;
   	}
   	else if (!patt.test(value)) {
      launchAlertModal("Date non valide", "Vous devez renseigner une date au format suivant : dd/mm.")
   		return false;
   	}
   	return true;
}

function testQty(value) {
  
	if (value == "") {
      launchAlertModal("Nombre de personne non renseigné", "Vous devez renseigner un nombre de personne.")
   		//alert("Vous devez renseigner un nombre de personne.");
   		return false;
   	}
   	else if (value > 5) {
      launchAlertModal("Nombre de personne trop important", "Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.")
   		//alert("Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.");
   		return false;
   	}
   	else if (value <= 0) {
      launchAlertModal("Nombre de personne non nul", "Le nombre de personne minimum est 1.")
   		//alert("Le nombre de personne minimum est 1.");
   		return false;
   	}
   	return true;
}



function testName(value) {
	var patt = new RegExp('^([éàèëïêîA-Za-z \-]*)$');
  
	if (value == "") {
    launchAlertModal("Nom et prénom non renseignés", "Vous devez renseigner un nom et un prenom.")
		//alert("Vous devez renseigner un nom et un prenom.");
		return false;
	}
	else if (!patt.test(value)) {
    launchAlertModal("Format non valide", "Vous devez renseigner un nom et un prenom valide.")
		//alert("Format du nom ou prenom non valide.");
		return false;
	}
	return true;
}

function testMail(value) {
  var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;	
  
  if (value == "") {
    launchAlertModal("Mail non renseignée", "Vous devez renseigner une adresse mail.")
		//alert("Vous devez renseigner une adresse mail.");
		return false;
	}
	else if (!patt.test(value)) {
    launchAlertModal("Mail non valide", "Vous devez renseigner une adresse mail valide.")
		//alert("Format du mail non valide.");
		return false;
	}
	return true;
}

function testPhone(value) {
  var patt = /^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/;	
  if (value == "") {
    launchAlertModal("Telephone non renseigné", "Vous devez renseigner un numero de téléphone.")
		//alert("Vous devez renseigner un numéro de téléphone.");
		return false;
	}
	else if (!patt.test(value)) {
    launchAlertModal("Telephone non valide", "Vous devez renseigner un numero de téléphone valide.")
		//alert("Numéro de téléphone non valide.");
		return false;
	}
	return true;
}