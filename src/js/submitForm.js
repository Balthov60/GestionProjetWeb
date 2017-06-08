

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
    // var message = "Reservation pour " + qty + " personne(s) le " + date + " à " + hour 
    // 			+ "\nNom: " + lastName
    // 			+ "\nPrenom: " + firstName
    // 			+ "\nMail: " + email 
    // 			+ "\nTéléphone: " + tel
    // 			+ "\nCommentaire: " + commentary
    // alert(message);

    /* Format Request */
    var request = "php/sendMail.php?date=" + date + "&hour=" + hour + "&qty=" + qty + "&lastName=" + lastName + "&firstName=" + firstName + "&email=" + email + "&tel=" + tel + "&commentary=" + commentary;

    /* Send Mail */
    var testField = sendMail(request);
    alert(testField);
}


function launchModal(title, expression)
{
  $('#modal_container').html("<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"images/logos/logo.png\" id=\"logoModal\"/><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">" +  title + "</h4></div><div class=\"modal-body\">" + expression + "</div></div></div></div>");
}

function destroyModal()
{
  $('#modal_container').html("");
}


function testDate(value) {
    var patt = new RegExp('^((0?[1-9])|([12][0-9])|(3[0-1]))[-/](0?[1-9]|1[0-2])$');
    destroyModal();
   	if (value == "") {
        launchModal("Date non renseignée", "Vous devez renseigner une date.")
     		//alert("Vous devez renseigner une date.");
   		return false;
   	}
   	else if (!patt.test(value)) {
      launchModal("Date non valide", "Vous devez renseigner une date au format suivant : dd/mm.")
   		//alert("Format de la date non valide : dd/mm");
   		return false;
   	}
   	return true;
}

function testQty(value) {
  destroyModal();
	if (value == "") {
      launchModal("Nombre de personne non renseigné", "Vous devez renseigner un nombre de personne.")
   		//alert("Vous devez renseigner un nombre de personne.");
   		return false;
   	}
   	else if (value > 5) {
      launchModal("Nombre de personne trop important", "Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.")
   		//alert("Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.");
   		return false;
   	}
   	else if (value <= 0) {
      launchModal("Nombre de personne non nul", "Le nombre de personne minimum est 1.")
   		//alert("Le nombre de personne minimum est 1.");
   		return false;
   	}
   	return true;
}



function testName(value) {
	var patt = new RegExp('^([éàèëïêîA-Za-z \-]*)$');
  destroyModal();
	if (value == "") {
    launchModal("Nom et prénom non renseignés", "Vous devez renseigner un nom et un prenom.")
		//alert("Vous devez renseigner un nom et un prenom.");
		return false;
	}
	else if (!patt.test(value)) {
    launchModal("Format non valide", "Vous devez renseigner un nom et un prenom valide.")
		//alert("Format du nom ou prenom non valide.");
		return false;
	}
	return true;
}

function testMail(value) {
  var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;	
  destroyModal();
  if (value == "") {
    launchModal("Mail non renseignée", "Vous devez renseigner une adresse mail.")
		//alert("Vous devez renseigner une adresse mail.");
		return false;
	}
	else if (!patt.test(value)) {
    launchModal("Mail non valide", "Vous devez renseigner une adresse mail valide.")
		//alert("Format du mail non valide.");
		return false;
	}
	return true;
}

function testPhone(value) {
  var patt = /^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/;	
  if (value == "") {
    launchModal("Telephone non renseigné", "Vous devez renseigner un numero de téléphone.")
		//alert("Vous devez renseigner un numéro de téléphone.");
		return false;
	}
	else if (!patt.test(value)) {
    launchModal("Telephone non valide", "Vous devez renseigner un numero de téléphone valide.")
		//alert("Numéro de téléphone non valide.");
		return false;
	}
	return true;
}