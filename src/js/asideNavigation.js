function placeAside() {
	var asideNavigation = document.getElementById("link_aside");

	var top = $(window).height() / 2 - $(link_aside).height() / 2;
	var left = ($(window).width() - $(main_content).width()) / 2 + $(main_content).width() - $(link_aside).width() - 5;

	asideNavigation.style.top = top + 'px';
	asideNavigation.style.left = left + 'px';
}

function changeColor(button) {
	for (var i = 0; i < asideNavigationItems.length; i++) {
		asideNavigationItems[i].src = 'images/utilities/side_button.png';
	}
	button.src = 'images/utilities/side_button_full.png'
}

var asideNavigationItems = document.getElementsByClassName("asideButton");
for (var i = 0; i < asideNavigationItems.length; i++) {
	asideNavigationItems[i].onclick = function() { changeColor(this) };
}

var waypointHistory = new Waypoint({
	element: document.getElementById('scrollHistory'),
	handler: function(direction) {
		if (direction == 'down')
			changeColor(asideNavigationItems[0]);
	},
	offset: '50%'
});
var waypointMenu = new Waypoint({
	element: document.getElementById('menuScrollPoint'),
	handler: function(direction) {
		if (direction == 'down')
			changeColor(asideNavigationItems[1]);
		else
			changeColor(asideNavigationItems[0]);
	},
	offset: '50%'
});
var waypointContact = new Waypoint({
	element: document.getElementById('contactScrollPoint'),
	handler: function(direction) {
		if (direction == 'down')
			changeColor(asideNavigationItems[2]);
		else
			changeColor(asideNavigationItems[1]);
	},
	offset: '50%'
});


document.getElementsByTagName("BODY")[0].onresize = function() { placeAside() };
placeAside();