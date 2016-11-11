var ul = document.querySelector("ul");

var body = document.querySelector("body");

// body.classList.add("skyblue");

// body.className = "skyblue";


var icon1 = document.querySelector("li.red");
var icon2 = document.querySelector("li.olive");
var icon3 = document.querySelector("li.rebeccapurple");
var icon4 = document.querySelector("li.skyblue");

ul.addEventListener("click",changeColor);

function changeColor(){
	if (event.target.tagName != "LI"){
		return;
	}
	body.className = event.target.className;
	// console.log(event);
}