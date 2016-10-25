// Elements
// ------------------------------------------
var date      = document.querySelector('.date');
var games     = document.querySelector('.games');

// Templates
// ------------------------------------------
var dateTemplate = document.querySelector("#date-template");
var templateFn = Handlebars.compile(dateTemplate.innerHTML);
var html = templateFn(mockdata);
date.innerHTML = html;

var gameTemplate = document.querySelector("#game-template");
var templateFn2 = Handlebars.compile(gameTemplate.innerHTML);
var html = templateFn2(mockdata);
games.innerHTML = html;