// Image Status
var index = 1;
var opacity = 0;
var pictureQty = 3;	

// Images
var images = document.getElementsByClassName("fade");
var background = document.getElementsByClassName("slideshow");
var path = ["images/historic/chief_", "images/historic/restaurant_"];
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
	if (index > pictureQty)
		index = 0;

	index++;
	for (i = 0; i < background.length; i++) {
		background[i].style.backgroundImage = 'url(' + path[i] + index + '.jpg)';
	}

	index++;
	setTimeout(invertSmooth, smoothDelay);
}

index++
for (i = 0; i < background.length; i++) {
	background[i].style.backgroundImage = 'url(' + path[i] + index + '.jpg)';
}
setTimeout(run, 5000);