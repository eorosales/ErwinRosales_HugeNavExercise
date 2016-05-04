// Create div container element for sub nav 
function createSubNav(subItems) {
	var subDiv = document.createElement('div');
	subDiv.setAttribute('class', 'dropdown-content');

	for(var i = 0; i < subItems.length; i++) {
		var subLabel = subItems[i].label;
		var subUrl = subItems[i].url;

		var subLink = document.createElement('a')
		var subText = document.createTextNode(subLabel);

		subLink.appendChild(subText);
		subLink.setAttribute('href', subUrl);
		subDiv.appendChild(subLink);
	}
	console.log(subDiv);	
}

// Set links for top-nav-items
var setLink = function(label, url) {
	var a = document.createElement('a');
	var linkText = document.createTextNode(label);
	a.appendChild(linkText);
	a.setAttribute('href', url);

	return a;
};

// Create elements for top-nav-items
function setTopMenu(label, url) {
	var topNavLoc = document.getElementById('main-nav');	
	var topNavDiv = document.createElement('div');	
	var a = setLink(label, url);

	topNavLoc.appendChild(topNavDiv);
	topNavDiv.setAttribute("class", "top-nav-item");
	topNavDiv.appendChild(a);
};

// Access labels and urls
function navJson(json) {
	var itemsLength = json.length;

	for(var i = 0; i < itemsLength; i++) {
		var itemsLabels = json[i].label;
		var itemsUrls = json[i].url;
		var subItems = json[i].items;

		setTopMenu(itemsLabels, itemsUrls);

		if(typeof(subItems) !== 'undefined') {
			if(subItems.length > 0) {
				createSubNav(subItems);
			}
		}

	}
};

// Execute Ajax XMLHttpRequest
function xhrRequest() {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var response = xhr.responseText;
			var nav = JSON.parse(response);
			navJson(nav.items);
		}
	}	

	xhr.open("GET", '/api/nav.json', true);
	xhr.send();

};

xhrRequest();