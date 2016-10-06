// Structure
// ------------------------------------------
var input  = document.querySelector('.age-check input');
var button = document.querySelector('.age-check button');
var p      = document.querySelector('.age-check p');


// Events
// ------------------------------------------
button.addEventListener('click', checkAge);


// Event Listeners
// ------------------------------------------
function checkAge(e) {
	var age = parseInt(input.value);
	var privilege = getPrivilege(age);
	displayPrivilege(privilege);
}


// Update page functions
// ------------------------------------------
function displayPrivilege(privilege) {
	p.innerHTML = privilege
}


function getPrivilege(age){
	var response = "";
	if (age >= 62){
		response = "you collect social security benefits";
	}
	else if (age >= 35){
		response = "you can run for president";
	}
	else if (age >= 25){
		response = "you can rent a car";
	}
	else if (age >= 21){
		response = "you can drink alcohol";
	}
	else if (age >= 18){
		response = "you can vote";
	}
	else if (age >= 16){
		reponse = "you can drive";
	}
	else {
		response = "you cannot do much outside of going to school";
	}
	return response;
}