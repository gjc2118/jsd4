// Setup / Data
// ------------------------------------------
var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter'];
var startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest'];
var startupIdea;
var favorites = [];


// Elements
// ------------------------------------------
var startup  = document.querySelector('.startup');
var generate = document.querySelector('.generate');
var save     = document.querySelector('.save');
var print    = document.querySelector('.print');
var list     = document.querySelector('.list');


// Events
// ------------------------------------------
generate.addEventListener('click', generateStartup);
save.addEventListener('click', saveFavorite);
print.addEventListener('click', printFavorites);


// Init
// ------------------------------------------
generateStartup();


// Event Listeners
// ------------------------------------------


// the generateStartup function is called when
// the "Generate New Startup" button is clicked
function generateStartup() {

	var itemX = startupX[Math.floor(Math.random()*startupX.length)];
	var itemY = startupY[Math.floor(Math.random()*startupY.length)];
	startupIdea = "A startup that is "+itemX+", but for "+itemY;
	startup.innerHTML = startupIdea;

}



// the saveFavorite function is called when
// the "Save Favorite" button is clicked
function saveFavorite() {
	favorites.push(startupIdea);
}



// the Print Favorites function is called when
// the "Print Favorites" button is clicked
function printFavorites() {
	// DONE: clear out favorites section each time
	// before displaying new list of favorites
	list.innerHTML = '';
	favoritesText = '';
	for (index = 0; index < favorites.length; ++index) {
    console.log(favorites[index]);
    favoritesText += favorites[index] +"<br>";
	}

	// DONE: update the list element with the
	// new list of favorites
	list.innerHTML = favoritesText;
}
