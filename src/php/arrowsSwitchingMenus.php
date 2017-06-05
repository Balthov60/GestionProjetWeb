<?php
    $index = 0;
    $fileConcat = '' ;
    $dir = "menu/menusTypes/";
    
    function listFileIn($dir, $fileConcat)
    {
        $dh  = opendir($dir);
    
        while (false !== ($menuFilename = readdir($dh))) { 
            $menuFilesArray[] = $menuFilename;
        }

        rsort($menuFilesArray); 

        /***On crée une chaine concaténée de tous les noms de fichiers 
        pour pouvoir les utiliser dans le JS après***/

        /*** sizeof($menuFilesArray)-2 car dans le tableau il y a les fichiers mais aussi ".." et "..." (présent dans le dossier) 
        donc il faut les enlever ***/

        for($i = 0; $i<sizeof($menuFilesArray)-2; $i++) 
        {
            if($i == sizeof($menuFilesArray)-3)
                $fileConcat .= $menuFilesArray[$i];
            
            else
                $fileConcat .= $menuFilesArray[$i] . ',';
        }  

        return $fileConcat;
    }

    function getLanguage()
    {
        if(isset($_GET['lang']))
            return $_GET['lang'];
    }  
?>



<script type="text/javascript"> 

/***** Mise en Page ****/

function hideOtherTitle()
{
    $('.menu_text .main_course').hide();
    $('.menu_text .dessert').hide();
}

function hideOtherTextContainer()
{
    $('#mainCourse_Displayer').hide();
    $('#dessert_Displayer').hide();
    $('.price').hide();
}

function modifyTitleLanguage(lang)
{
    if(lang == "en")
    {
        if($('.menu_text .start_course').text() == 'Nos Poissons')
            $('.menu_text .start_course').html("Our Fishes");

        else if($('.menu_text .start_course').text() == "Nos Viandes")        
            $('.menu_text .start_course').html("Our Meats");
        
    }
}

function setTitle(plateMenuTypeArray)
{
    $('.menu_text .start_course').html(plateMenuTypeArray[0]);
}


function setPageStyle(plateMenuTypeArray, lang)
{
    hideOtherTitle();
    hideOtherTextContainer();
    setTitle(plateMenuTypeArray);
    modifyTitleLanguage(lang);
}


/*** Lecture fichier et affichage des menus ****/

function loadMenusFile(file) {
    var chemin = 'menu/menusTypes/';
    file = chemin + file;
    var xhr = new XMLHttpRequest();
    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
    xhr.open('GET', file);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    xhr.addEventListener('readystatechange', function() { // On gère ici une requête asynchrone

        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
            var plateMenuTypeArray = xhr.responseText.split('/'); /* Stock tout le fichier dans la variable (tableau)*/
            setMenu(plateMenuTypeArray);
        }

    });

    xhr.send(null); // La requête est prête, on envoie tout !
}


function setMenu(plateMenuTypeArray)
{
    var htmlCode = ' ';
    var lineMenuCounter=0;
    var nbOfTooLongMenuString = 0;
    var nbOfMenuLineNeed = 11;
    setPageStyle(plateMenuTypeArray, lang);
    
    for(var i = 1; i < plateMenuTypeArray.length; i++)
    {
        lineMenuCounter++;

        htmlCode += ' <li> -' + plateMenuTypeArray[i] + '</li>';
        
        if(i + 1 != plateMenuTypeArray.length)
            htmlCode += ' <li> - </li>';

        if(plateMenuTypeArray[i].length > 47)
            nbOfTooLongMenuString++;
    }

    while((lineMenuCounter + nbOfTooLongMenuString) <= nbOfMenuLineNeed)
    {
        lineMenuCounter++;  
        htmlCode += '<li>'+'</br></br>'+'</li>';

    }

    document.getElementsByClassName('menuDisplayer')[0].innerHTML = htmlCode;
}



/**** Arrows Handlers ****/

function hideArrows2()
{
    $('#arrow_right2').hide(); 
    $('#arrow_left2').hide();
}

function hideArrows()
{
    $('#arrow_right').hide(); 
    $('#arrow_left').hide();
}


function setArrowsMenusFollowingIndex(arrowMenusIndex)
{
    if(arrowMenusIndex + 1 == jsMenusFileArray.length)
    {
        hideArrows2();
        $('#arrow_left2').show();
    }

    else if(arrowMenusIndex == 0 )
    {
        hideArrows2();
        $('#arrow_right2').show();  
    }

    else 
    {
        $('#arrow_left2').show();
        $('#arrow_right2').show(); 
    }
        
}


/***** Click Handlers ******/

var jsMenusFileArray = ('<?php echo listFileIn($dir, $fileConcat); ?>').split(',');
var lang = '<?php echo getLanguage(); ?>';


$('#arrow_left2').click(function() {
    
    if(arrowMenusIndex > 0)
    {
        arrowMenusIndex--;
        loadMenusFile(jsMenusFileArray[arrowMenusIndex]);
    }
    setArrowsMenusFollowingIndex(arrowMenusIndex);
});

$('#arrow_right2').click(function(){
    if(arrowMenusIndex + 1 < (jsMenusFileArray.length))
    {
        arrowMenusIndex++;
        loadMenusFile(jsMenusFileArray[arrowMenusIndex]);
    } 
    setArrowsMenusFollowingIndex(arrowMenusIndex);
});

$('.menuLink3').click(function(){
    arrowMenusIndex = 0;
    loadMenusFile(jsMenusFileArray[arrowMenusIndex]); 
    hideArrows2();
    hideArrows();
    $('#arrow_right2').show();
});

</script>


