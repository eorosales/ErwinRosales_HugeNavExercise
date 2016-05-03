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