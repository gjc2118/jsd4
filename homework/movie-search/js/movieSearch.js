// Setup
// ----------------------------------------------

var button = document.querySelector("button");
var title = document.querySelector("input");
button.addEventListener("click",submit);

var details = document.querySelector("div.details");
var results = document.querySelector("ul.results");

function submit(){
	event.preventDefault();
	var query = "https://www.omdbapi.com/?s=" + title.value;
	$.getJSON(query, movieShow);
}


function movieShow(json){
	results.innerHTML = "";
	getDetails(json.Search.shift().imdbID);
        
    json.Search.forEach(function(movie){
			// Step 1 - create elements
			var li = document.createElement("li");
			var img = document.createElement("img");
			var p = document.createElement("p");

		// Step 2 - add content / attributes
		li.id = movie.imdbID;
		img.src = movie.Poster;
		img.id = movie.imdbID;
		p.textContent = movie.Title;
		p.id = movie.imdbID;	
		// Step 3 - append to parents
		results.appendChild(li);
		li.appendChild(img);
		li.appendChild(p);
	})
}

function getDetails(id){
	var query = "http://www.omdbapi.com/?i=" + id + "&plot=short";
	$.getJSON(query, detailsShow);
}

function detailsShow(movie){
	details.innerHTML = "";
	console.log(movie);
	var div1 = document.createElement("div");
	var img = document.createElement("img");
	var div2 = document.createElement("div");
	var h2 = document.createElement("h2");
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	var a = document.createElement("a");
	var linkText = document.createTextNode("View on IMDb");

	div1.class = "image";
	img.class = "poster";
	img.src = movie.Poster;
	div1.appendChild(img);

	div2.class = "text";
	h2.class = "title";
	h2.textContent = movie.Title;
	p1.class = "plot";
	p1.textContent = movie.Plot;
	a.class = "imdb-link";
	a.href = "http://www.imdb.com/title/"+movie.imdbID;


 	details.appendChild(div1);
 	div1.appendChild(img);
 	details.appendChild(div2);
	div2.appendChild(h2);
	div2.appendChild(p1);
	div2.appendChild(p2);
	p2.appendChild(a);
	a.appendChild(linkText);

}

results.addEventListener("click", function(e) {
	getDetails(e.target.id)

});
