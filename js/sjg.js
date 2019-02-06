// --------------------------
// PREDEFINING SOME VARIABLES
// --------------------------

// LOGO and SWITCH BUTTON components
var logoPath     = document.querySelector('#sjg-logo-path');
var switchButton = document.querySelector('.sjg-switch svg');
var switchRect   = document.querySelector('#sjg-switch-rect');
var switchCircle = document.querySelector('#sjg-switch-circle');

// Background Wraps
// Primary Background wrap
var primaryBackgroungWrap = document.querySelector('.bg-primary-1');
// Primary Background wrap-2
var primaryBackgroungWrap2 = document.querySelector('.bg-primary-2');
// Secondary Background wrap
var secondaryBackgroungWrap = document.querySelector('.bg-secondary-1');

// Primary and Secondary Contents Wraps
var primaryContentWrap   = document.querySelector('.primary-content-wrap');
var secondaryContentWrap = document.querySelector('.secondary-content-wrap');

// Read-More button
var buttonMore = document.querySelector('.btn-player-more');
// View-Less button
var buttonLess = document.querySelector('.btn-player-less');
// Read-More content
var readMoreContent = document.querySelector('.read-more-content');
// Media Player Body
var mediaPlayerBody = document.querySelector('.media-player-body');

// Read-More button (Angel City)
var buttonMoreLA = document.querySelector('.btn-angel-city-more');
// View-Less button (Angel City)
var buttonLessLA = document.querySelector('.btn-angel-city-less');
// Read-More content (Angel City)
var readMoreContentLA = document.querySelector('.angel-city-read-more-content');
// Angel City Image (full)
var angelCityFull = document.querySelector('.angel-city-full');

// minimum browser width for PC-mode (switching to mobile-mode)
var minPcWidth = 768;



// ------------------------
// CHECK FOR DOCUMENT READY
// ------------------------
// in case the document is already rendered
if ( document.readyState!='loading') {
    runOnDocumentReady();
}
// modern browsers
else if ( document.addEventListener ) {
    document.addEventListener( 'DOMContentLoaded', runOnDocumentReady() );
}
// IE <= 8
else {
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState=='complete') 
            runOnDocumentReady();
    });
}

// RUN THIS ON DOOCUMENT READY
function runOnDocumentReady() {
	
    // ------------------------
    // HIDING SECONDARY CONTENT
    // ------------------------
	secondaryContentWrap.style.display = 'none';
    
	
    // -----------------------------
    // LAST SPACER HEIGHT CORRECTION
    // -----------------------------
    correctLastSpacerHeight();
    
    
    // ---------------------
    // SCROLL EVENT LISTENER
    // ---------------------
    document.addEventListener('scroll', function() {
    	
    	// fade in backgrounds when scroll reaches their sections
    	fadeOnScrollAll();
    	
    	// corrects Last-Spacer height on order to align last section to the middle
    	correctLastSpacerHeight();
    });
    
    
    // ---------------------
    // RESIZE EVENT LISTENER
    // ---------------------
    window.addEventListener("resize", function() {
    	
    	// corrects Last-Spacer height on order to align last section to the middle
    	correctLastSpacerHeight();
    });
    
        
    // ---------------------
    // CLICK EVENT LISTENERs
    // ---------------------
    
    // Click on SWITCH button
    switchButton.addEventListener('click', function() {
    	switchModes();
    });
    
    // Click on READ-MORE button
    buttonMore.addEventListener('click', function() {
    	buttonMore.style.display = 'none';
    	buttonLess.style.display = 'flex';
    	if( isMobileView() )
    		mediaPlayerBody.style.height = '693px';
    	else
    		mediaPlayerBody.style.height = '905px';
    	readMoreContent.style.height = 'auto';
    });
    // Click on VIEW-LESS button
    buttonLess.addEventListener('click', function() {
    	buttonLess.style.display = 'none';
    	buttonMore.style.display = 'flex';
    	mediaPlayerBody.style.height = '0';
    	readMoreContent.style.height = '0';
    });
    
    // Click on READ-MORE button (LA)
    buttonMoreLA.addEventListener('click', function() {
    	buttonMoreLA.style.display = 'none';
    	buttonLessLA.style.display = 'flex';
		var clientBrowserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    	if( clientBrowserWidth < 768 )
    		angelCityFull.style.height = '244px';
    	else if( clientBrowserWidth < 960 )
    		angelCityFull.style.height = '519px';
    	else
    		angelCityFull.style.height = '649px';
    	readMoreContentLA.style.height = 'auto';
    });
    // Click on VIEW-LESS button (LA)
    buttonLessLA.addEventListener('click', function() {
    	buttonLessLA.style.display = 'none';
    	buttonMoreLA.style.display = 'flex';
    	angelCityFull.style.height = '0';
    	readMoreContentLA.style.height = '0';
    });
    
}



