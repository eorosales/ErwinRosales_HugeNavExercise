// // 1. Execute AJAX XMLHttpRequest()
// // 2. Check length of top-level ITEMS that are in the .JSON file
// // 3. Create element <a> for each top-level ITEMS
// // 4. For each top-level ITEMS, append LABEL inside <a> and URL into HREF attribute of <a> 
// // 5. Append each <a> into the target output of document

// // 6. Check for each ITEMS if ITEMS.ITEMS > 0
// // 7. For each sub-level ITEMS.ITEMS, instantiate <a> for each ITEMS.ITEMS
// // 8. For each ITEMS.ITEMS !== 'unidentified'; push ITEMS.ITEMS LABEL inside <a> and URL into HREF attribute of <a> 
// // 9. For each ITEMS.ITEMS, create a container to hold list.
// // 10. Append each container with list of <a> into document



// // Create Primary Top Nav
// function createNavItems(navJson) {
// 	var location = document.getElementById('main-nav');	

// 	for(var i = 0; i < navJson.length; i++) { // Check length of top-level ITEMS that are in the .JSON file
// 		var a = document.createElement('a');
// 		var url = document.createTextNode(navJson[i].url);
// 		var linkText = document.createTextNode(navJson[i].label);
// 		var subItems = navJson[i].items;

// 		// Create element <a> for each top-level ITEMS
// 		a.appendChild(linkText);
// 		a.href = url;

// 		//Append each <a> into the target output of document
// 		location.appendChild(a);

// 		if(subItems.length > 0) {
// 			for(var i = 0; i < subItems.length; i++) {
// 				console.log(subItems[i].label);
// 			}
// 		}
// 	}
// }

// // Execute Ajax XMLHttpRequest
// function xhrRequest() {
// 	var xhr = new XMLHttpRequest(); 

// 	xhr.onreadystatechange = function() {
// 		if(xhr.readyState == 4 && xhr.status == 200) {
// 			var response = xhr.responseText;
// 			var nav = JSON.parse(response);
// 			createNavItems(nav.items);
// 			createSubNavItems(nav.items.items);
// 		}
// 	}	

// 	xhr.open("GET", '/api/nav.json', true);
// 	xhr.send();
// }

// xhrRequest();



