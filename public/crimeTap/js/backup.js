

//Need to figure out how to keep grabbing dat. 
//Thought: do a pull with pagination and stop only when the ID matches
//Change of plans - not using FIREBASE
function getCount(date){
  var counter = 0;
  var start = date+"-01T00:00:00";
  var end = date+"-26T00:00:00";
  ref.orderByChild("date").startAt(start).endAt(end).on("child_added", 
    function(object) {
      console.log(object.val());
    // console.log(object.val().date);
    // console.log(object.val().incidntnum);
    // results.push(object.val().incidntnum);
    // if(!categories.includes(object.val().category)){
    //   // categories.push(object.val().category); 
    // } Used to create the categories
    counter+=1;
    // console.log(date+": "+counter);
  });
  console.log("counter: "+counter)
  return counter;
}


function saveChanges(){
  console.log("saveChanges");
  ref.set(json);
}

function getData(){
  ref.on("value",updateApp);
}

function updateApp(snapshot){
  console.log(snapshot.val());
  var value = snapshot.val();
}


function getData(){
  // event.preventDefault();
  var query = "https://data.sfgov.org/resource/9v2m-8wqu.json?$limit=50000&category=ASSAULT"; //?$limit=50000'
  // console.log(query);
  $.get(query, store);
}

// need to store in the following ways: date / big 4 category / object
var dates = [];


function store(response){

  console.log(response);
  response.forEach(function(object){


    if(!dates.includes(object.date.substring(0,7))){
      dates.push(object.date.substring(0,7)); 
    }

    // console.log(object);
    console.log(object.date);

    var date = object.date.substring(0,7);
    var dateRef = ref.child(date);
    dateRef.push(object);
      // dateRef.set({
      //   date: {
      //     category: object.category,
      //     date: object.date,
      //     dayofweek: object.dayofweek,
      //     x: object.x,
      //     y: object.y,
      //     time: object.time
      //   }
      // });
});
}

function erase(){
  ref.child("2016-10").remove();
  //   ref.remove(function(error){
  // //do stuff after removal
  // });
}