// Image Status
var index = 1;
var opacity = 0;
var pictureQty = 2;

// Images
var images = document.getElementsByClassName("fade");
var background = document.getElementsByClassName("slideshow");
var path = ["images/historic_chief_", "images/historic_restaurant_"];
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
	if (i >= pictureQty)
		i = 0;
	background[i].style.backgroundImage = 'url(' + path[i] + index + '.jpg)';
	i++;
	setTimeout(invertSmooth, smoothDelay);
}

run();