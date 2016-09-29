/**
* Arrays
* Most of your answers should be stored in variables called q1, q2 etc..
* and the variables printed to the console.
*
* For example:
* var q0 = "abc"
* console.log("Question 0" + q0)
*/

/** Question 1
* Create an array of image source filenames.
* Use "image1.png", "image2.png", and "image3.png" as the array values.
*/

var answer = ["image1.png", "image2.png", "image3.png"];


/** Question 2
* Using the array from Question 1, store the first element of the array
* in variable q2.
*/

var q2 = answer[0];

/** Question 3
* Get the length of the first array (number of elements in the array)
* and store it in variable q3
*/

var q3 = answer.length;

/** Question 4
* Using the array from Question 1, store the last element of the array
* in variable q4. Hint: How can we get the number of elements in the array?
*/

var q4 = answer[answer.length-1];


// Question 5
// * Create an array of numbers using 1, 2, 3, and 4 as values.
// * Use a for loop, a forEach loop function to increase
// * each value by 1. You can either store each new value back in the original
// * array, or in a new array -- your choice. The end result should be
// * an array of numbers with values 2, 3, 4, and 5.
// */

var q5 = []
var input = [1,2,3,4];
function add1(number) {
	q5.push(number+1)
}
input.forEach(add1);

/**
* Question 6
* Using the array from Question 5, find the average of the numbers in the array
* (average = sum of all numbers/number of numbers). Store the average in q6.
*/
	var q6 = 0;
	var count = 0;
	q5.forEach(function(item){
		q6 = q6+item;
		count++;
	});
	q6 = q6/count;




