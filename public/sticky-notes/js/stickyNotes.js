console.log('hello sticky notes');

// Elements
// ---------------------------
var container = document.querySelector(".container");
var button = document.querySelector("button");
var boxColor = document.querySelector(".box-color");
var boxNote = document.querySelector(".box-note");

var noteCount = 0;

window.addEventListener('load', function(){
	var noteCount = 1;

	button.addEventListener('click',addNote);

	function addNote(){
		console.log('click');
		var color = boxColor.value;
		var note = boxNote.value;

		var div = document.createElement("div");

		div.id = "note-"+noteCount;

		div.classList.add("box"); /// ensure you are adding the class box to the div
		div.innerHTML = note;
		div.style.backgroundColor = color;

		container.appendChild(div);

		div.addEventListener("click", deleteNote);
		noteCount++;
	};

	function deleteNote(e) {
		console.log('deleteNote', e);
		this.remove(); // works since this is the element. if there was a x button then you would have to find the object using document.querySelect("#"+this.id)
	}
});

