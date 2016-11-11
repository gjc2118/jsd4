// Elements
// ------------------------------------------

// var li = document.querySelector("li");
var ul = document.querySelector("ul");
singSong();

function getNextLine(number){
	var i = number;
	var nexti = i-1;
	if (i == 1){
		var line = "<br>" + i + " bottle of beer on the wall, " + i + " bottle of beer. <br>" + 
		"Take one down and pass it around, " + nexti + " bottles of beer on the wall.";
	}
	else if (i == 0){
		var line = "<br> No more bottles of beer on the wall, no more bottles of beer. <br>" +
		"Go to the store and buy some more, 99 bottles of beer on the wall.";
	}
	else {
		var line = "<br>" + i + " bottles of beer on the wall, " + i + " bottles of beer. <br>" + 
		"Take one down and pass it around, " + nexti + " bottles of beer on the wall.";
	}
	
	var li = document.createElement("li");
	li.innerHTML = line;
	ul.appendChild(li);
	return line;
}


function singSong(){
	for (i = 99; i >= 0; i--){
		getNextLine(i);
	}
}