function placeAside() {
	var asideNavigation = document.getElementById("link_aside");

	var top = $(window).height() / 2 - $(link_aside).height() / 2;
	var left = ($(window).width() - $(main_content).width()) / 2 + $(main_content).width() - $(link_aside).width() - 5;

	asideNavigation.style.top = top + 'px';
	asideNavigation.style.left = left + 'px';
}

function changeColor(button) {
	for (var i = 0; i < asideNavigationItems.length; i++) {
		asideNavigationItems[i].src = 'images/side_button.png';
	}
	button.src = 'images/side_button_full.png'
}

var asideNavigationItems = document.getElementsByClassName("asideButton");
for (var i = 0; i < asideNavigationItems.length; i++) {
	asideNavigationItems[i].onclick = function() { changeColor(this) };
}

document.getElementsByTagName("BODY")[0].onresize = function() { placeAside() };
placeAside();