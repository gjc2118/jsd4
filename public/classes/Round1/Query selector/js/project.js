console.log("Elements");

//get the UL from the DOM
var issues = document.querySelector(".issues");

//create a new li element
var li = document.createElement("li");

// set the text content of the new li
li.innerHTML = "US media covering Donald Trump";

// add the new li to the dom
issues.appendChild(li);

