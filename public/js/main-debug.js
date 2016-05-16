// Add click interaction to 'hamburger' toggle open icon for mobile nav
function setHamburgerInteraction() {
	var hamburger = document.getElementById('logo'); // Interactive element to push mobile nav into view
	hamburger.setAttribute('class', 'toggle-nav-button toggle-open-icon'); // Add class to element in order to show icon in initial state of mobile view
	var toggleNavButton = document.querySelector('.toggle-nav-button'); 
	var mainNav = document.getElementById('main-nav'); // mainNav top bar container
	var hugeMobileIcon = document.querySelector('.visible-desktop'); // HUGE logo
	var pageContent = document.querySelector('.wrapper');
	var toggleCloseOpen = document.getElementById('logo');
	var maskOverlay = document.querySelector('.overlay');	

		// Push 'n' Pull in mobile
		toggleNavButton.setAttribute('href', 'javascript:void(0)');	 // Prevents default event of targeted link	
		
		toggleNavButton.addEventListener('click', function() {			
			
			if(maskOverlay.style.opacity != '1') {
				maskOverlay.style.opacity = '1';
			}else{
				maskOverlay.style.opacity = '0';
			}
		
			// Push primary navigation RIGHT -->
			if(mainNav.classList != 'primary-nav primary-nav-push-right') {
				mainNav.removeAttribute('class');
				mainNav.setAttribute('class','primary-nav primary-nav-push-right');

				toggleCloseOpen.setAttribute('class', 'toggle-close-icon');
				toggleCloseOpen.style.transition = '0.3s';

				// Pushes HUGE logo in mobile navigation IN TO view
				if(window.innerWidth < 769) {
					hugeMobileIcon.style.transform = 'translateX(0%)';
					hugeMobileIcon.style.transition = '0.3s';
					hugeMobileIcon.setAttribute('href', 'javascript:void(0)');
				}
			}else{

			// Pull primary navigation LEFT <--
				mainNav.removeAttribute('class');
				mainNav.setAttribute('class', 'primary-nav primary-nav-pull-left');

				toggleCloseOpen.setAttribute('class', 'toggle-open-icon');
				toggleCloseOpen.style.transition = '0.3s';

				// Pulls HUGE logo in mobile navigation OUT OF view
				if(window.innerWidth < 769) {
					hugeMobileIcon.style.transform = 'translateX(0%)';
					hugeMobileIcon.style.transform = 'translateX(-200%)';
					hugeMobileIcon.style.transform = '0.3s';
				}
			}

			// Push page content to right -->
			if(pageContent.classList != 'wrapper wrapper-push-right') {
				pageContent.removeAttribute('class');
				pageContent.setAttribute('class', 'wrapper wrapper-push-right');


			}else{
			
			// Pull page content to left <--	
				pageContent.removeAttribute('class');
				pageContent.setAttribute('class', 'wrapper wrapper-pull-left');
			}
	});
}
// Append arrow for items with dropown content in mobile view
function appendArrow(itemsDiv, subDiv) {
	var span = document.createElement('span');
	var img = document.createElement('img');
	var arrow = subDiv.parentNode;

	// Create <span> to hold arrow
	img.setAttribute('src', '/images/arrow.png');
	span.appendChild(img);
	span.setAttribute('class', 'chevron-rotate-down');
	arrow.firstChild.appendChild(span);

	return arrow;
}
// Toggle push down and pull up for subDiv container links
function toggleDropdownContent (itemsDiv, subDiv) {
	var arrow = appendArrow(itemsDiv, subDiv); // Create arrow in span elemnt to work with
	var mask = document.querySelector('.overlay');

	// Click to push down and pull up for subDiv containers
	itemsDiv.addEventListener('click', function() {

		if(itemsDiv.firstChild.nextSibling.classList.contains('hide')) {
			var chevron = this.querySelector('.chevron-rotate-down');
			subDiv.removeAttribute('class');
			subDiv.setAttribute('class', 'dropdown-content show');	
			if(window.innerWidth > 768) {
				mask.style.opacity = '1';
			}

			// Rotate chevron into initial position depending on current class of subDiv		
			chevron.removeAttribute('class');
			chevron.setAttribute('class', 'chevron-rotate-up');	
			
		}else{

			subDiv.removeAttribute('class');
			subDiv.setAttribute('class', 'dropdown-content hide');
			if(window.innerWidth > 768) {
				mask.style.opacity = '0';
			}

			// Rotate chevron 180 degrees depending on current class of subDiv
			var chevron = this.querySelector('.chevron-rotate-up');
			chevron.removeAttribute('class');
			chevron.setAttribute('class', 'chevron-rotate-down');
		}
	});
}

// Construct div container to hold secondary items
function setSubNav(itemsDiv, subItemsLength, subItems) {
	var subDiv = document.createElement('div');	

	if(typeof(subItems) !== 'undefined') { // Only work with items with defined sub items
		if(subItemsLength > 0) {
			for(var i = 0; i < subItems.length; i++) {
				var subLabel = subItems[i].label;
				var subUrl = subItems[i].url;
				var subLink = document.createElement('a')
				var subText = document.createTextNode(subLabel);
				subLink.appendChild(subText);
				subLink.setAttribute('href', subUrl);
				subDiv.appendChild(subLink);
				subDiv.setAttribute('class', 'dropdown-content hide');
				itemsDiv.appendChild(subDiv);
			}	
			toggleDropdownContent(itemsDiv, subDiv); // Toggle dropdown content for mobile
			window.addEventListener('click', function(event) {
				if(event.target !== document.querySelector('.top-nav-item') && (event.target.parentNode.className !== 'top-nav-item')) {				
					if(window.innerWidth > 768) {
						subDiv.removeAttribute('class');
						subDiv.setAttribute('class', 'dropdown-content hide');
						if(document.querySelector('.overlay').style.opacity !== '0') {
							document.querySelector('.overlay').style.opacity = '0';
						}
					}
				}
			});
			return subDiv;
		}
	}
}
// Create div elements to hold items
function setListItems(items, label, url) {
	var itemsDiv = document.createElement('div');
	var itemsUrl = document.createElement('a');
	var itemsUrlText = document.createTextNode(label);
	itemsUrl.appendChild(itemsUrlText);
	itemsUrl.setAttribute('href', url);
	itemsDiv.appendChild(itemsUrl);
	itemsDiv.setAttribute('class', 'top-nav-item');

	return itemsDiv;	
}
// Set labels and urls to variables to work with
function setItems(items) {
	var itemsLength = items.length;
	var subClick = items.items;
	var mainNavContainer = document.getElementById('main-nav');
	for(var i = 0; i < itemsLength; i++) {
		var itemsLabel = items[i].label;
		var itemsUrl = items[i].url;
		var itemsDiv = setListItems(items, itemsLabel, itemsUrl);
		var subItems = items[i].items;
		var subItemsLength = items[i].items.length;
		var subDiv = setSubNav(itemsDiv, subItemsLength, subItems);

		mainNavContainer.appendChild(itemsDiv);
	}
	setHamburgerInteraction();
	
	return itemsDiv;
}
// Fire AJAX request
function accessNavItems () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var response = xhr.responseText;
			var navItems = JSON.parse(response);
			var itemsDiv = setItems(navItems.items);
		}		
	}
	xhr.open('GET', '/api/nav.json', true);
	xhr.send();
}
accessNavItems();