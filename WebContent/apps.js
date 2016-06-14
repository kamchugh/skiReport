addEventListener('load', function() {
	console.log('LOADED');

	buildTableWithRequest();
	addResort();

});

// build the whole table
var buildTableWithRequest = (function() {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'rest/resorts/allResorts', true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			var table = document.createElement('table');
			table.id = "allResortsTable";
			data.forEach(function(value, index, array) {

				// sort by snow depth
				array.sort(function(a, b) {
					return a.snowDepth - b.snowDepth;
				});
				// table is below
				var tr = document.createElement('tr');

				var td = document.createElement('td');
				var td2 = document.createElement('td');
				var td3 = document.createElement('td');
				var button = document.createElement('button');
				var editButton = document.createElement('button');
				var deleteButton = document.createElement('button');

				button.className = "viewButton";
				// event listener to click in to an individual item
				button.addEventListener('click', function(e) {
					var resortDiv = e.target.parentElement.parentElement;
					while (resortDiv.firstChild) {
						resortDiv.removeChild(resortDiv.firstChild);
					}
					var div = document.createElement('div');
					var p = document.createElement('p');
					p.textContent = value.resortName + " " + value.snowDepth
							+ " " + value.numChairLifts;
					var allResortsButton = document.createElement('button');
					allResortsButton.textContent = "See all resorts";
					allResortsButton.addEventListener('click', function(e) {
						var resortDiv = e.target.parentElement;
						while (resortDiv.firstChild) {
							resortDiv.removeChild(resortDiv.firstChild);
						}
						buildTableWithRequest();
					});
					div.appendChild(p);
					div.appendChild(allResortsButton);

					document.body.appendChild(div);

				})
				// event listener to edit
				editButton.addEventListener('click', function(e) {

					editResort(e);
				});

				deleteButton.addEventListener('click', function(e) {
					//console.log("Delete button is being clicked");
					var confirmation = confirm('Are you sure you want to delete this resort?');
					if (confirmation) {
					deleteResort(e);
					} 
				});

				td.textContent = value.resortName;
				td2.textContent = value.snowDepth;
				td3.textContent = value.numChairLifts;
				button.textContent = "View";
				editButton.textContent = "Edit";
				deleteButton.textContent = "Delete";

				tr.appendChild(td);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(button);
				tr.appendChild(editButton);
				tr.appendChild(deleteButton);
				table.appendChild(tr);

			});
			document.body.appendChild(table);
			// table has been created

		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
})

// delete a resort

var deleteResort = function(e) {
	console.log("I am in the delete function")
	var obj = e.target.parentElement.firstChild.textContent;
	console.log(e.target.parentElement.firstChild.textContent);
//	var jsonString = JSON.stringify(obj);

	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'rest/resorts/allResorts', true);

//	xhr.setRequestHeader('Content-type', 'application/json');

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			console.log(xhr.status);
			console.log(xhr.responseText);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(obj);
	var table = document.querySelector("table");
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
	buildTableWithRequest();
}

// edit a resort

var editResort = function(e) {
	console.log("In the editResort function");
	var form = document.createElement('form');
	var nameInput = document.createElement('input');
	var snowInput = document.createElement('input');
	var chairInput = document.createElement('input');
	var submit = document.createElement('button');
	submit.textContent = "edit this resort";
	nameInput.name = "nameInput";
	snowInput.name = "snowInput";
	chairInput.name = "chairInput";
	nameInput.value = e.target.parentElement.firstChild.textContent;
	var nameofResort = e.target.parentElement.firstChild.textContent;
	console.log("This is what I'm editing" + nameofResort);
	snowInput.value = e.target.parentElement.firstChild.nextSibling.textContent;
	chairInput.value = e.target.parentElement.firstChild.nextSibling.nextSibling.textContent;
	form.appendChild(nameInput);
	form.appendChild(snowInput);
	form.appendChild(chairInput);
	form.appendChild(submit);
	document.body.appendChild(form);
	submit.addEventListener('click', function(e) {
		e.preventDefault();
		console.log("I'm in the submit event listener");
		var form = e.target.parentElement;
		console.log(form.nameInput.value);
		console.log(form.snowInput.value);
		console.log(form.chairInput.value);
		var obj = {
			"resortName" : form.nameInput.value,
			"snowDepth" : form.snowInput.value,
			"numChairLifts" : form.chairInput.value
		};
		var jsonString = JSON.stringify(obj);
		

		var xhr = new XMLHttpRequest();
		xhr.open('PUT', 'rest/resorts/'
				+ nameofResort, true);

		xhr.setRequestHeader('Content-type', 'application/json');

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status < 400) {
				console.log(xhr.status);
				console.log(xhr.responseText);
			}
			if (xhr.readyState === 4 && xhr.status >= 400) {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		};

		xhr.send(jsonString);
//		var table = document.querySelector("table");
//		while (table.firstChild) {
//			table.removeChild(table.firstChild);
//		}
//		buildTableWithRequest();

	})

}

// create a new resort
var addResort = function() {
	var form = document.createElement('form');
	var nameInput = document.createElement('input');
	var snowInput = document.createElement('input');
	var chairInput = document.createElement('input');
	var submit = document.createElement('button');
	submit.textContent = "add resort";
	nameInput.placeholder = "name of resort";
	nameInput.name = "nameInput";
	snowInput.name = "snowInput";
	chairInput.name = "chairInput";
	snowInput.placeholder = "amount of snow";
	chairInput.placeholder = "amount of chairs";
	form.appendChild(nameInput);
	form.appendChild(snowInput);
	form.appendChild(chairInput);
	form.appendChild(submit);
	document.body.appendChild(form);
	submit.addEventListener('click', function(e) {
		e.preventDefault();
		console.log("I'm in the submit event listener");
		var form = e.target.parentElement;
		console.log(form.nameInput.value);
		console.log(form.snowInput.value);
		console.log(form.chairInput.value);
		var obj = {
			"resortName" : form.nameInput.value,
			"snowDepth" : form.snowInput.value,
			"numChairLifts" : form.chairInput.value
		};
		var jsonString = JSON.stringify(obj);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'rest/resorts/allResorts', true);

		xhr.setRequestHeader('Content-type', 'application/json');

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status < 400) {
				console.log(xhr.status);
				console.log(xhr.responseText);
			}
			if (xhr.readyState === 4 && xhr.status >= 400) {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		};

		xhr.send(jsonString);
		var table = document.querySelector("table");
		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}
		buildTableWithRequest();

	})

}