// ---------
// FUNCTIONs
// ---------

function isPrimaryView() {
	if( secondaryBackgroungWrap.style.opacity == '1' )
		return false;
	else
		return true;
}

function switchModes() {
    if( !isPrimaryView() ) {
		
		logoPath.style.fill     = "#FFFFFF";
		switchRect.style.stroke = "#FFFFFF";
		switchCircle.style.fill = "#FFFFFF";
		animateAttrTo( switchCircle, 'x', 2, 0.15 );
		
		primaryContentWrap.style.display   = 'flex';
		secondaryContentWrap.style.display = 'none';
		
        primaryBackgroungWrap.style.opacity   = '1';
		primaryBackgroungWrap2.style.opacity  = '0';
        secondaryBackgroungWrap.style.opacity = '0';
		fadeOnScrollAll();
		
    } else {
		
		logoPath.style.fill     = "#FFA475";
		switchRect.style.stroke = "#FFA475";
		switchCircle.style.fill = "#FFA475";
		animateAttrTo( switchCircle, 'x', 22, 0.15 );
		
		primaryContentWrap.style.display   = 'none';
		secondaryContentWrap.style.display = 'flex';
		
        primaryBackgroungWrap.style.opacity   = '1';
		primaryBackgroungWrap2.style.opacity  = '1';
        secondaryBackgroungWrap.style.opacity = '1';
		fadeOnScrollAll();
		
    }
}

function correctLastSpacerHeight() {
  var lastSectionEl  = document.querySelector('.say-hello-section');
  var lastSpacerEl   = document.querySelector('.last-spacer');
  var lastSectionEl2 = document.querySelector('.say-hello-section-2');
  var lastSpacerEl2  = document.querySelector('.last-spacer-2');
  
  var windowHeight       = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var lastSectionHeight  = lastSectionEl.offsetHeight ;
  var lastSectionHeight2 = lastSectionEl2.offsetHeight ;
  
  var lastSpacerNewHeight  = windowHeight/2 - lastSectionHeight/2 ;
  var lastSpacerNewHeight2 = windowHeight/2 - lastSectionHeight2/2 ;
  
  lastSpacerEl.style.height  = lastSpacerNewHeight + "px" ;
  lastSpacerEl2.style.height = lastSpacerNewHeight2 + "px" ;
}

