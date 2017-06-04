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
    xhr_object = getXMLHttpRequest();
     
    xhr_object.open("GET", url, false);
    xhr_object.send(null);
    if(xhr_object.readyState == 4){
        return xhr_object.responseText;
    }else return(false);
}
 
             
function submitForm(){
    var form = document.forms["bookingForm"];
    var lastName = form.Lastname.value;
    var firstName = form.firstname.value;
    var email = form.email.value;
    var tel = form.tel.value;
    var url = "php/dataHandler.php?lastName="+lastName+"&firstName="+firstName+"&email="+email+"&tel="+tel;
    var testField = AJAX(url);        
    
    if(testField == "haveToAlert")
    	alert("Vous devez remplir tous les champs");
}