// Setup
// ----------------------------------------------
var stop = document.querySelector("button.control.stop-button");
var slow = document.querySelector("button.control.slow-button");
var go = document.querySelector("button.control.go-button");
var caution = document.querySelector("button.control.caution-button");
var run = document.querySelector("button.control.run-button");

var light = document.querySelector("div#traffic-light");

var interval1;
var interval2;
var interval3;
// Structure
// ----------------------------------------------
stop.addEventListener('click', function(){
	reset();
	light.className = "stop stop-light";
});
slow.addEventListener('click', function(){
	reset();
	light.className = "slow slow-light";
});
go.addEventListener('click', function(){
	reset();
	light.className = "go go-light";
});
caution.addEventListener('click', function(){
	reset();
	light.className = "slow slow-light";
	interval1 = setInterval(function(){
		light.className = "";
	},1000)
	interval2 = setInterval(function(){
		light.className = "slow slow-light";
	},2000)

});

run.addEventListener('click', function(){
	reset();
	cycle();
	interval3 = setInterval(function(){
		cycle();
	},3000)

});

function reset(){
	clearInterval(interval1);
	clearInterval(interval2);
	clearInterval(interval3);
}

function cycle(){
	light.className = "go go-light";
	setTimeout(function(){
		light.className = "slow slow-light";
	},1000)
	setTimeout(function(){
		light.className = "stop stop-light";
	},2000)
}



// Events
// -------------------------------------------


// Event handlers
// ----------------------------------------------

