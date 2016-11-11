//Allow location

//can create heatmaps for the last month:   

// Set up Database
var ref = new Firebase('https://crimetap.firebaseio.com');

// var database = firebase.database();

var button = document.querySelector("button");
var answer = document.querySelector("#results");
var person = document.querySelector("#person");
var belongings = document.querySelector("#belongings");
var car = document.querySelector("#car");
var property = document.querySelector("#property");
var map;

button.addEventListener('click',flow)

// button.addEventListener("click", saveChanges);
document.addEventListener("DOMContentLoaded", getDateQuery);

// Define values

var latitude; //latitude
var longitude; //longitude
var results = {};
// var results_all = {};
var dates = [];
var maxDate = 0;

// Can think through more categories like driving home

var category_person = ["MISSING PERSON", "ASSAULT", "FAMILY OFFENSES", "SEX OFFENSES, NON FORCIBLE", "KIDNAPPING", "SEX OFFENSES, FORCIBLE"]
var category_belongings =["LARCENY/THEFT"]
var category_property =["BAD CHECKS", "EXTORTION", "STOLEN PROPERTY", "VANDALISM", "ROBBERY", "TRESPASS", "BURGLARY", "FORGERY/COUNTERFEITING"]
var category_car = ["VEHICLE THEFT"]
var category_other = ["FRAUD", "WARRANTS", "RECOVERED VEHICLE", "NON-CRIMINAL", "SUSPICIOUS OCC", "LOITERING", "GAMBLING", "LIQUOR LAWS", "PROSTITUTION", "PORNOGRAPHY/OBSCENE MAT", "EMBEZZLEMENT", "DISORDERLY CONDUCT", "SUICIDE", "DRUG/NARCOTIC", "DRIVING UNDER THE INFLUENCE", "DRUNKENNESS","ARSON",  "WEAPON LAWS", "BRIBERY", "SECONDARY CODES", "RUNAWAY", "OTHER OFFENSES"]

function flow(){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(updateLocation);
}

//Charts
function renderChart(){
  console.log("Rendering Chart....");
  $(function () { 
    var data_all = [];
    var data_local = [];
    for (var key in results) {
      if (results.hasOwnProperty(key)) {
        data_local.push(results[key].local);
        data_all.push(Math.round(parseInt(results[key].all)*3.14/47));
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
}
var categories = [];

function getCategory(response){
  response.forEach(function(object){
    if(!categories.includes(object.category)){
      categories.push(object.category); 
    } 
  });
}

function getDateQuery(){
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
      // console.log(results);
    }
  });
  maxDate = dates[dates.length-1] 
  console.log("Dates complete, max date: "+maxDate);
}

function returnData(x,y){
  if (person.checked){
    category_person.forEach(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      $.get(query, appendData);
    });
  }
  else if (belongings.checked){
    category_belongings.forEach(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      $.get(query, appendData);
    });
  }
  else if (car.checked){
    category_car.forEach(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      $.get(query, appendData);
    });  
  }
  else if (property.checked){
    category_property.forEach(function(category){
      var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select * where date > '2016-01-01T00:00:00.000' and category='"+category+"' order by date desc limit 2000000"
      $.get(query, appendData);
    });
  }
  return results;
}
//Will need to divide all by the 1 mile radius... e.g. how many 2 miles radius are there in SF? 

function appendData(response){
  response.forEach(function(object){
    // console.log(object);
    var date = object.date.substring(0,7);
    // console.log(object);
    // console.log(latitude,longitude,object.y,object.x);
    var distance = getDistance(latitude,longitude,object.y,object.x);
    // console.log(distance);
    //1 km = 1.60934 miles
    results[date].all = results[date].all +1;

    if (distance < 1.61){
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
  // console.log(results);
  // console.log(results_all);
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
  console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  returnData(latitude,longitude);
  setTimeout(renderChart,2000);
  createGoogleMap(latitude,longitude);
}

function createGoogleMap(latitude,longitude) {
    var el = document.querySelector("#google-map");    
    var options = {
      center: {lat: latitude, lng: longitude},
      zoom: 16
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
        position: {lat: latitude, lng: longitude},
        title: "Your location",
        icon: goldStar
    });

}
