var i = 1;

function run() {
	if (i == 1) {
	  document.getElementById('restaurant_history_img').style.backgroundImage = 'url(images/historic_restaurant_1.jpg)';
	  document.getElementById('chief_history_img').style.backgroundImage = 'url(images/historic_chief_1.jpg)';
	  i = 2;
	}
	else {
	  document.getElementById('restaurant_history_img').style.backgroundImage = 'url(images/historic_restaurant_2.jpg)';
	  document.getElementById('chief_history_img').style.backgroundImage = 'url(images/historic_chief_2.jpg)';
	  i = 1;
	} 
	setTimeout(run, 5000);
}

run();