// Elements
// ------------------------------------------
var form = document.querySelector("body form");


// Events
// ------------------------------------------
form.addEventListener('submit', createThing);

var things = document.querySelector(".things");
var form = document.querySelector("body form");
var input = document.querySelector(".new-thing");
var h4 = document.querySelector("body h4");

// Update page
// ------------------------------------------
function createThing(e) {
	e.preventDefault();
	if (input.value == '') {
		h4.innerHTML="*Please enter something*";
		return
	}
		h4.innerHTML="";	
		var li = document.createElement("li");
		li.innerHTML = document.getElementById('input').value;
		things.appendChild(li);
		document.getElementById('input').value ='';
}


//what is preventDefault?
