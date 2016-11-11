// Firebase application setup
// ------------------------------------------------


  // Initialize Firebase
var config = {
apiKey: "AIzaSyDib4XC4p-DHR8EdDw9yrrk7lQDlrv6i1g",
authDomain: "fanbase-7b175.firebaseapp.com",
databaseURL: "https://fanbase-7b175.firebaseio.com",
storageBucket: "fanbase-7b175.appspot.com",
messagingSenderId: "725092004095"
};

firebase.initializeApp(config);

// Create Firebase application reference
// ------------------------------------------------
var db = firebase.database();

// Elements
// ------------------------------------------------
var form = document.querySelector("form");
var message = document.querySelector("#message");
var messageBoard = document.querySelector(".message-board");

// Events
// ------------------------------------------------
form.addEventListener('submit',submitForm);
loadState();

function submitForm(event){
	event.preventDefault();
	var messageText = message.value;
	// console.log(messageText);
	message.value = '';

	var ref = db.ref('messages');

	ref.push({
		content: messageText,
		votes: 0
	});
}

function loadState() {
	db.ref('messages').on('value', createMessages)
}

function createMessages(results){
	var messages = results.val();
	messageBoard.innerHTML = '';
	for (var i in messages){
		createMessage(messages[i].content);
	}
}

function createMessage(message){
	var li = document.createElement("li");
	li.innerHTML = message;
	messageBoard.appendChild(li);
}

function destroyMessage(id){
	var ref = db.ref('messages/'+id);
	ref.remove();
}

