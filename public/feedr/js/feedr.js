//Javascript file powers single page news feed application
// 20161031 Geoffrey Charles

var newsTemplate = document.querySelector("#news-template-nytimes");
var main = document.querySelector("#main");
var popUp = document.querySelector("#popUp");
var close = document.querySelector("a.closePopUp")
var search = document.querySelector("#search");


//Get data from NYTimes
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "6c6af14c9a624520a449b3fe73b52ae4"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  updateFeed(result);
}).fail(function(err) {
  throw err;
});

function updateFeed(json) {
  // console.log('updateFeed',json);
  // Compile Template
  var templateFn = Handlebars.compile(newsTemplate.innerHTML);

  //Evaluate the JSON to HTML
  var html = templateFn(json.response);
  main.innerHTML = html;
  createListeners();
  
  //Remove the loading popup 
  popUp.className = "loader hidden";
}

//Add click event listeners to each article with the pop up generate function
function createListeners(){
  articles = document.getElementsByTagName('article');
  for (var i = 0; i < articles.length; i++) {
      articles[i].addEventListener('click',generatePopup,false);
  }
}

//Generate popup with information contained in the article (using hidden fields)
function generatePopup(e){
  popUp.className = ""; 
  popUp.querySelector("h1").innerHTML = this.querySelector("#headline").value;
  popUp.querySelector("p").innerHTML = this.querySelector("#snippet").value;
  popUp.querySelector("a.popUpAction").href = this.querySelector("#link").value;
}

//Close popup when x is clicked
close.addEventListener("click",function(){
  popUp.className = "loader hidden";
})

// Search event listener
search.addEventListener("click",searchArticles);
// Allows hitting the event key
search.addEventListener("keyup",function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        search.click();
    }
});

//Runs API calls with the query and refreshes the page
function searchArticles(){
  if(search.className !="active"){
    search.className ="active";
    return;
  }
  if(search.querySelector("input").value == ''){
    return;
  }
  console.log("you just searched: "+ search.querySelector("input").value); 
  //TODO MAKE THE SEARCH RETURN
  search.className ="";
}
