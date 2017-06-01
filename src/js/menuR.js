

var menutext1 = "http://lesadrets.esy.es/menu/1.txt";
var menutext2 = "http://lesadrets.esy.es/menu/2.txt";
var menutext3 = "http://lesadrets.esy.es/menu/3.txt";

window.onload = loadFile(menutext1);
window.onload = alert("Load");


function loadFile(file) {
  
    var xhr = new XMLHttpRequest();

    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
    xhr.open('GET', file);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    xhr.addEventListener('readystatechange', function() { // On gère ici une requête asynchrone

        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
        	var plateTypeArray = xhr.responseText.split('/'); /* Stock tout le fichier dans la variable (tableau)*/
            setEntry(plateTypeArray);
            setMainCourse(plateTypeArray);
            setDessert(plateTypeArray);
            setPrice(plateTypeArray);

        }

    xhr.send(null); // La requête est prête, on envoie tout !
}

function setEntry(plateTypeArray)
{
    alert("setEntry()");
    var plateArray = plateTypeArray[0].split(';');
    var htmlCode = ' ';
    for(var i = 0; i < plateArray.length; i++)
    {
        htmlCode += ' <li>' + plateArray[i] + '</li>';
    }
    document.getElementsByClassName('menuDisplayer')[0].innerHTML = htmlCode;
}


function setMainCourse(plateTypeArray)
{
    alert("setMainCourse()");
    htmlCode = ' ';
    plateArray = plateTypeArray[1].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
        htmlCode += ' <li>' + plateArray[i] + '</li>';
    }
    document.getElementsByClassName('menuDisplayer')[1].innerHTML = htmlCode;
}


function setDessert(plateTypeArray)
{
    alert("setDessert()");
    htmlCode = ' ';
    plateArray = plateTypeArray[2].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
        htmlCode += ' <li>' + plateArray[i] + '</li>';
    }
    document.getElementsByClassName('menuDisplayer')[2].innerHTML = htmlCode;
}

function setPrice(plateTypeArray)
{
    var price = plateTypeArray[3];
    document.getElementsByClassName('price')[0].innerHTML = '(Prix : ' + price + '€)';
}


(function() { // Comme d'habitude, une IIFE pour éviter les variables globales

  	document.getElementsByClassName('menuLink1')[0]
        .addEventListener('click', function (event) {
            alert("Clique");
            loadFile(menutext1);          
        });

    document.getElementsByClassName('menuLink2')[0]
        .addEventListener('click', function (event) {
            loadFile(menutext2);
        });

    document.getElementsByClassName('menuLink3')[0]
        .addEventListener('click', function (event) {
            loadFile(menutext3);
        });

})();

