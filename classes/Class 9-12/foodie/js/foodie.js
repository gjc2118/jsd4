// Elements
// ------------------------------------
var form = document.querySelector("form");
var zip = document.querySelector("form .zip");
var results = document.querySelector(".results");


// Event
// ------------------------------------
form.addEventListener('submit', getRestaurants);


// Event Handler 
// ------------------------------------

function getRestaurants(){
	event.preventDefault();
	console.log(zip.value);
	var url = "http://opentable.herokuapp.com/api/restaurants?zip=" + zip.value;
	jQuery.getJSON(url, print);
	
}



// Update page
// ------------------------------------

// var url = "https://api.consumerfinance.gov/data/hmda.json";
function getGif(tag){
	var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + tag;
	jQuery.getJSON(url, print);
}

function print(json){
	console.log(json);
	json.restaurants.forEach(function(restaurant){
		console.log(restaurant.image_url);
		var li = document.createElement("li");
		var img = document.createElement("img");
		img.src = restaurant.image_url;
		
		document.body.appendChild(li);
		li.appendChild(img);
	});
}