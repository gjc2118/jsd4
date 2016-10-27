// Still need to compute the percentage rate impact
// Still need to do the rate lag/lead feature
// Will need to enable the saving of the values, overwrite when they hit simulate
// will want to add validation and potentially number formatting to the boxes
// Still need to add a "do nothing" and a "optimize" button
// Still need to enable user to change the values and store them

// Set up Database
var ref = new Firebase('https://nomis-e63b1.firebaseio.com')

// Set up variables
var bal_change = document.querySelector("#bal_change");
var size = document.querySelector("#size");
var rate = document.querySelector("#rate");
var lead = document.querySelector("#lead");
var lag = document.querySelector("#lag");
var result_bal_change = document.querySelector("#result_bal_change");
var ff = 0;
var months = 0;

// Sample seed for Firebase - will delete once true seed is there
var json = {
	"size": 43000000000,
	"bal_change": 200000000,
	"rate": 0.5,
	"client_beta": 0,
	"competitor_beta": 75,
	"hr_acq": 100,
	"hr_att": -150,
	"acq_avg": 1000000,
	"att_avg": 0.005
}
ref.set(json);

// Event listeners on buttons and page load
document.addEventListener("DOMContentLoaded", getValues);
lead.addEventListener("click", leadFunction);
lag.addEventListener("click", lagFunction);
maintain.addEventListener("click", maintainFunction);
ref.on("value",updateApp);

 //here you would pass a parameter on lead. For now they call Run
function leadFunction(event){
	event.preventDefault();
	run();
}

function lagFunction(event){
	event.preventDefault();
	run();
}

function maintainFunction(event){
	event.preventDefault();
	run();
}

function getValues(){
	ref.on("value",updateApp);
}

function run(){
	console.log("runnning app");
	// ref.set(json);
	ref.on("value",calculate);
}

function updateResults(results){
	console.log(results);
	result_bal_change.innerHTML= format(results.result_bal_change);
}

function format(labelValue) {
	var value = Math.abs(Number(labelValue));
	if (value >= 1.0e+9){
		return "$"+Math.round(Number(labelValue) / 1.0e+9*100)/100 + "B"
	}
	else if (value >= 1.0e+6){
		return "$"+Math.round(Number(labelValue) / 1.0e+6*100)/100 + "M"
	}
	else if (value >= 1.0e+3){
		return "$"+Math.round(Number(labelValue) / 1.0e+3*100)/100 + "K"
	}
	else {
		"$"+Math.round(Number(labelValue)*100)/100;
	}
}

ref.on("value",updateApp);

function updateApp(snapshot){
	var value = snapshot.val();
	bal_change.value = value.bal_change;
	size.value = value.size;
	rate.value = value.rate;
}

function calculate(snapshot){
	getInput();
	var value = snapshot.val();

	var bal_change = value.bal_change;
	var size = value.size;
	var rate = value.rate;
	var client_beta = value.client_beta;
	var competitor_beta = value.competitor_beta;
	var hr_acq = value.hr_acq;
	var hr_att = value.hr_att;
	var acq_avg = value.acq_avg;
	var att_avg = value.att_avg;

	var attrition_balance = -att_avg*size;
	console.log("attrition_balance: "+ attrition_balance);
	var inflow_balance = bal_change-attrition_balance;
	console.log("inflow_balance: "+ inflow_balance);
	var change_rate_diff = (client_beta-competitor_beta)*ff/100;
	console.log("change_rate_diff: "+ change_rate_diff);
	var delta_attrition_balance_pct = (Math.exp(hr_att*change_rate_diff/10000)-1)*att_avg;
	console.log("delta_attrition_balance_pct: "+ delta_attrition_balance_pct);
	var delta_acquisition_balance = (Math.exp(hr_acq*change_rate_diff/10000)-1)*inflow_balance;
	console.log("delta_acquisition_balance: "+ delta_acquisition_balance);

	var end_bal_baseline = 0;
	var end_bal_scenario = 0;
	var beg_bal_baseline = size;
	var beg_bal_scenario = size;

	//compute baseline
	for(i=1; i<=months; i++){
		end_bal_baseline = beg_bal_baseline+inflow_balance-beg_bal_baseline*att_avg;
		beg_bal_baseline = end_bal_baseline;
		console.log("end_bal_baseline on month "+ i +": "+ end_bal_baseline);
	}

	//compute scenario
	for(i=1; i<=months; i++){
		end_bal_scenario = beg_bal_scenario-(beg_bal_scenario*(att_avg+delta_attrition_balance_pct))+inflow_balance+delta_acquisition_balance;
		beg_bal_scenario = end_bal_scenario;
		console.log("end_bal_scenario on month "+ i +": "+ end_bal_scenario);
	}

	var delta = end_bal_scenario-end_bal_baseline;
	console.log("delta: "+ delta);

	var results = {
		"result_bal_change": delta,
		"result_nii_change": "xx",
		"result_ie_change": "xx",
		"result_nim_change": "xx"
	};

	updateResults(results);
}

//Get the inputs from the radio button. Called during compute
function getInput() {
    var g = getRVBN('radio-toggle1'); 
    if (g == "ffno")  {
    	ff=0;
    }
    else if (g == "ff25"){
    	ff=25;
    }
    else if (g == "ff50"){
    	ff=50;
    }
    var g = getRVBN('radio-toggle3'); 
    if (g == "f1")  {
    	months=0;
    }
    else if (g == "f3"){
    	months=3;
    }
    else if (g == "f6"){
    	months=6;
    }
}

function getRVBN(rName) {
    var radioButtons = document.getElementsByName(rName);
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) return radioButtons[i].id;
    }
    return '';
}

swal({
    title: "Welcome to the Nomis Portfolio Simulator",
    text: "Let's get your informed on your balances at risk",
    confirmButtonText: "Ok",
    closeOnConfirm: false });
