// Image Status
var index = 1;
var opacity = 0;
var pictureQty = 3;

// Images
var images = document.getElementsByClassName("fade");
var background = document.getElementsByClassName("slideshow");
var path = ["images/historic/chief_", "images/historic/restaurant_"];
var imageSwitcher = 0;

// slideshow Param
var smoothDelay = 25;
var smoothRate = 0.05;
var slideshowFrequency = 3750;

// Init Background
for (var i = 0; i < background.length; i++) {
	background[i].style.backgroundImage = 'url(' + path[i] + 1 + '.jpg)';
}

// Circle call methods. TODO: Find Cleaner Way ?
setTimeout(smooth, slideshowFrequency);

function smooth() {
	if (opacity < 1) {
		opacity += smoothRate;
		images[imageSwitcher].style.opacity = opacity;
		setTimeout(smooth, smoothDelay);
	}
	else {
		changePicture();
	}
}

function changePicture() {
	if (index % pictureQty + 1> pictureQty)
		index = 0;

	index++;
	background[imageSwitcher].style.backgroundImage = 'url(' + path[imageSwitcher] + (index % pictureQty + 1)+ '.jpg)';

	setTimeout(invertSmooth, smoothDelay);
}

function invertSmooth() {
	if (opacity > 0) {
		opacity -= smoothRate;
		images[imageSwitcher].style.opacity = opacity;
		setTimeout(invertSmooth, smoothDelay);
	}
	else {
		imageSwitcher++;
		if (imageSwitcher >= images.length)
			imageSwitcher = 0;
		setTimeout(smooth, slideshowFrequency);
	}
}