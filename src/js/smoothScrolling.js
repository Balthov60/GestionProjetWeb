$(document).ready(function() {
	$('.middleScroll').click(function() {
		var linkHref = $(this).attr('href');

		var height = $(linkHref).offset().top - ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight) / 2;
		if (height < 0)
			height = 0;

		$('html, body').animate( {
			scrollTop: height
		});

		e.preventDefault();
	});

	$('.scroll').click(function() {
		var linkHref = $(this).attr('href');

		$('html, body').animate( {
			scrollTop: $(linkHref).offset().top
		});

		e.preventDefault();
	});
});