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