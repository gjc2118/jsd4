console.log("hello");

function calcFahrenheitToCelcius(fahrenheit){
	return (fahrenheit - 32) * 5/9;
}

function calcCelciusToFarenheit(celcius){
	return celcius * (9/5) + 32;
}

function calcLongestSide(a,b){
	return Math.sqrt((a * a) + (b * b));
}

function calcCircumference(radius){
	return 2 * Math.PI * radius;
}