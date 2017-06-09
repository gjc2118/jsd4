

$(document).ready(openNav());

// var loan1 = document.querySelector("#loan1");
// var loan2 = document.querySelector("#loan2");
var due1 = document.querySelector("#due1");
var due2 = document.querySelector("#due2");
var paid1 = document.querySelector("#paid1");
var paid2 = document.querySelector("#paid2");
var noaction1 = document.querySelector("#noaction1");
var payfail1 = document.querySelector("#payfail1");
var dq = document.querySelector("#dq");

var fn = document.querySelector("#fn");
var ln = document.querySelector("#ln");
var amount = document.querySelector("#amount");
var cra = document.querySelector("#cra");

//Sends request to both SWU and CUIO
$('#sign').click(function(e){
    e.preventDefault();
    $.get(
      "/sendevent",
      {first_name : fn.value, last_name : ln.value, amount : amount.value, cra : cra.value},
      function(data) {
         swal("You have been approved!", data, "success")
      }
    );
    $.get(
      "/sendemail/",
      {first_name : fn.value, last_name : ln.value, amount : amount.value, cra : cra.value},
  );
});

//SWU
$('#button1').click(function(e){
  console.log(getAction());
    e.preventDefault();
    var response = getAction();
    $.get(
	    "/sendemail"+response,
	    {paramOne : 1, paramX : 'abc'},
	    function(data) {
        if(response =='none') {swal("Nice!", data, "success")}
        if(response =='/dq') {swal("Oh no!", data, "error")}
	    }
	);
});

//Customer.io
$('#button2').click(function(e){
    e.preventDefault();    
    var response = getAction();
    $.get(
      "/sendevent"+response,
      {paramOne : 1, paramX : 'abc'},
      function(data) {
        if (response == '/due' ||  response == '/paid') {{swal("Nice!", data, "success")}}
        if (response == '/noaction' ||  response == '/fail') {swal("Oops!", data, "error")}
      }
  );
});

function getAction(){
  // if (loan1.checked || loan2.checked){
  //   return '';
  // }
  // else 
    if (due1.checked || due2.checked ){
    return '/due';
  }
  else if (paid1.checked || paid2.checked){
    return '/paid';
  }
    else if (dq.checked){
    return '/dq';
  }
  else if (noaction1.checked){
    return '/noaction';
  }
  else if (payfail1.checked){
    return '/fail';
  }
  else return 'none'
}


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}