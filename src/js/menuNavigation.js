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
}

function menuClick() {
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
    }x
  // $('.menuDisplayer').css({'font-size' : '0.7em', 'list-style' : 'circle', 'text-align' : 'left', '-moz-columns': '2'});  
}

function resetHighlight() {
  $('.menuLink').css('background', '#FFFFFF');
}

function highlight(button) {
  button.css('background', '#DEDEDE');
} 