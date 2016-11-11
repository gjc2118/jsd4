setInterval (getRandomColor, 1000);

function changeGreen(){
	console.log("Green");
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    document.body.style.background = color;
}