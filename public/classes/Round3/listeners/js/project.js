var counter = 0;

var main = document.querySelector("main");

var p = document.createElement("P");
p.initHTML= counter;
main.appendChild(p)


var me = document.createEvent("MouseEvent");

me.initEvent("click");

main.addEventListenet("click",count);

function count(){
	counter++;
	console.log("count",counter);
}