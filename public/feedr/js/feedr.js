//Javascript file powers single page news feed application
// 20161031 Geoffrey Charles

// Next steps 1) Another source 2) Infinite scrolling
// NPR Source: http://www.npr.org/api/queryGenerator.php?txtTitle=gello&txtQuery=
// NYTIMES Source: https://developer.nytimes.com/article_search_v2.json#/Console/GET/articlesearch.json
// Instructions http://jsd4.herokuapp.com/homework/07-feedr

var newsTemplate = document.querySelector("#news-template");
var main = document.querySelector("#main");
var popUp = document.querySelector("#popUp");
var close = document.querySelector("a.closePopUp")
var search = document.querySelector("#search");
var searchButton = document.querySelector("#searchButton");
var span = document.querySelector("span");
var NYTimesLink = document.querySelector("#NYTimes");
var NPRLink = document.querySelector("#NPR");
var feedr = document.querySelector("h1");
var results = []; // This is the final list of articles
var page = 0;
var loading = false;
var searchValue = "";

//Default to all feed, ordered by date
generateFeed();

function generateFeed(){
  popUp.className = "loader";
  results = [];
  getNYTimes();
  getNPR();
  setTimeout(updateFeed,2000); //required because getting data takes < 1 second
  span.innerHTML="All";
}

//EventListener
NYTimesLink.addEventListener("click",function(){
  popUp.className = "loader";
  results = [];
  getNYTimes();
  setTimeout(updateFeed,2000);
});
NPRLink.addEventListener("click",function(){
  popUp.className = "loader";
  results = [];
  getNPR();
  setTimeout(updateFeed,2000);
});
feedr.addEventListener("click",generateFeed);

//Get data from NYTimes (different API for basic or search was a pain)
//Note that the top stories API does not allow pagination
function getNYTimes(search){
  span.innerHTML="NYTimes";
  var url = "";
  var type = ""
  if (search){
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "6c6af14c9a624520a449b3fe73b52ae4",
    'q': search,
    'page': page
    });
    type = "NYTimesSearch";
  }
  else{
    url += "https://api.nytimes.com/svc/topstories/v2/home.json"
    url += '?' + $.param({
      'api-key': "6c6af14c9a624520a449b3fe73b52ae4"
    });
    type = "NYTimesBasic";
  }
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    generateArticles(result,type);
  }).fail(function(err) {
    throw err;
  });
}

// to get more data use &startNum=21
//http://api.npr.org/query?startNum=21&dateType=story&numResults=20&apiKey=MDI3ODM1MzE3MDE0Nzc5Nzc4MzNiOWZiNw000

//Get data from NPR
function getNPR(search){
  span.innerHTML="NPR";
  var url2 = "https://api.npr.org/query?apiKey=";
  url2 += "MDI3ODM1MzE3MDE0Nzc5Nzc4MzNiOWZiNw000";
  url2 += "&dateType=story&sort=dateDesc&output=JSON&numResults=19";
  url2 += "&startNum="+page*20;
  if (search){
    url2 += "&searchTerm="+search;
  }
  $.ajax({
    url: url2,
    method: 'GET',
  }).done(function(result) {
    generateArticles(result,"NPR");
  }).fail(function(err) {
    throw err;
  });
}

// Appends the articles in a single format
function generateArticles(json,source){  
  if (source == "NYTimesBasic"){
    console.log("Loading NYTimes...");
    for(var i in json.results){
      var article = json.results[i];
      var newEntry;
      var mydate = new Date(article.created_date);
      var date = mydate.toString("yyyy-MM-dd HH:mm");
      newEntry = {
          title: article.title,
          description: article.abstract,
          link: article.short_url,
          section: article.section,
          source: "NYTimes",
          date: date
      };
      if(article.multimedia.length){
        newEntry.image = article.multimedia[0].url
      }
      else{
        newEntry.image = "images/nyt.png"
      }
      results.push(newEntry);
    }
  }
    if (source == "NYTimesSearch"){
    console.log("Loading NYTimes...");
    for(var i in json.response.docs){
      var article = json.response.docs[i];
      var newEntry;
      var mydate = new Date(article.pub_date); //uses open source
      var date = mydate.toString("yyyy-MM-dd HH:mm");
      newEntry = {
          title: article.headline.main,
          description: article.lead_paragraph,
          link: article.web_url,
          section: article.section_name,
          source: "NYTimes",
          date: date
      };
      if(article.multimedia.length){
        newEntry.image = "https://static01.nyt.com/"+article.multimedia[0].url //TRICKY!!
      }
      else{
        newEntry.image = "images/nyt.png"
      }
      results.push(newEntry);
    }
  }
  if (source == "NPR"){
    console.log("Loading NPR...");
    json = JSON.parse(json);
    for(var i in json.list.story){
      var article = json.list.story[i];
      var newEntry;
      var mydate = new Date(article.storyDate.$text);
      var date = mydate.toString("yyyy-MM-dd HH:mm");
      newEntry = {
          title: article.title.$text,
          description: article.teaser.$text,
          link: article.link[0].$text,
          section: article.slug.$text,
          source: "NPR",
          date: date
      };
      if(article.hasOwnProperty("image") && article.image.length){
        newEntry.image = article.image[0].src
      }
      else{
        newEntry.image = "images/npr.png"
      }
      results.push(newEntry);
    }
  } 
  return results;
}

// Updates the handlebars
function updateFeed() {
  console.log("Updating Feed...");
  if (loading == false){ // Only sort if you are not loading... else display gets weird
    results.sort(function(a,b){
      return b.date.localeCompare(a.date);
    });
  }
  var templateFn = Handlebars.compile(newsTemplate.innerHTML);
  var html = templateFn(results);
  main.innerHTML = html;
  createListeners();
  popUp.className = "loader hidden";
  console.log("Done!");
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
  popUp.querySelector("h1").innerHTML = this.querySelector("#title").value;
  popUp.querySelector("p").innerHTML = this.querySelector("#description").value;
  popUp.querySelector("a.popUpAction").href = this.querySelector("#link").value;
}
//Close popup when x is clicked
close.addEventListener("click",function(){
  popUp.className = "loader hidden";
});
window.addEventListener("keyup",function(event) {
    event.preventDefault();
    if (event.keyCode == 27) {
        close.click();
    }
});

// Search event listener
searchButton.addEventListener("click",searchArticles);

// Allows hitting the event key
search.addEventListener("keyup",function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        searchArticles();
    }
});

//Runs API calls with the query and refreshes the page
function searchArticles(){
  if(search.className !="active"){
    search.className ="active";
    return;
  }
  searchValue = search.querySelector("input").value;
  console.log("Searching for "+ searchValue + "...");
  popUp.className = "loader";
  results = [];
  if(span.innerHTML=="NPR"){
    getNPR(searchValue);
  }
  if(span.innerHTML=="NYTimes"){
    getNYTimes(searchValue);
  }
  if(span.innerHTML=="All"){
    getNPR(searchValue);
    getNYTimes(searchValue);
    span.innerHTML="All"
  }
  setTimeout(updateFeed,1500);
  search.className ="";
  search.querySelector("input").value = '';
}

//NEED: this to work in search
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && loading == false) {
       // alert("near bottom!");
      if(span.innerHTML=="All" || span.innerHTML=="NPR"){
        loading = true;
        console.log("Loading more...");
        popUp.className = "loader";
        page=1;
        getNPR(searchValue);
        span.innerHTML="All";
        setTimeout(updateFeed,2000); //required because getting data takes < 1 second
        setTimeout(function(){
          loading = false;
        },2100);
      } 
   }
});