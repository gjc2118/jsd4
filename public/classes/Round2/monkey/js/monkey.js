/*Work with a partner to create a monkey object, which has the following properties:

* name
* species
* foodsEaten

And the following methods:
* eatSomething(thingAsString)
* introduce: producers a string introducing itself, including its name, species, and what it's eaten.

Create 3 monkeys total. Make sure all 3 monkeys have all properties set and methods defined.

Exercise your monkeys by retrieving their properties and using their methods. Practice using both syntaxes
for retrieving properties (dot notation and brackets).

*/

var Monkey = function(name, species) {
	this.name = name;
	this.species = species;
}
//prototype
Monkey.prototype = {
	name: "",
	species: "", 
	foodEaten: [],
	eatSomething: function(food){
		this.foodEaten.push(food);
		console.log("mmh this " + food +" was good");
	},
	introduce: function(){
		console.log("Hello my name is " + this.name + ". I am a " + this.species + " monkey. Feed me. Food that I have eaten include: ");
		var i = 1;
		this.foodEaten.forEach(function(food){
			console.log(i+". "+food)
			i++;
		})
	}
};

var monkey1 = new Monkey("Bob", "Mandrill");
var monkey1 = new Monkey("George", "Lesula");