function fadeOutOnSection( sectEl, targEl ) {
	
	var windHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var sectBoundTop = sectEl.getBoundingClientRect().top;
	
	if( sectBoundTop >= windHeight ) {
		targEl.style.opacity = '1';
	} else if ( sectBoundTop <= 0 ) {
		targEl.style.opacity = '0';
	} else {
		targEl.style.opacity = sectBoundTop/windHeight;
	}
}
function fadeOutOnSectionHalfScreen( sectEl, targEl ) {
	
	var windHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var halfHeight = windHeight/2;
	var sectBoundTop = sectEl.getBoundingClientRect().top;
	
	if( sectBoundTop >= windHeight ) {
		targEl.style.opacity = '1';
	} else if ( sectBoundTop <= halfHeight ) {
		targEl.style.opacity = '0';
	} else {
		targEl.style.opacity = (sectBoundTop-halfHeight)/halfHeight;
	}
}
function fadeInOnSection( sectEl, targEl ) {
	
	var windHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var sectBoundTop = sectEl.getBoundingClientRect().top;
	
	if( sectBoundTop >= windHeight ) {
		targEl.style.opacity = '0';
	} else if ( sectBoundTop <= 0 ) {
		targEl.style.opacity = '1';
	} else {
		var middleOpacity = 1 - sectBoundTop/windHeight ;
		targEl.style.opacity = middleOpacity ;
	}
}
function fadeInOnSectionHalfScreen( sectEl, targEl ) {
	
	var windHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var halfHeight = windHeight/2;
	var sectBoundTop = sectEl.getBoundingClientRect().top;
	
	if( sectBoundTop >= windHeight ) {
		targEl.style.opacity = '0';
	} else if ( sectBoundTop <= halfHeight ) {
		targEl.style.opacity = '1';
	} else {
		var middleOpacity = 1 - (sectBoundTop-halfHeight)/halfHeight ;
		targEl.style.opacity = middleOpacity ;
	}
}
function fadeOnScrollAll() {
	
	if( isPrimaryView() ){
        primaryBackgroungWrap.style.opacity   = '1';
		primaryBackgroungWrap2.style.opacity  = '0';
        secondaryBackgroungWrap.style.opacity = '0';
		// fade out "white ripples background" when scroll reaches "project spotlight" section
		fadeInOnSection( document.querySelector('.fade-in-primary-bg-2'), document.querySelector('.bg-primary-2') );
	} else {
        primaryBackgroungWrap.style.opacity   = '1';
		primaryBackgroungWrap2.style.opacity  = '1';
        secondaryBackgroungWrap.style.opacity = '1';
		// fade in secondary bg-colors when scroll reaches their sections
		fadeInOnSectionHalfScreen( document.querySelector('.fade-in-secondary-bg-2'), document.querySelector('.bg-secondary-2') );
		fadeInOnSectionHalfScreen( document.querySelector('.fade-in-secondary-bg-3'), document.querySelector('.bg-secondary-3') );
		fadeInOnSectionHalfScreen( document.querySelector('.fade-in-secondary-bg-4'), document.querySelector('.bg-secondary-4') );
		fadeInOnSectionHalfScreen( document.querySelector('.fade-in-secondary-bg-5'), document.querySelector('.bg-secondary-5') );
		fadeInOnSectionHalfScreen( document.querySelector('.fade-in-secondary-bg-hello'), document.querySelector('.bg-secondary-hello') );
	}
}

function isMobileView() {
	var clientBrowserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if( clientBrowserWidth < minPcWidth )
		return true;
	else
		return false;
}

function animateAttrTo( el, attr, toVal, animationTimeSec ) {
	attr    = attr || 'opacity';
    toVal   = toVal || 0;
	animationTimeSec = animationTimeSec || 0.3;
	var stepNorm = 1;
	if( animationTimeSec >= 0.025 )
		stepNorm = 25 / (animationTimeSec*1000);
	var initVal = el.getAttribute(attr);
	stepAbs = ( toVal - initVal ) * stepNorm ;
	if( stepAbs == 0 ) return;
    (function oneStep() {
		var nextAttrVal = parseFloat(el.getAttribute(attr)) + stepAbs ;
		if( stepAbs > 0 ) {
			if( nextAttrVal >= toVal ) {
				el.setAttribute(attr,toVal);
				return;
			} else {
				el.setAttribute(attr,nextAttrVal);
				setTimeout(oneStep, 25);
			}
		} else {
			if( nextAttrVal <= toVal ) {
				el.setAttribute(attr,toVal);
				return;
			} else {
				el.setAttribute(attr,nextAttrVal);
				setTimeout(oneStep, 25);
			}
		}
	})();
}

function isInsideElement( targetElm, boxElm ) {
	var targetElement = targetElm ;
    do {
        if (targetElement == boxElm) {
            return true;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);
	return false;
}
