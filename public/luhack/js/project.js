// color code by category
// add footer with information
// show loading when click on map




// var uniq = require('uniq');
// var nums = [ 5, 2, 1, 3, 2, 5, 4, 2, 0, 1 ];
// console.log(uniq(nums));



var button = document.querySelector("button");

function getDateQuery(){
  loader.className = "loader";
  loader1.className = "loader1";
  var query = "https://data.sfgov.org/resource/cuks-n6tp.json?$query=select date where date > '2016-01-01T00:00:00.000' order by date asc limit 2000000"
  $.get(query, getDate);
}

$('#button').click(function(e){
    e.preventDefault();
    console.log('hello')
    // Code goes here

    $.get(
	    "/sendemail/",
	    {paramOne : 1, paramX : 'abc'},
	    function(data) {
	       alert('page content: ' + data);
	    }
	);
});

