// Setup the callback when position is determined
// Use the geolocation API

var button = document.querySelector('button');

button.addEventListener('click',getPosition);

function getPosition(e){
  navigator.geolocation.getCurrentPosition(updateLocation);
}

// Callback function
function updateLocation(position){
  console.log("updateLocation");
  console.log(position);

  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // myLocation
}

function initMap(){
  console.log('initMap');
}

function createGoogleMap(){
  
}

