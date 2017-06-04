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
             
function AJAX(url){
    xhr_object = getXMLHttpRequest(); //Bon ca on s'en branle c'est juste une création améliorée d'une requete HTML pour utiliser du PHP, c'est comme ca que AJAX fonctionne
    xhr_object.open("GET", url, false); // La on va dans l'url qu'on a donnée (va voir plus bas), et on chope les données car on utilise le paramètre "GET"
    xhr_object.send(null); 
    if(xhr_object.readyState == 4){
        return xhr_object.responseText; //On retourne les données du script dataHandler.php
    }else return(false);
}
 
             
function submitForm(){
    var form = document.forms["bookingForm"];
    var lastName = form.Lastname.value;
    var firstName = form.firstname.value;
    var email = form.email.value;
    var tel = form.tel.value;
    var url = "php/dataHandler.php?lastName="+lastName+"&firstName="+firstName+"&email="+email+"&tel="+tel; 

    /* Pour passer des paramètres en php on les met dans l'url
	et ensuite dans le script on les chope avec $_GET[ton_parametre];
	Du coup la on crée l'url avec les paramètres dedans
    */

    var testField = AJAX(url);        
    
    if(testField == "haveToAlert")
    	alert("Vous devez remplir tous les champs");
}