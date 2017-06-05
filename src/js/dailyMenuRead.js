
var dailyMeal = "./menu/dailyMeal_.txt";

function loadFileReadMenu(file) {

    var xhr = new XMLHttpRequest();

    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
    xhr.open('GET', file);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");


    xhr.addEventListener('readystatechange', function() { // On gère ici une requête asynchrone

        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) { // Si le fichier est chargé sans erreur
        	var plateDailyTypeArray = xhr.responseText.split('/'); /* Stock tout le fichier dans la variable (tableau)*/
            setDailyEntry(plateDailyTypeArray);
            setDailyMainCourse(plateDailyTypeArray);
            setDessert(plateDailyTypeArray);
            setPrice(plateDailyTypeArray);
        }

    });

    xhr.send(null); // La requête est prête, on envoie tout !
}

function setDailyEntry(plateDailyTypeArray)
{
    var lineDailyCounter = 0;
    var nbOfLineNeed = 3;
    var nbOfTooLongString = 0;
    var plateArray = plateDailyTypeArray[0].split(';');

    var htmlCode = ' ';
    for(var i = 0; i < plateArray.length; i++)
    {

        //lineDailyCounter++;
        htmlCode += ' <li> ' + plateArray[i] + ' </li>';

        /*if(plateArray[i].length > 51) // 49 correspond au nombre de caractère maximum qui peuvent rentrer sur une ligne
        {
            nbOfTooLongString++;
        } */
    }

    
    /*while((lineDailyCounter + nbOfTooLongString) < nbOfLineNeed)
    {
        lineDailyCounter++;
        htmlCode += ' <li>'+'</br>'+'</li>';
    }*/

   document.getElementsByClassName('menuDisplayer')[0].innerHTML = htmlCode;
}


function setDailyMainCourse(plateDailyTypeArray)
{
    var lineDailyCounter = 0;
    var nbOfLineNeed = 3;
    var nbOfTooLongString = 0;

    htmlCode = ' ';
    plateArray = plateDailyTypeArray[1].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
        //lineDailyCounter++;
        htmlCode += ' <li> ' + plateArray[i] + ' </li>';

        /* if(plateArray[i].length > 51)
            nbOfTooLongString++;*/
    }


    /*while((lineDailyCounter+ nbOfTooLongString) < nbOfLineNeed)
    {
        lineDailyCounter++;
        htmlCode += ' <li>'+'</br>'+'</li>';
    }*/
    document.getElementsByClassName('menuDisplayer')[1].innerHTML = htmlCode;
}


function setDessert(plateDailyTypeArray)
{
    var lineDailyCounter = 0;
    var nbOfLineNeed = 3;
    var nbOfTooLongString = 0;

    htmlCode = ' ';
    plateArray = plateDailyTypeArray[2].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
       // lineDailyCounter++;
        htmlCode += ' <li> ' + plateArray[i] + '</li>';

       /* if(plateArray[i].length > 51)
            nbOfTooLongString++; */
    }

    /*while((lineDailyCounter- nbOfTooLongString) < nbOfLineNeed)
    {
        lineDailyCounter++;
        htmlCode += ' <li>'+'</br>'+'</li>';
    }*/
    document.getElementsByClassName('menuDisplayer')[2].innerHTML = htmlCode;
}

function setPrice(plateDailyTypeArray)
{
    var price = plateDailyTypeArray[3];
    document.getElementsByClassName('price')[0].innerHTML = '(Prix : ' + price + '€)';
}

function resetIndexHtml()
{
    $('.indexMenu').html('');
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
    resetIndexHtml();
    setTitlesAndTextContainer();
    loadFileReadMenu(dailyMeal);
    $('.arrow').hide();
});


