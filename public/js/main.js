// Construct div elements to hold sub items
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
			// Toggle subDiv visibility
			itemsDiv.addEventListener('click', function() {		
				if(itemsDiv.firstChild.nextSibling.classList.contains('hide')) {
					subDiv.removeAttribute('class');
					subDiv.setAttribute('class', 'dropdown-content show');
				}else{
					subDiv.removeAttribute('class');
					subDiv.setAttribute('class', 'dropdown-content hide');
				}
			});
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
		// if(typeof(subItems) !== 'undefined') {
		// 	if(subItemsLength > 0) {
				
		// 	}
		// }	
	}
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