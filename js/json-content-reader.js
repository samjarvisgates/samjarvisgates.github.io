// --------------------------
// PREDEFINING SOME VARIABLES
// --------------------------

var jsonFileUrl = 'json/content.json';


// -----------------------------------------
// READ JSON-FILE AND ADD CONTENT TO WEBPAGE
// -----------------------------------------
getAjax( jsonFileUrl, function(data){
	
	var jsonContent = JSON.parse(data);
	
	addContentToSection( 
		document.querySelector('.spec-primary-section-1'), 
		jsonContent.specs.primary.section1 );
	
	addContentToSection( 
		document.querySelector('.spec-primary-section-2'), 
		jsonContent.specs.primary.section2 );
	
	addContentToSection( 
		document.querySelector('.spec-primary-section-3'), 
		jsonContent.specs.primary.section3 );
	
	addReadMoreContentToSection( 
		document.querySelector('.spec-primary-section-3-read-more'), 
		jsonContent.specs.primary.section3 );
	
	addContentToSection( 
		document.querySelector('.spec-primary-section-4'), 
		jsonContent.specs.primary.section4 );
	
	addContentToSection( 
		document.querySelector('.spec-primary-section-5'), 
		jsonContent.contacts );
	
	addContentToSection( 
		document.querySelector('.spec-secondary-section-1'), 
		jsonContent.specs.secondary.section1 );
	
	addContentToSection( 
		document.querySelector('.spec-secondary-section-2'), 
		jsonContent.specs.secondary.section2 );
	
	addContentToSection( 
		document.querySelector('.spec-secondary-section-3'), 
		jsonContent.specs.secondary.section3 );
	
	addReadMoreContentToSection( 
		document.querySelector('.spec-secondary-section-3-read-more'), 
		jsonContent.specs.secondary.section3 );
	
	addContentToSection( 
		document.querySelector('.spec-secondary-section-4'), 
		jsonContent.specs.secondary.section4 );
	
	addContentToSection( 
		document.querySelector('.spec-secondary-section-5'), 
		jsonContent.contacts );
	
	var emailDivs    = document.querySelectorAll('.email-link');
	var phoneDivs    = document.querySelectorAll('.phone-link');
	var linkedinDivs = document.querySelectorAll('.linkedin-link');
	for (i=0; i<emailDivs.length; i++) {
		if( jsonContent.contacts.email ) {
			emailDivs[i].setAttribute("href", 'mailto:'+jsonContent.contacts.email);
			emailDivs[i].style.display = 'inline-block';
		}
	}
	for (i=0; i<phoneDivs.length; i++) {
		if( jsonContent.contacts.phone ) {
			phoneDivs[i].setAttribute("href", 'tel:'+jsonContent.contacts.phone);
			phoneDivs[i].style.display = 'inline-block';
		}
	}
	for (i=0; i<linkedinDivs.length; i++) {
		if( jsonContent.contacts.linkedin ) {
			linkedinDivs[i].setAttribute("href", jsonContent.contacts.linkedin);
			linkedinDivs[i].style.display = 'inline-block';
		}
	}
	
	
    // --------------------------------
    // GALLERY MOUSEOVER EVENT LISTENER
    // --------------------------------
	var galleryItems = document.querySelectorAll('.gallery-item');
    for (ii=0; ii<galleryItems.length; ii++) {
    	galleryItems[ii].addEventListener( 'mouseover', function() {
    		this.querySelector('.modal-window').style.display = 'inline-block';
    	});
    	galleryItems[ii].addEventListener( 'mouseout', function() {
    		this.querySelector('.modal-window').style.display = 'none';
    	});
    }
	// hide modal window on any click out of the modal window
	document.addEventListener("click", function(event) {
		var closeTheWindow = true;
		var clickedElement = event.target;
		for (i=0; i<galleryItems.length; i++) {
			if( isInsideElement( clickedElement, galleryItems[i] ) ) {
				closeTheWindow = false;
			}
		}
		var allModalWindows = document.querySelectorAll('.modal-window');
		if( closeTheWindow )
			for (i=0; i<allModalWindows.length; i++) {
				allModalWindows[i].style.display = 'none';
			}
	});
	
});


// ---------
// FUNCTIONs
// ---------

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

