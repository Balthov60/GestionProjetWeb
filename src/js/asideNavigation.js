var asideNavigationItems = document.getElementsByClassName("asideButton");
var fullButton = 'images/utilities/side_button_full.png';
var emptyButton = 'images/utilities/side_button.png';

/* Switch Navifation Items Status When Waypoint Is Trigger */
var waypointHistory = new Waypoint(
{
	element: document.getElementById('scrollHistory'),
	handler: function(direction) {
		if (direction == 'down')
			changeStatus(asideNavigationItems[0]);
	},
	offset: '50%'
});
var waypointMenu = new Waypoint(
{
	element: document.getElementById('menuScrollPoint'),
	handler: function(direction) {
		if (direction == 'down')
			changeStatus(asideNavigationItems[1]);
		else
			changeStatus(asideNavigationItems[0]);
	},
	offset: '50%'
});
var waypointContact = new Waypoint(
{
	element: document.getElementById('contactScrollPoint'),
	handler: function(direction) {
		if (direction == 'down')
			changeStatus(asideNavigationItems[2]);
		else
			changeStatus(asideNavigationItems[1]);
	},
	offset: '50%'
});

/* Enable Smooth Scrolling On Click */
$(document).ready(function() 
	{
	$('.scrollButton').click(function() 
		{
		var linkHref = $(this).attr('href');

		var menuHeight = document.getElementById('menu').offsetHeight;
		var height = 0;

		if (linkHref == "#scrollMenu") {
			if (document.getElementById('menu').offsetHeight < ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight))
				height = $(linkHref).offset().top - ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight) / 2;
			else
				height = $('#menuScrollPoint').offset().top;
		}
		else if (linkHref == "#scrollHistory") {
			if (document.getElementById("restaurant_history").offsetHeight * 2 < ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight))
				height = $(linkHref).offset().top - ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight) / 2;
			else
				height = $('#restaurant_history').offset().top - 10;
		}
		else if (linkHref == "#scrollContact") {
			if (document.getElementById("contact").offsetHeight * 2 < ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight))
				height = $(linkHref).offset().top - ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight) / 2;
			else
				height = $('#contactScrollPoint').offset().top - 10;
		}
		else {
			height = $(linkHref).offset().top - ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight) / 2;
		}

		height -= headerSize;

		if (height < 0)
			height = 0;

		$('html, body').animate( {
			scrollTop: height
		});

		e.preventDefault();
	});
});

/* Replace button while resizing */
document.getElementsByTagName("BODY")[0].onresize = function() { placeAside() };
var headerSize = 0;
placeAside();

/***********************/
/* Function Definition */
/***********************/

function changeStatus(button) {
	for (var i = 0; i < asideNavigationItems.length; i++)
		asideNavigationItems[i].src = emptyButton;

	button.src = fullButton;
}

function placeAside() {
	var asideNavigation = document.getElementById("link_aside");

	var top = $(window).height() / 2 - $(link_aside).height() / 2;
	var left = ($(window).width() - $(main_content).width()) / 2 + $(main_content).width() - $(link_aside).width() - 5;

	asideNavigation.style.top = top + 'px';
	asideNavigation.style.left = left + 'px';

	var width = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth
	if (width < 1080) {
		var left = width;

		var height = document.getElementById("header").offsetHeight;
		height = height - 20;
		document.getElementById("fake_header").style.height = height + 'px';

	    headerSize = height + 20;
	}
	else {
		headerSize = 0;
	}
}