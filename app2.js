// Renders navigation and roles with checkboxes
function renderRoles() {
    // Assign and output for nav and roles
    var rolesDiv = document.getElementById('roles');
    // Make sure container is empty every time it is rendered 
    rolesDiv.innerText = " ";
    // Render the Nav buttons
    rolesDiv.innerHTML += '<button class="btn" onclick="showChoicesDiv()" >Show Employees by Role</button>';
    rolesDiv.innerHTML += '<button class="btn" onclick="showAll()" >Show all Employees</button>  ';
    rolesDiv.innerHTML += '<button class="btn" onclick="reset()" >Reset Selection </button></br>  ';
    // Assign base endpoint URL
    var url = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";
    // Create new container to hold or roles and checkboxes
    rolesDiv.innerHTML += '<div id="choices" style="display: none"></div>';
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What do when the request is successful
            // console.log(JSON.parse(xhr.responseText));
            data = JSON.parse(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText));
            // Transform object to array
            var array = Object.entries(data);
            // Assign container for choices to a variable
            var choices = document.getElementById('choices');
            // Render checkboxes using data from each element from the array
            array.forEach(element => {
                // console.log(element[1].rolename + element[1].rolecolor);
                // console.log(element);
                choices.innerHTML +=
                    '<input onchange="showByRole()" class="rolechoice" id="' + element[1].roleid + '" value="' + element[1].roleid + '" type="checkbox">' +
                    '<label  style="background-color:' + element[1].rolecolor + '" for="' + element[1].roleid + '">' + element[1].rolename + ' </label></br>';
            });
        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', url);
    xhr.send();

}
renderRoles();
// Function to toggle showing roles choices
function showChoicesDiv() {
    // Get container to toggle
    var show = document.getElementById('choices');
    // Check current state / and change to opposite
    if (show.style.display === "none") {
        show.style.display = "block";
    } else {
        show.style.display = "none";
    }
}
// Render card based on the checkbox selections

function showByRole() {
    // Assign and output for cards
    var output = document.getElementById("output");
    // Clear content and error messages
    output.innerHTML = " ";
    document.getElementById('err').innerHTML = " ";

    // https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
    // Create empty array
    var checkedValue = [];
    // Get all checkboxes
    var inputElements = document.getElementsByClassName('rolechoice');
    // Check each checkbox if selected

    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            // If selected add to the array
            checkedValue.push(inputElements[i].value);
        }
    }
    // Whe there are values in the array( checkboxes checked)
    if (checkedValue.length > 0) {
        // Clear output 
        output.innerHTML = " ";
        // Change array values to string
        var param = checkedValue.toString();
        // console.log(param);
        // Build endpoint for the request
        var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php?roles=" + param;

        // Set up our HTTP request
        var xhr = new XMLHttpRequest();

        // Setup our listener to process completed requests
        xhr.onreadystatechange = function () {

            // Only run if the request is complete
            if (xhr.readyState !== 4) return;

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // What do when the request is successful
                // console.log(JSON.parse(xhr.responseText));
                data = JSON.parse(xhr.responseText);
                // Convert object into array https://www.geeksforgeeks.org/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript/
                var array = Object.entries(data);

                for (var i = 0; i < array.length; i++) {
                    // https://www.w3schools.com/jsref/met_node_appendchild.asp
                    // Create a div for each rendered card, and append to parent div for each card
                    var card = document.createElement("DIV");
                    card.setAttribute("class", "card");
                    var roles = array[i][1].roles;
                    // console.log(roles.length);
                    // Value of the employeeid is not necessary, but good to have if need in the future
                    // output.innerHTML += array[i][1].employeeid + "</br>";
                    // Display crown image for featured employee
                    if (array[i][1].employeeisfeatured == 1) {
                        card.innerHTML += '<div><img class="crown"  src="crown.png"></img></div>';
                    }
                    // Display Photo if exist
                    if (array[i][1].employeehaspic == 1) {
                        card.innerHTML += '<div><img class="photo" src="http://sandbox.bittsdevelopment.com/code1/employeepics/' + array[i][1].employeeid + '.jpg"></img></div>';
                    }else{
                        card.innerHTML += '<div><img class="photo" src="generic-facebook-profile_352867.png"></img></div>';
                    }
                    // Render first and last name
                    card.innerHTML += '<span id="name">' + array[i][1].employeefname + '&nbsp;' + array[i][1].employeelname + '</span>';
                    // Render bio if exist
                    // if(array[i][1].employeebio==3){ - this how I tested non existing bio
                    if(array[i][1].employeebio){
                        card.innerHTML += '<p id="bio">' + array[i][1].employeebio + '</p>';  
                      }else{
                          card.innerHTML += '<p class="warning" id="bio">Employee has not provided the biography</p>';
                      }
                    // Display role with the color
                    for (var z = 0; z < roles.length; z++) {
                        card.innerHTML += '<p class="role" style="background-color:' + array[i][1].roles[z].rolecolor + '">' + array[i][1].roles[z].rolename + '</p>';
                    }
                    // Adds individual card to output container
                    output.appendChild(card);
                } // Loop repeats to render all cards one by one

            } else {
                // If there is anything wrong error message will display
                document.getElementById('err').innerText = "There was an error retrieving employees list! Please try again other time.";
            }

        };

        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        xhr.open('GET', url);
        xhr.send();
    } else {
        document.getElementById('err').innerText = "Please Select at least one role ";
    }

}
// showByRole();

