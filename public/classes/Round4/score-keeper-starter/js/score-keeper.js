console.log("hello");

var plus5 = document.querySelector("button#increase-5.button-1");
var minus5 = document.querySelector("button#decrease-5.button-1");
var setScoreButton = document.querySelector("button#submit-custom-score.button-2");
var inputScore = document.querySelector("input#custom-score");
var scoreObject = document.querySelector("div#score");

var score = parseInt(scoreObject.innerHTML.substring(0,1));

plus5.addEventListener("click",add5);
minus5.addEventListener("click",subtract5);
setScoreButton.addEventListener("click",setScore);

function add5(){
	score+=5;
	updateScore(score);
}

function subtract5(){
	if(score -5  < 0) {
		alert("Score must be positive");
		return;
	}
	score-=5;
	updateScore(score);
}

function setScore(){
	if(parseInt(inputScore.value) < 0) {
		alert("Score must be positive");
		return;
	}
	score = parseInt(inputScore.value);
	if(isNaN(score)){
		alert("Please enter a number");
		return;
	}
	updateScore(score);
}

function updateScore(number){
	scoreObject.innerHTML = number + " Points";
}
