// Acquire labels and urls
function getItemsInfo(items) {
	var label = items.label;
	var url = items.url;
	var itemsLength = items.length;
	var mainNav = document.getElementById('main-nav');

	for(var i = 0; i < itemsLength; i++) {
		
	}
}

// Fire AJAX request
function accessNavItems () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var response = xhr.responseText;
			var navItems = JSON.parse(response);
			getItemsInfo(navItems.items)
		}		
	}
	xhr.open('GET', '/api/nav.json', true);
	xhr.send();
}

accessNavItems();