function addContentToSection( sectionDiv, contentObject ) {
	var forIndex;
	var listItemsInex;
	var isFirstHeader = true;
	var sectionDivHtml = '';
	if( contentObject.label ) {
		var currentLabel = contentObject.label ;
		if( currentLabel == 'current date' )
			currentLabel = todayDate();
		sectionDivHtml += '<p class="section-label">' + currentLabel + '</p>';
	}
	if( contentObject.blocks ) {
		var sectionBlocks = contentObject.blocks;
		for( forIndex in sectionBlocks ) {
			if( sectionBlocks[forIndex].header ) {
				if( isFirstHeader) {
					sectionDivHtml += '<h3 class="section-first-header">' + sectionBlocks[forIndex].header + '</h3>' ;
					isFirstHeader = false;
				} else {
					sectionDivHtml += '<h3 class="section-header">' + sectionBlocks[forIndex].header + '</h3>' ;
				}
			}
			if( sectionBlocks[forIndex].subHeader )
				sectionDivHtml += '<h5 class="section-subheader">' + sectionBlocks[forIndex].subHeader + '</h5>' ;
			if( sectionBlocks[forIndex].paragraph )
				sectionDivHtml += '<p class="section-paragraph">' + sectionBlocks[forIndex].paragraph + '</p>' ;
			if( sectionBlocks[forIndex].list ) {
				var listItems = sectionBlocks[forIndex].list ;
				sectionDivHtml += '<ol class="section-list">';
				for( listItemsInex in listItems ) {
					sectionDivHtml += '<li>' + listItems[listItemsInex] + '</li>' ;
				}
				sectionDivHtml += '</ol>';
			}
			if( sectionBlocks[forIndex].gallery ) {
				var galleryItems = sectionBlocks[forIndex].gallery ;
				sectionDivHtml += '<div class="gallery">';
				for( listItemsInex in galleryItems ) {
					sectionDivHtml += '<div class="gallery-item">';
					sectionDivHtml += '<img src="' + galleryItems[listItemsInex] + '">';
					sectionDivHtml += '<div class="modal-window"><img src="' + galleryItems[listItemsInex] + '"></div>';
					sectionDivHtml += '</div>' ;
				}
				sectionDivHtml += '</div>';
			}
		}
	}
	sectionDiv.innerHTML += sectionDivHtml;
}

function addReadMoreContentToSection( sectionDiv, contentObject ) {
	var forIndex;
	var listItemsInex;
	var isFirstHeader = true;
	var sectionDivHtml = '';
	if( contentObject.blocksReadMore ) {
		var sectionBlocks = contentObject.blocksReadMore;
		for( forIndex in sectionBlocks ) {
			if( sectionBlocks[forIndex].header ) {
				if( isFirstHeader) {
					sectionDivHtml += '<h3 class="section-first-header">' + sectionBlocks[forIndex].header + '</h3>' ;
					isFirstHeader = false;
				} else {
					sectionDivHtml += '<h3 class="section-header">' + sectionBlocks[forIndex].header + '</h3>' ;
				}
			}
			if( sectionBlocks[forIndex].subHeader )
				sectionDivHtml += '<h5 class="section-subheader">' + sectionBlocks[forIndex].subHeader + '</h5>' ;
			if( sectionBlocks[forIndex].paragraph )
				sectionDivHtml += '<p class="section-paragraph">' + sectionBlocks[forIndex].paragraph + '</p>' ;
			if( sectionBlocks[forIndex].list ) {
				var listItems = sectionBlocks[forIndex].list ;
				sectionDivHtml += '<ol class="section-list">';
				for( listItemsInex in listItems ) {
					sectionDivHtml += '<li>' + listItems[listItemsInex] + '</li>' ;
				}
				sectionDivHtml += '</ol>';
			}
			if( sectionBlocks[forIndex].gallery ) {
				var galleryItems = sectionBlocks[forIndex].gallery ;
				sectionDivHtml += '<div class="gallery">';
				for( listItemsInex in galleryItems ) {
					sectionDivHtml += '<div class="gallery-item">';
					sectionDivHtml += '<img src="' + galleryItems[listItemsInex] + '">';
					sectionDivHtml += '<div class="modal-window"><img src="' + galleryItems[listItemsInex] + '"></div>';
					sectionDivHtml += '</div>' ;
				}
				sectionDivHtml += '</div>';
			}
		}
	}
	sectionDiv.innerHTML += sectionDivHtml;
}

function todayDate() {
  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  var date = new Date();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}