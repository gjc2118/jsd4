// var database = firebase.database();

var ref = new Firebase("https://jsd4-29077.firebaseio.com")

var button = document.querySelector("button");

var json = {
	"active": "red",
	"colors": [
	"red",
	"olive",
	"skyblue"],
	"hello": "goodbye"
}

button.addEventListener("click", saveChanges);
document.addEventListener("DOMContentLoaded", getData);

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