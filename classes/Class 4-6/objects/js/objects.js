// A user who had reserved a Zipcar arrives to find it has not been returned yet, and customer service transfers her reservation to an available car.

//constructor
var Zipcar = function(status) {
	this.status = status;
}

//prototype
Zipcar.prototype = {
	pickup: function(){
		if (this.status == "not available") {
			return "Car not available. Call customer service & complain";
		}
		if (this.status == "available") {
			this.status = "in use";
			return "Off you go!";
		}
	},
	return: function(){
		if (this.status == "in use") {
			this.status = "available";
			return "Hope you had a nice ride!";
		}
		else return "You are not driving";
	}
}


// main

var zipcar1 = new Zipcar("not available");
var zipcar2 = new Zipcar("availabe");

var zipcars = [zipcar1, zipcar2];

var reservation = {
	zipcar: zipcars[0],
	transfer: function(){
		this.zipcar = zipcars[1];
		return "You're all set sir, thank you for being a loyal customer";
	}
};

var person = {
	firstname: "Bob",
	lasname: "Boberson",
	plan: "Get to band practice",
	reservation: reservation,
	pickup: function(){
		return this.reservation.zipcar.pickup();
	},
	complain: function() {
		return this.reservation.transfer();
	},
	return: function() {
		return this.reservation.zipcar.return();
	}
}