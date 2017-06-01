windows.onload = function() {

    var menutext1 = "http://lesadrets.esy.es/menu/1.txt";
  
    var xhr = new XMLHttpRequest();

    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
    xhr.open('GET', menutext1);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    xhr.addEventListener('readystatechange', function() { // On gère ici une requête asynchrone

        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
        	var plateTypeArray = xhr.responseText.split('/'); /* Stock tout le fichier dans la variable (tableau)*/
            setEntry(plateTypeArray);
            setMainCourse(plateTypeArray);
            setDessert(plateTypeArray);
            setPrice(plateTypeArray);
        }

    });

    xhr.send(null); // La requête est prête, on envoie tout !
}


function setEntry(plateTypeArray)
{
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
