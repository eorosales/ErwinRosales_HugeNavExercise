// Rotate chevron * 180
function rotateArrow(arrow, subDiv) {
	if(subDiv.classList != 'dropdown-content hide') {
		console.log('test');
	}
}

// Add click interaction to 'hamburger'
function setHamburgerInteraction() {
	var hamburger = document.getElementById('logo');
	hamburger.setAttribute('class', 'toggle-nav-button');
	var toggleNavButton = document.querySelector('.toggle-nav-button');
	var mainNav = document.getElementById('main-nav');

	// Toggle subDiv visibility in mobile
	toggleNavButton.addEventListener('click', function() {
		toggleNavButton.setAttribute('href', 'javascript:void(0)');		
		var pageContent = document.querySelector('.wrapper');

		// Push primary navigation right
		if(mainNav.classList != 'primary-nav primary-nav-push-right') {
			mainNav.removeAttribute('class');
			mainNav.setAttribute('class','primary-nav primary-nav-push-right');
		}else{
		// Pull primary navigation left
			mainNav.removeAttribute('class');
			mainNav.setAttribute('class', 'primary-nav primary-nav-pull-left');
		}

		// Push page content to right 
		if(pageContent.classList != 'wrapper wrapper-push-right') {
			pageContent.removeAttribute('class');
			pageContent.setAttribute('class', 'wrapper wrapper-push-right');
		}else{
		// Pull page content to left	
			pageContent.removeAttribute('class');
			pageContent.setAttribute('class', 'wrapper wrapper-pull-left');
		}
	});
}

// Insert arrow for items with mobile dropown content
function appendArrow(itemsDiv, subDiv) {
	var span = document.createElement('span');
	var img = document.createElement('img');
	var arrow = subDiv.parentNode;
	img.setAttribute('src', '/images/arrow.png');
	span.appendChild(img);
	span.setAttribute('class', 'chevron-rotate-down');
	
	arrow.firstChild.appendChild(span);
	rotateArrow(arrow, subDiv);

	return arrow;
}

// Toggle push and pull for subDiv
function toggleDropdownContent (itemsDiv, subDiv) {
	var arrow = appendArrow(itemsDiv, subDiv); // Add arrows to items with secondary items
	itemsDiv.addEventListener('click', function() {		
		if(itemsDiv.firstChild.nextSibling.classList.contains('hide')) {
			subDiv.removeAttribute('class');
			subDiv.setAttribute('class', 'dropdown-content show');
			
			// Rotate chevron into initial position
			var chevron = this.querySelector('.chevron-rotate-down');
			chevron.removeAttribute('class');
			chevron.setAttribute('class', 'chevron-rotate-up');

		}else{
			subDiv.removeAttribute('class');
			subDiv.setAttribute('class', 'dropdown-content hide');

			// Rotate chevron 180 degrees
			var chevron = this.querySelector('.chevron-rotate-up');
			chevron.removeAttribute('class');
			chevron.setAttribute('class', 'chevron-rotate-down');
		}
	});
}

// Construct div container to hold secondary items
function setSubNav(itemsDiv, subItemsLength, subItems) {
	if(typeof(subItems) !== 'undefined') {
		if(subItemsLength > 0) {
			var subDiv = document.createElement('div');	
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
			toggleDropdownContent(itemsDiv, subDiv); // Toggle mobile navigation visibility

			return subDiv;
		}
	}
}

// Construct div elements to hold items
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

// Set labels and urls to vars
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