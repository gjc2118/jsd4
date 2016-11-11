var counter = 0;

var main = document.querySelector("main");

var p = document.createElement("p");
p.innerHTML = counter;
main.appendChild(p);
p.addEventListener("click",clickCircle);



function clickCircle(event){
	counter++;
	console.log("type: " + event.type);
	console.log("target: " + event.target);
	console.log("content: " + event.target.innerHTML);
	p.innerHTML = counter;
}