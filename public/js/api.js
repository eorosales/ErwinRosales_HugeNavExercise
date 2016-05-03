// Execute Ajax XMLHttpRequest
function xhrRequest() {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var response = xhr.responseText;
			var nav = JSON.parse(response);
			createNavItems(nav.items);
		}
	}	

	xhr.open("GET", '/api/nav.json', true);
	xhr.send();

}

xhrRequest();
// Create Primary Top Nav
function createNavItems(navJson) {
	var location = document.getElementById('main-nav');	

	for(var i = 0; i < navJson.length; i++) { // Check length of top-level ITEMS that are in the .JSON file
		var a = document.createElement('a');
		var url = document.createTextNode(navJson[i].url);
		var linkText = document.createTextNode(navJson[i].label);
		var subItems = navJson[i].items;

		// Create element <a> for each top-level ITEMS
		a.appendChild(linkText);
		a.href = url;