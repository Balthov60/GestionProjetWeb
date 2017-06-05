<?php
    $index = 0;
    $fileConcat = '' ;
    $dir = "menu/main_Meals/";
    $dh  = opendir($dir);
    while (false !== ($filename = readdir($dh))) {
        $filesArray[] = $filename;

    }

    rsort($filesArray);

    for($i = 0; $i<sizeof($filesArray)-2; $i++)
    {
        if($i == sizeof($filesArray)-3)
            $fileConcat .= $filesArray[$i];
        
        else
            $fileConcat .= $filesArray[$i] . ',';
    }    
?>

<script type="text/javascript"> 


/**** Menus Functions ****/

function loadFile(file) {
    var chemin = 'menu/main_Meals/';
    file = chemin + file;
    var xhr = new XMLHttpRequest();
    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
    xhr.open('GET', file);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    xhr.addEventListener('readystatechange', function() { 
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { 
            var plateTypeArray = xhr.responseText.split('/'); 
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
    var lineCounter=0;
    var nbOfLineNeed = 3;
    var plateArray = plateTypeArray[0].split(';');
    var htmlCode = ' ';
    for(var i = 0; i < plateArray.length; i++)
    {
        lineCounter++;
        htmlCode += ' <li>' + plateArray[i] + '</li>';
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
    var lineCounter=0;
    var nbOfLineNeed = 3;
    htmlCode = ' ';
    plateArray = plateTypeArray[1].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
        lineCounter++;
        htmlCode += ' <li>' + plateArray[i] + '</li>';
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
    var lineCounter=0;
    var nbOfLineNeed = 3;
    htmlCode = ' ';
    plateArray = plateTypeArray[2].split(';');
    for(var i = 0; i < plateArray.length; i++)
    {
        lineCounter++;
        htmlCode += ' <li>' + plateArray[i] + '</li>';
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

/**** Arrows Handlers ****/

function hideArrows()
{
    $('#arrow_right').hide(); 
    $('#arrow_left').hide();
}

function hideArrows2()
{
    $('#arrow_right2').hide(); 
    $('#arrow_left2').hide();
}


function setArrowsFollowingIndex(arrowIndex) 
{
    if(arrowIndex + 1 == jsFileArray.length)
    {
        hideArrows();
        $('#arrow_left').show();
    }

    else if(arrowIndex == 0 )
    {
        hideArrows();
        $('#arrow_right').show();  
    }

    else 
    {
        $('#arrow_left').show();
        $('#arrow_right').show(); 
    }
        
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
    $('.price').show();
}



var jsFileArray = ('<?php echo $fileConcat; ?>').split(',');


$(document).ready(function(){ // s'éxecute au chargement de la page
    hideArrows();
    hideArrows2();

    loadFile(jsFileArray[0]);
    arrowIndex = 0;
    setArrowsFollowingIndex(arrowIndex);
});


$('#arrow_left').click(function() {
    
    if(arrowIndex > 0)
    {
        arrowIndex--;
        loadFile(jsFileArray[arrowIndex]); 
    }
    setArrowsFollowingIndex(arrowIndex);
});

$('#arrow_right').click(function(){
    if(arrowIndex + 1 < (jsFileArray.length))
    {
        arrowIndex++;
        loadFile(jsFileArray[arrowIndex]);
    } 
    setArrowsFollowingIndex(arrowIndex);
});

$('.menuLink1').click(function(){
    hideArrows2();
    setTitlesAndTextContainer();
    arrowIndex = 0;
    loadFile(jsFileArray[arrowIndex]); 
    $('#arrow_right').show();
});

</script>


