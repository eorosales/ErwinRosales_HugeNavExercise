// 1. Execute AJAX XMLHttpRequest()
// 2. Check length of top-level ITEMS that are in the .JSON file
// 3. Create element <a> for each top-level ITEMS
// 4. For each top-level ITEMS, append LABEL inside <a> and URL into HREF attribute of <a> 
// 5. Append each <a> into the target output of document

// 5. Check for each ITEMS if ITEMS.ITEMS !== 'undentified'
// 6. For each sub-level ITEMS.ITEMS, instantiate <a> for each ITEMS.ITEMS
// 7. For each ITEMS.ITEMS !== 'unidentified'; push ITEMS.ITEMS LABEL inside <a> and URL into HREF attribute of <a> 
// 8. For each ITEMS.ITEMS, create a container to hold list.
// 9. Append each container with list of <a> into document



// Create Primary Top Nav
function createNavLabels(navJson) {
	var location = document.getElementById('main-nav');	

	for(var i = 0; i < navJson.length; i++) { // Check length of top-level ITEMS that are in the .JSON file
		var a = document.createElement('a');
		var linkText = document.createTextNode(navJson[i].label);

		// Create element <a> for each top-level ITEMS
		a.appendChild(linkText);
		a.href = navJson[i].url;

		//Append each <a> into the target output of document
		location.appendChild(a);
	}
}

// Execute Ajax XMLHttpRequest
function xhrRequest() {
	var xhr = new XMLHttpRequest(); 

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var response = xhr.responseText;
			var nav = JSON.parse(response);
			createNavLabels(nav.items);
		}
	}	

	xhr.open("GET", '/api/nav.json', true);
	xhr.send();
}

xhrRequest();



