// search for address
// search again in
// click in market for details
// color code by category
// finding a home 
// Can think through more categories like driving home


if (location.protocol != 'https:' && location.protocol != "file:" && location.hostname != "localhost"){
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

var button = document.querySelector("button");
var answer = document.querySelector("#results");
var person = document.querySelector("#person");
var belongings = document.querySelector("#belongings");
var car = document.querySelector("#car");
var property = document.querySelector("#property");
var loader = document.querySelector("#loader");
var loader1 = document.querySelector("#loader1");
var input = document.querySelector("#autocomplete");


button.addEventListener('click',flow)

$(document).ready(openNav());

// Define values
var latitude;
var longitude; 
var results = {};
var dates = [];
var maxDate = 0;
var categories = [];
var autocomplete;
var map;
var mapSearch = false; // if the person is doing a map search

var category_person = ["MISSING PERSON", "ASSAULT", "FAMILY OFFENSES", "SEX OFFENSES, NON FORCIBLE", "KIDNAPPING", "SEX OFFENSES, FORCIBLE"]
var category_belongings =["LARCENY/THEFT"]
var category_property =["BAD CHECKS", "EXTORTION", "STOLEN PROPERTY", "VANDALISM", "ROBBERY", "TRESPASS", "BURGLARY", "FORGERY/COUNTERFEITING"]
var category_car = ["VEHICLE THEFT"]
var category_other = ["FRAUD", "WARRANTS", "RECOVERED VEHICLE", "NON-CRIMINAL", "SUSPICIOUS OCC", "LOITERING", "GAMBLING", "LIQUOR LAWS", "PROSTITUTION", "PORNOGRAPHY/OBSCENE MAT", "EMBEZZLEMENT", "DISORDERLY CONDUCT", "SUICIDE", "DRUG/NARCOTIC", "DRIVING UNDER THE INFLUENCE", "DRUNKENNESS","ARSON",  "WEAPON LAWS", "BRIBERY", "SECONDARY CODES", "RUNAWAY", "OTHER OFFENSES"]

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function flow(){
  closeNav();
  event.preventDefault();
  var p = new Promise(getDateQuery);
  p.then(navigator.geolocation.getCurrentPosition(updateLocation));  
}

//Charts
function renderChart(){
  // console.log("Rendering Chart....");
  $(function () { 
    var data_all = [];
    var data_local = [];
    for (var key in results) {
      if (results.hasOwnProperty(key)) {
        data_local.push(results[key].local);
        data_all.push(Math.round(parseInt(results[key].all)*3.14/47)); // 47 miles in SF!
      }
    }
    var myChart = Highcharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        title: {
          text: 'Crime Count (1 mile radius)'
        }
      },
      series: [{
        name: 'Within 1 mile from your location',
        data: data_local
      }, {
        name: 'San Francisco average',
        data: data_all
      }]
    });
  });
  loader.className = "";
  loader1.className = "";
}

function getCategory(response){
  response.forEach(function(object){
    if(!categories.includes(object.category)){
      categories.push(object.category); 
    } 
  });
}

function getDateQuery(){
  loader.className = "loader";
  loader1.className = "loader1";
  var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select date where date > '2016-01-01T00:00:00.000' order by date asc limit 2000000"
  $.get(query, getDate);
}


function getDate(response){
  response.forEach(function(object){
    var date = object.date.substring(0,7)
    if(!dates.includes(date)){
      dates.push(date);
      results[date] = {
        all: 0,
        local: 0
      }; //generates the date structure
    }
  });
  maxDate = dates[dates.length-1] 
  // console.log("Dates complete, max date: "+maxDate);
}

// reset the results
function reset(){
  $.each(results, function(i, val){
    results[i] = {
        all: 0,
        local: 0
      };
  })
}

function returnData(x,y){
  var apiPromises = [];
  reset();
  if (person.checked){
    apiPromises = category_person.map(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      return $.get(query);
    });
  }
  else if (belongings.checked){
    apiPromises = category_belongings.map(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      return $.get(query);
    })
  }
  else if (car.checked){
    apiPromises = category_car.map(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      return $.get(query);
    })
  }
  else if (property.checked){
    apiPromises = category_property.map(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      return $.get(query);
    })
  }
  Promise.all(category_person.map(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      return $.get(query);
    })).then(function(results) {
      appendData(flatten(results));
      renderChart();
    });
}

function appendData(response){
  response.forEach(function(object){
    var date = object.date.substring(0,7);
    var distance = getDistance(latitude,longitude,object.y,object.x);
    results[date].all = results[date].all +1;

    if (distance < 1.61){ //1 km = 1.60934 miles
      results[date].local = results[date].local +1;
      if (date==maxDate){
        // console.log("POINT lat: "+parseFloat(object.y)+ "long: "+parseFloat(object.x)+", you are: "+latitude+", "+longitude);
        new google.maps.Marker({
          map: map,
          position: {lat: parseFloat(object.y), lng: parseFloat(object.x)},
          title: object.category
        });
      }
    } 
  });
}

function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function initMap() {
    // console.log('init map');
}

function updateLocation(position) {
  if (input.innerHTML && !mapSearch){
    var place = autocomplete.getPlace();
    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();
    console.log('search: '+latitude+";"+longitude);
  }
  else if (!mapSearch){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log('location: '+latitude+";"+longitude);
  }
  else {
    mapSearch = false;
    console.log('map: '+latitude+";"+longitude);
  }
  returnData(latitude,longitude);
  createGoogleMap(latitude,longitude);
}

function createGoogleMap(lat,long) {
    var el = document.querySelector("#google-map");    
    var options = {
      center: {lat: lat, lng: long},
      zoom: 15
    };
    
    map = new google.maps.Map(el, options);

    var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'gold',
        strokeWeight: 1
    };

    var marker = new google.maps.Marker({
        map: map,
        position: {lat: lat, lng: long},
        title: "Your location",
        icon: goldStar
    });

    map.addListener('click', function(event) {
      console.log("Map Click!");
      mapSearch = true;
      // console.log(event.latLng.lat());
      latitude = event.latLng.lat();
      longitude = event.latLng.lng();
      updateLocation();
    });
}



function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')));
  }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }
