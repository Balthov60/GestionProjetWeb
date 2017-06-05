$(document).ready(function(){
  resetHighlight();
  highlight($('#menuLinkMeal'));
});



/* Assign Click for Menu */

$('#menuLinkMeal').click(function() {
  mealClick();
  resetHighlight();
  highlight($('#menuLinkMeal'));
});

$('#menuLinkToday').click(function() {
  mealClick();
  resetHighlight();
  highlight($('#menuLinkToday'));
});

$('#menuLinkMenu').click(function() {
  menuClick();
  resetHighlight();
  highlight($('#menuLinkMenu'));
});

/************/
/* Function */
/************/

function mealClick() {
  $('.menu_text .start_course').html(entree);
  $('.menu_text .main_course').html(plat);
  $('.menu_text .dessert').html(dessert);

  $('.menuDisplayer').css({'font-size' : '1em', 'list-style' : 'none', 'text-align' : 'center'});  

}

function menuClick() {
  if(lang == 'fr')
  {
    $('.menu_text .start_course').html('- Nos Viandes -');
    $('.menu_text .main_course').html('- Nos Viandes -');
    $('.menu_text .dessert').html('- Nos JSP -');
  }

  else
  {
    $('.menu_text .start_course').html('- Our Meat -');
    $('.menu_text .main_course').html('- Without Alcohol -');
    $('.menu_text .dessert').html('- Pre-Dinner -');
  }

  $('.menuDisplayer').css({'display' : 'inline-block', 'text-align' : 'center', 'left' : '10px'});  
}



function resetHighlight() {
  $('.menuLink').css('background', '#FFFFFF');
}

function highlight(button) {
  button.css('background', '#DEDEDE');
} 