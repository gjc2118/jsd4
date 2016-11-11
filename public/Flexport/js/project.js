var presentation = ["Here's an idea...",
"Have you considered...",
"Very excited about this one...",
"Ok let me think. What about...",
"Flexport should consider..."];

var ideas = [
{
	asa: "inventory manager",
	iwantto: "view inventory in each of my warehouses and be notified of any shortfalls",
	sothat: "I can prevent any supply constraints",
	build: "Integrate with business inventory to feed notification system based on inventory level thresholds and smart auto-fulfillment service to pro-actively ship orders",
	objective: "Delight customers by giving them one less thing to worry about, increase revenue by making the product more sticky",
	effort: "High"
},
{
	asa: "business operations manager",
	iwantto: "have a single service that manages shipping straight to my customers",
	sothat: "I have less additional services and processes to worry about",
	build: "Pursue logistics beyond warehouse destination (drones, self driving trucks) or partner with Amazon, build option in software to deliver units to specific addresses",
	objective: "Increase revenue by disrupting the last mile of freight",
	effort: "High"
},
{
	asa: "business risk officer",
	iwantto: "insure my shipments",
	sothat: "I can hedge the risk of not fulfilling my shipments",
	build: "Sell insurance by leveraging your analytics to cut risk for businesses (e.g. weather or freight canceling)",
	objective: "Increase revenue by selling a new product, delight customers",
	effort: "High"
},
{
	asa: "vendor manager",
	iwantto: "try Flexport for free",
	sothat: "I don't have an excuse not to try Flexport and will inevitably love it",
	build: "Reduce barriers to customer acquisition by explicitly quoting how long the onboarding process takes and giving a discount on first order",
	objective: "Increase revenue by boosting customer acquisition rate",
	effort: "High"
},
{
	asa: "freight company",
	iwantto: "understand future demand and popular routes",
	sothat: "I can optimize which routes I serve in order to better serve and increase revenue",
	build: "Advise the freight services by showing them predicted demand and use pricing to manage the supply of ships",
	objective: "Increase revenue by providing services to players in both supply and demand",
	effort: "High"
},
{
	asa: "CFO",
	iwantto: "have a financing option for my shipments",
	sothat: "I can pay back Flexport when convenient (e.g. when shipped product is sold)",
	build: "Offer short term financing or installment payment plans, potentially using the shipment as collateral",
	objective: "Delight customers by giving flexibility back to the businesses",
	effort: "High"
},
{
	asa: "Flexport customer service representative",
	iwantto: "leverage AI to respond to customer requests",
	sothat: "I only have to intervene when there are complex issues",
	build: "Build chatbots to facilitate servicing requests and inquiries and build an improved, scalable customer service department",
	objective: "Reduce costs by automating support services",
	effort: "High"
},
{
	asa: "business operations manager",
	iwantto: "pay the lowest price for the shipment of my goods without sacrificing quality service",
	sothat: "I can turn a profit more quickly",
	build: "Push promotions to users by leveraging analytics and guiding customers into making the logistics decisions that would benefit them and Flexport",
	objective: "Reduce costs via economies of scale, increase revenue by further undercutting competition",
	effort: "High"
},
{
	asa: "business executive",
	iwantto: "view the carbon footprint of each shipping option",
	sothat: "make environmentally conscious decisions about how I ship my goods",
	build: "Show in the software the carbon footprint of each shipping option, track how much customers are saving over time, give awards for environmentally conscious businesses",
	objective: "Increase impact by helping businesses cut their carbon footprint and reduce their environmental impact",
	effort: "High"
},
{
	asa: "government representative",
	iwantto: "tap into Flexport's data and expertise on trade",
	sothat: "I can make informed decisions on policies that can impact US and global economies",
	build: "Thought leadership in the forms of white papers and reports, as well as an API to share knowledge",
	objective: "Increase impact by helping guide national and internal trade policy to improve global development",
	effort: "High"
},
{
	asa: "Flexport hiring manager",
	iwantto: "hire talented, creative, fun people",
	sothat: "Flexport can continue to achieve its potential",
	build: "Consider hiring Geoff",
	objective: "Increase revenue & delight our customers",
	effort: "Low"
}
];

var button_label = [
"Not bad, what else",
"Already in motion, next",
"I don't think you understand what we do, try again",
"Interesting! Anything else?",
];

var h2 = document.querySelector("h2");
var button = document.querySelector("button");
var ul = document.querySelector("ul");
var asa = document.querySelector('table').rows[0].cells[1];
var iwantto = document.querySelector('table').rows[1].cells[1];
var sothat = document.querySelector('table').rows[2].cells[1];
var build = document.querySelector('table').rows[3].cells[1];
var objective = document.querySelector('table').rows[4].cells[1];

var pindex = 0;
var iindex = 0;
var bindex = 0;

button.addEventListener("click",generate);

function generate(){
	if (button.innerHTML == "Thank you for your interest in Flexport Geoff!"){
		swal({
    		title: "These are just some ideas!",
    		type: "success",
    		text: "If only Product Management was this easy! Reach out on to linkedin or email gjc2118 at gmail dot com for more",
    	confirmButtonText: "Thanks",
    	closeOnConfirm: false });
    	return;
	}
		

	h2.innerHTML = presentation[pindex];
	button.innerHTML = button_label[bindex];
	asa.innerHTML = ideas[iindex].asa + ",";
	iwantto.innerHTML = ideas[iindex].iwantto;
	sothat.innerHTML = ideas[iindex].sothat +".";
	build.innerHTML = ideas[iindex].build;
	objective.innerHTML = ideas[iindex].objective;

	if (presentation.length == pindex+1){
		pindex = 0;
	}
	else {
		pindex++;
	}
	if (button_label.length == bindex+1){
		bindex = 0;
	}
	else {
		bindex++;
	}
	if (ideas.length == iindex+1){
		button.innerHTML = "Thank you for your interest in Flexport Geoff!"
		iindex = 0;
	}
	else {
		iindex++;
	}
}


swal({
    title: "Welcome to Musings on Flexport Product Ideas",
    text: "Geoff is a Product Manager looking to join the Flexport team. Here are some of his product ideas for Flexport",
    confirmButtonText: "Cool",
    closeOnConfirm: false });
