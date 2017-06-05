
var dailyMeal = "./menu/dailyMeal.txt";

function loadFileReadMenu(file) {

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

    });

    xhr.send(null); // La requête est prête, on envoie tout !
}

function setEntry(plateTypeArray)
{
    var lineCounter = 0;
    var nbOfLineNeed = 3;
    var plateArray = plateTypeArray[0].split(';');
    var htmlCode = ' ';
    for(var i = 0; i < plateArray.length; i++)
    {
        lineCounter++;
        htmlCode += ' <li>- ' + plateArray[i] + ' -</li>';
    }

    while(lineCounter != nbOfLineNeed)
    {
        lineCounter++;
        htmlCode += ' <li></li>';
    }
    document.getElementsByClassName('menuDisplayer')[0].innerHTML = htmlCode;
}


function setMainCourse(plateTypeArray)
{
    var lineCounter = 0;
    var nbOfLineNeed = 3;
    htmlCode = ' ';
    plateArray = plateTypeArray[1].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
        lineCounter++;
        htmlCode += ' <li>- ' + plateArray[i] + ' -</li>';
    }

    while(lineCounter != nbOfLineNeed)
    {
        lineCounter++;
        htmlCode += ' <li></li>';
    }
    document.getElementsByClassName('menuDisplayer')[1].innerHTML = htmlCode;
}


function setDessert(plateTypeArray)
{
    var lineCounter = 0;
    var nbOfLineNeed = 3;
    htmlCode = ' ';
    plateArray = plateTypeArray[2].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
        lineCounter++;
        htmlCode += ' <li>- ' + plateArray[i] + ' -</li>';
    }

     while(lineCounter != nbOfLineNeed)
    {
        lineCounter++;
        htmlCode += ' <li></li>';
    }
    document.getElementsByClassName('menuDisplayer')[2].innerHTML = htmlCode;
}

function setPrice(plateTypeArray)
{
    var price = plateTypeArray[3];
    document.getElementsByClassName('price')[0].innerHTML = '(Prix : ' + price + '€)';
}

/*** Au cas où on a cliqué sur la partie "A la carte" juste avant, 
ce qui avait donc supprimé les titres et conteneur de texte ***/
function setTitlesAndTextContainer() 
{
    /*Titles*/
    $('.menu_text .main_course').show();
    $('.menu_text .dessert').show();

    /*Text Container*/
    $('#mainCourse_Displayer').show();
    $('#dessert_Displayer').show();
}


$('.menuLink2').click(function() {
    setTitlesAndTextContainer();
    loadFileReadMenu(dailyMeal);
    $('.arrow').hide();
});


