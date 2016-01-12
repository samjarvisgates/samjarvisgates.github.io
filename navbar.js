// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-71884021-1', 'auto');
ga('send', 'pageview');

// Everything Else
var offset = 1000;
var duration = 500;

$(document).ready(function () {
	if ($(window).scrollTop() < $(window).height()){
		$("#nav-bar").css({"background-color": "rgba(0, 0, 0, 0.25)"});
		$(".dropdown").css({"background-color": "rgba(0, 0, 0, 0.25)"});
	}

	$(".portfolio").hover (
		function () {
			$("#portfolio").css({"padding-top": "18px"});
		    $('.dropdown').slideDown('fast');
		    $(".dropdown").hover(
		    	function () {
		    		$("#portfolio").css({"padding-top": "19px"});
		    	},
		    	function () {
		    		$("#portfolio").css({"padding-top": "18px"});
		    	}
		    );
		},
		function () {
			$("#portfolio").css({"padding-top": "19px"});
		    $('.dropdown').slideUp('fast');
		}
	);

	$("#resume").hover (
		function () {
			$("#resume").css({"padding-top": "18px"});
		},
		function () {
			$("#resume").css({"padding-top": "19px"});
		}
	);

	$('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
    	return false;
	});

	$('#down').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $(".gray").offset().top}, duration);
    	return false;
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() < $(window).height() - 100) {
			$("#nav-bar").css({"background-color": "rgba(0, 0, 0, 0.2)", "transition": "background-color 0.5s linear"});
			$(".dropdown").css({"background-color": "rgba(0, 0, 0, 0.2)", "transition": "background-color 0.5s linear"});
		} else {
			$("#nav-bar").css({"background-color": "rgba(0, 0, 0, 0.6)", "transition": "background-color 0.5s linear"});
			$(".dropdown").css({"background-color": "rgba(0, 0, 0, 0.6)", "transition": "background-color 0.5s linear"});
		}
		// scroll to top button
		if ($( this ).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
	});
});

var interval;
function animateOpacity()
{
	var opacity = 0;
	var o_change = .05;

	interval = setInterval(function() {
		if (Math.abs(opacity) < 0.1) {
			o_change = 0.05;
		}
		if (Math.abs(opacity - 1) < .02) {
			o_change = -0.05;
		}
		opacity += o_change;
	    $("#down").css({"opacity": opacity});
	}, 80);
}

function percentInView(elem) 
{
	var $elem = $(elem);
    var $window = $(window);

    var wTop = $window.scrollTop();
    var wBottom = wTop + $window.height();

    var eTop = $elem.offset().top;
    var eBottom = eTop + $elem.height();
    
    if (Math.abs((wBottom - eTop)/$elem.height() - 0.7) < 0.2) {
    	return true;
    } else if (eTop > wTop && eBottom < wBottom) {
    	return true;
    } else {
    	return false;
    }
    // can't figure out how to animate it out of screen
}