// Show All Employees in the system
// When testing endpoints I noticed if I provide
// no role number to (http://sandbox.bittsdevelopment.com/code1/fetchemployees.php?roles=)
// it returns all users.
// Potentially function below can be eliminated if the function above is modified to show all users by passing no parameter
// However, I would personally keep it separately for easier debugging if problem occurs
function showAll() {

    // Assign and output for cards
    var output = document.getElementById("output");
    // Clear content and error messages
    output.innerHTML = " ";
    document.getElementById('err').innerText = " ";
    var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";

    // Function below, renders new list of checkboxes, to eliminate selection made earlier
    renderRoles();
    // Set up our HTTP request  thttps://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/
    var xhr = new XMLHttpRequest();
    var data;
    // Setup our listener to process completed requests
    xhr.onreadystatechange = function () {

        // Only run if the request is complete
        if (xhr.readyState !== 4) return;

        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What do when the request is successful
            data = JSON.parse(xhr.responseText);

            // Convert object into array https://www.geeksforgeeks.org/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript/
            var array = Object.entries(data);

            for (var i = 0; i < array.length; i++) {
                // https://www.w3schools.com/jsref/met_node_appendchild.asp
                // Create a div for each rendered card, and append to parent div for each card
                var card = document.createElement("DIV");
                card.setAttribute("class", "card");

                // Select roles from the object
                var roles = array[i][1].roles;
                // console.log(roles.length);
                // output.innerHTML += array[i][1].employeeid + "</br>";

                // Display crown image for featured employee
                if (array[i][1].employeeisfeatured == 1) {
                    card.innerHTML += '<div><img class="crown"  src="crown.png"></img></div>';
                }
                // Display Photo if exist
                if (array[i][1].employeehaspic == 1) {
                    card.innerHTML += '<div><img class="photo" src="http://sandbox.bittsdevelopment.com/code1/employeepics/' + array[i][1].employeeid + '.jpg"></img></div>';
                }else{
                    card.innerHTML += '<div><img class="photo" src="generic-facebook-profile_352867.png"></img></div>';
                }
                // Display Name
                card.innerHTML += '<span id="name">' + array[i][1].employeefname + '&nbsp;' + array[i][1].employeelname + '</span>';
                // Display employee bio if exist
                if(array[i][1].employeebio){
                  card.innerHTML += '<p id="bio">' + array[i][1].employeebio + '</p>';  
                }else{
                    card.innerHTML += '<p class="warning" id="bio">Employee has not provided the biography</p>';
                }
                
                // Display role with the color
                for (var z = 0; z < roles.length; z++) {
                    card.innerHTML += '<p class="role" style="background-color:' + array[i][1].roles[z].rolecolor + '">' + array[i][1].roles[z].rolename + '</p>';
                }
                // Add individual card to the output container
                output.appendChild(card);
            }

        } else {
            // Display error message if anything wrong
            document.getElementById('err').innerText = "There was an error retrieving employees list! Please try again other time.";
        }

    };

    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', url);
    xhr.send();

}

// Reset all selections, clear all errors or messages
function reset() {
    // Clears all output containers 
    document.getElementById("output").innerHTML = " ";
    document.getElementById('err').innerHTML = " ";
    // Renders new nav and options, clearing all selected options
    renderRoles();
}