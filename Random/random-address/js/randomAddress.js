// Structure
// ------------------------------------------
var button    = document.querySelector('main button');
var addresses = document.querySelector('main .addresses');


// Events
// ------------------------------------------
button.addEventListener('click', generateAddress);


// Setup
// ------------------------------------------
// TODO: create your arrays here (street, city, state, etc)



// Event Listeners
// ------------------------------------------
function generateAddress(e) {
	// TODO: randomly select one item from each of these arrays 
	//       and then use them to construct a random address
}


// Update page functions
// ------------------------------------------
function addAddress(address) {
	var li = document.createElement('li');
	li.innerHTML = address;
	addresses.appendChild(li);
}




