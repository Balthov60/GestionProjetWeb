<?php
    $index = 0;
    $fileConcat = '' ;
    $dir = "C:/wamp64/www/testlesadrets/src/menu/main_Meals";
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

document.addEventListener("DOMContentLoaded", function() {
  loadFile(jsFileArray[0]);
  arrowIndex = 0;
});

    function loadFile(file) {
        var chemin = 'menu/main_Meals/';
        file = chemin + file;
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


    function setArrowsFollowingIndex(arrowIndex)
    {
         if(arrowIndex + 1  == jsFileArray.length)
        {
            $('#arrow_right').hide(); 
            $('#arrow_left').show();
        }

        else if(arrowIndex== 0 )
        {
            $('#arrow_left').hide();
            $('#arrow_right').show();  
        }

        else 
            $('#arrow_left').show();
            $('#arrow_right').show(); 
    }




    var jsFileArray = ('<?php echo $fileConcat; ?>').split(',');



    $(document).ready(function(){

        setArrowsFollowingIndex(arrowIndex);

        $('#arrow_left').click(function() {
            
            if(arrowIndex > 0)
            {
                arrowIndex--;
                //alert(arrowIndex); 
                loadFile(jsFileArray[arrowIndex]); 
            }
            setArrowsFollowingIndex(arrowIndex);

        });

        $('#arrow_right').click(function(){
            if(arrowIndex + 1 < (jsFileArray.length))
            {
                arrowIndex++;
                //alert(arrowIndex);  
                loadFile(jsFileArray[arrowIndex]);
            } 

            setArrowsFollowingIndex(arrowIndex);
 
        }) 
    });
</script>


