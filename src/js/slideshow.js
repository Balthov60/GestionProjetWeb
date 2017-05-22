// Image Status
var index = 1;
var opacity = 0;

// Images
var images = document.getElementsByClassName('fade');
var i;

// Smooth Param
var smoothDelay = 25;
var smoothRate = 0.05;

function run() {
	smooth();
}

function smooth() {
	if (opacity < 1) {
		opacity += smoothRate;
		for (i = 0; i < images.length; i++) {
		    images[i].style.opacity = opacity;
		}
		setTimeout(smooth, smoothDelay);
	}
	else {
		changePicture();
	}
}

function invertSmooth() {
	if (opacity > 0) {
		opacity -= smoothRate;
		for (i = 0; i < images.length; i++) {
		    images[i].style.opacity = opacity;
		}
		setTimeout(invertSmooth, smoothDelay);
	}
	else {
		setTimeout(run, 5000);
	}
}

function changePicture() {
	if (index == 1) {
	  document.getElementById('restaurant_history_img').style.backgroundImage = 'url(images/historic_restaurant_1.jpg)';
	  document.getElementById('chief_history_img').style.backgroundImage = 'url(images/historic_chief_1.jpg)';
	  index = 2;
	}
	else {
	  document.getElementById('restaurant_history_img').style.backgroundImage = 'url(images/historic_restaurant_2.jpg)';
	  document.getElementById('chief_history_img').style.backgroundImage = 'url(images/historic_chief_2.jpg)';
	  index = 1;
	}
	setTimeout(invertSmooth, smoothDelay);
}

run();