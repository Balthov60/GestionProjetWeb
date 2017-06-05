

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
    	return;

   	var qty = form.number.value;
   	if (!testQty(qty))
   		return;

    var lastName = form.lastname.value;
    if (!testName(lastName))
    	return;

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

function testDate(value) {
    var patt = new RegExp('^((0?[1-9])|([12][0-9])|(3[0-1]))[-/](0?[1-9]|1[0-2])$');
   	if (value == "") {
   		alert("Vous devez renseigner une date.");
   		return false;
   	}
   	else if (!patt.test(value)) {
   		alert("Format de la date non valide : dd/mm");
   		return false;
   	}
   	return true;
}

function testQty(value) {
	if (value == "") {
   		alert("Vous devez renseigner un nombre de personne.");
   		return false;
   	}
   	else if (value > 5) {
   		alert("Pour les invitations de plus de 5 personnes veuillez nous contacter par téléphone.");
   		return false;
   	}
   	else if (value <= 0) {
   		alert("Le nombre de personne minimum est 1.");
   		return false;
   	}
   	return true;
}

function testName(value) {
	var patt = new RegExp('^([éàèëïêîA-Za-z \-]*)$');
	if (value == "") {
		alert("Vous devez renseigner un nom et un prenom.");
		return false;
	}
	else if (!patt.test(value)) {
		alert("Format du nom ou prenom non valide.");
		return false;
	}
	return true;
}

function testMail(value) {
  var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;	
  if (value == "") {
		alert("Vous devez renseigner une adresse mail.");
		return false;
	}
	else if (!patt.test(value)) {
		alert("Format du mail non valide.");
		return false;
	}
	return true;
}

function testPhone(value) {
  var patt = /^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/;	
  if (value == "") {
		alert("Vous devez renseigner un numéro de téléphone.");
		return false;
	}
	else if (!patt.test(value)) {
		alert("Numéro de téléphone non valide.");
		return false;
	}
	return true;
}