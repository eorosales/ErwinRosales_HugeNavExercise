// Create Primary Top Nav
function createTopNav(items) {
	var location = document.getElementById('main-nav');	

	for(var i = 0; i < items.length; i++) { // Check length of top-level ITEMS that are in the .JSON file
		var a = document.createElement('a');
		var url = document.createTextNode(items[i].url);
		var linkText = document.createTextNode(items[i].label);
		var subItems = items[i].items;

		// Create element <a> for each top-level ITEMS
		a.appendChild(linkText);
		a.href = url;
		location.appendChild(a);

		if(typeof(subItems) !== 'undefined') {
			console.log(subItems.length);
		}
	}
}