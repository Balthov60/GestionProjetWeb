
$(document).ready(function(){
  clickOnFirstOrSecondMenu();
  clickOnThirdMenu(); 
});


function clickOnFirstOrSecondMenu()
{
  $('.menuLink1').click(function() {
    $('.menu_text .start_course').html(entree);
    $('.menu_text .main_course').html(plat);
    $('.menu_text .dessert').html(dessert);
  });

  $('.menuLink2').click(function() {
    $('.menu_text .start_course').html(entree);
    $('.menu_text .main_course').html(plat);
    $('.menu_text .dessert').html(dessert);
  });
}


function clickOnThirdMenu()
{
  $('.menuLink3').click(function() {
    if(lang == 'fr')
    {
      $('.menu_text .start_course').html('- Vins -');
      $('.menu_text .main_course').html('- Sans Alcool -');
      $('.menu_text .dessert').html('- Apéritifs -');
    }

    else
    {
      $('.menu_text .start_course').html('- Wines -');
      $('.menu_text .main_course').html('- Without Alcohol -');
      $('.menu_text .dessert').html('- Pre-Dinner -');
    }

    //$('.menuDisplayer').css({'font-size' : '0.7em', 'list-style' : 'circle', 'text-align' : 'left', '-moz-columns': '2'});  
  });
}