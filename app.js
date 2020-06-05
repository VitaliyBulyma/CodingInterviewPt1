// This is the original solution which only returns all employees



// // assign 
// var urlAllEmployees = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
// var output =document.getElementById("output");


// // Set up our HTTP request  thttps://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/
// var xhr = new XMLHttpRequest();
// var data;
// // Setup our listener to process completed requests
// xhr.onreadystatechange = function () {

// 	// Only run if the request is complete
// 	if (xhr.readyState !== 4) return;

// 	// Process our return data
// 	if (xhr.status >= 200 && xhr.status < 300) {
// 		// What do when the request is successful
// 		data = JSON.parse(xhr.responseText);
		
// 		// Convert object into array https://www.geeksforgeeks.org/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript/
// 		var array= Object.entries(data); 

// 		for (var i = 0; i<array.length; i++){
// 		// https://www.w3schools.com/jsref/met_node_appendchild.asp
// 		// Create a div for each rendered card, and append to parent div for each card
// 		var card = document.createElement("DIV");
// 		card.setAttribute("class","card");
		
// 			var roles = array[i][1].roles;
// 			// console.log(roles.length);
			
// 			// output.innerHTML += array[i][1].employeeid + "</br>";
			
// 			// Display crown image for featured employee
// 			if (array[i][1].employeeisfeatured == 1){
// 				card.innerHTML += '<div><img class="crown"  src="crown.png"></img></div>';
// 			} 
// 			// Display Photo if exist
// 			if(array[i][1].employeehaspic==1){
// 			card.innerHTML +='<div><img class="photo" src="http://sandbox.bittsdevelopment.com/code1/employeepics/'+array[i][1].employeeid+'.jpg"></img></div>';	
// 			}


// 			card.innerHTML +='<span id="name">'+ array[i][1].employeefname +'&nbsp;'+array[i][1].employeelname +  '</span>';
			
			
// 			card.innerHTML += '<p id="bio">'+array[i][1].employeebio+'</p>';

// 			// Display role with the color
// 			for (var z=0; z<roles.length; z++){
// 			card.innerHTML += '<p class="role" style="background-color:'+ array[i][1].roles[z].rolecolor+'">'+array[i][1].roles[z].rolename+'</p>';
// 			}
// 			output.appendChild(card);
// 		}

// 	} else {
// 		document.getElementById('err').innerText = "There was an error retrieving employees list! Please try again other time.";
// 	}

// };

// // Create and send a GET request
// // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// // The second argument is the endpoint URL
// xhr.open('GET', urlAllEmployees);
// xhr.send();

