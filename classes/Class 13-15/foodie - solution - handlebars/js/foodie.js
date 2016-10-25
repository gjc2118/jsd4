// Elements
// ------------------------------------
var form = document.querySelector("form");
var zip = document.querySelector("form .zip");
var results = document.querySelector(".results");

// Get Template object
var restaurantTemplate = document.querySelector("#restaurant-template");

// Event
// ------------------------------------
form.addEventListener('submit', getRestaurants);


// Event Handler 
// ------------------------------------
function getRestaurants(event) {
	event.preventDefault();

	var search = zip.value;
	console.log(search);

	var url = "http://opentable.herokuapp.com/api/restaurants?zip=" + search;

	$.getJSON(url, updateRestaurants);
}

// Update page
// ------------------------------------
function updateRestaurants(json) {
	console.log('updateRestaurants',json);

	// Compile Template
	var templateFn = Handlebars.compile(restaurantTemplate.innerHTML);

	//Evaluate the JSON to HTML
	var html = templateFn(json);
	results.innerHTML = html;

	// clears out the old results
	// results.innerHTML = '';

	// add new result for each item in array
	// json.restaurants.forEach(createRestaurant);
}

// Don't need this anymore!
// function createRestaurant(restaurant) {

// 	// Step 1 - create elements
// 	var li = document.createElement("li");
// 	var img = document.createElement("img");
// 	var h2 = document.createElement("h2");
// 	var p = document.createElement("p");

// 	// Step 2 - add content / attributes
// 	img.src = restaurant.image_url;
// 	h2.textContent = restaurant.name;
// 	p.textContent = restaurant.address;

// 	// Step 3 - append to parents
// 	results.appendChild(li);
// 	li.appendChild(img);
// 	li.appendChild(h2);
// 	li.appendChild(p);
// }

	




