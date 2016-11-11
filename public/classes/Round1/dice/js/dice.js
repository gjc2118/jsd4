// Structure
// ------------------------------------------
var rollButton = document.querySelector('.roll-button');
var firstDie   = document.querySelector('#first-die');
var secondDie  = document.querySelector('#second-die');


// Events
// ------------------------------------------
rollButton.addEventListener('click', rollDice);


// Event Listeners
// ------------------------------------------

function rollDice(){
	var d1 = Math.floor(Math.random()*6+1);
	var d2 = Math.floor(Math.random()*6+1);
	switch(d1){
		case 1:
			firstDie.className = "dice-1";
			break;
		case 2:
			firstDie.className = "dice-2";
			break;
		case 3:
			firstDie.className = "dice-3";
			break;
		case 4:
			firstDie.className = "dice-4";
			break;
		case 5:
			firstDie.className = "dice-5";
			break;
		case 6:
			firstDie.className = "dice-6";
			break;
	}
		switch(d2){
		case 1:
			secondDie.className = "dice-1";
			break;
		case 2:
			secondDie.className = "dice-2";
			break;
		case 3:
			secondDie.className = "dice-3";
			break;
		case 4:
			secondDie.className = "dice-4";
			break;
		case 5:
			secondDie.className = "dice-5";
			break;
		case 6:
			secondDie.className = "dice-6";
			break;
	}
}

/*
Creating a function named 'rollDice' where every time the user hits the "Roll Dice" button, the 
screen randomly updates the two dice. Use the html and css code included 
in the starter code folder to get started.

1) Write down pseudocode for the following program.

2) Follow the steps below to write your code.
* generate a random number between 1 - 6 and store to a variable, named 'random1'
* generate a random number between 1 - 6 and store to a variable, named 'random2'
* combine the string 'dice-' and random1 to form the random class for the first die, firstClass
* combine the string 'dice-' and random2 to form the random class for the second die, secondClass
* update the class of firstDie, using assignment, like firstDie.className =
* update the class of secondDie, using assignment, like secondDie.className = 

3) Check to see if the Dice Roll has been hit, if it has run the rollDice function.

*/
