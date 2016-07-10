/*	
	IMPORTS
*/
import "../styles/site.scss";
import Defaults from "./defaults.js";
import Lottery from "./lottery.js";
import HTMLCreate from "./dom.js";
import Modal from "./modal.js";

//copy defaults so we can reset quick if needed
let settings = Defaults.getDefaults(),
	lottery = settings.lottery,
	teams = settings.teams,
	ballsDrawn = 0,
	round = 1;

//set up the lottery with assigning combos
settings = Lottery.initCombos(settings);

//assigning settings to defaults so we don't have to
//keep recalculating on a reset
Defaults.setLottery(lottery); 
Defaults.setCombos(teams);

//make the odds chart on the page
HTMLCreate.setupOddsChart(teams, ballsDrawn);

let tableDetailBtns = document.getElementsByClassName("details-btn");
addEventListenerList(tableDetailBtns, 'click', showDetails);


//draw ball button is clicked
document.getElementById("draw-btn").addEventListener("click", () => {
	//increment how many balls have been selected
	ballsDrawn++;
	let revealWinningCombos = false;

	//don't do anything if balls drawn is more than we we're supposed to
	if(ballsDrawn > lottery.ballsDrawnPerRound)
		return;

	//if there is only one ball left to pick, show 'wins with' feature
	if(ballsDrawn === (lottery.ballsDrawnPerRound - 1))
		revealWinningCombos = true;

	//draw ball and update arrays that track balls drawn and balls left
	lottery = Lottery.drawBall(lottery);

	//create the HTML for the lottery ball on the page
	HTMLCreate.createLotteryBall(lottery.mostRecentBallDrawn);

	//recalculate odds and sort
	teams = Lottery.updateOdds(teams, lottery, revealWinningCombos);

	//if we've picked all the balls, show winning screen
	if(ballsDrawn === lottery.ballsDrawnPerRound){
		endOfRound();
	}

	if(round === lottery.rounds && teams[0].name !== "Redraw" && ballsDrawn === lottery.ballsDrawnPerRound){
		endLottery();
		return true;
	}

	//recreate the odds chart
	HTMLCreate.setupOddsChart(teams, ballsDrawn);

	let tableDetailBtns = document.getElementsByClassName("details-btn");
	addEventListenerList(tableDetailBtns, 'click', showDetails);
});



document.getElementById("start-btn").addEventListener("click", () => {
	//reset the balls drawn variable
	ballsDrawn = 0;

	//hide the start round btn, show the draw ball btn
	document.getElementById("start-btn").classList.add("hidden");
	document.getElementById("draw-btn").classList.remove("hidden");

	//if the first team is redraw, they won and don't start a new round
	//if not add the winning combos into redraw and increment round
	if(teams[0].name !== "Redraw"){
		round++;
		teams = Lottery.startNewRound(teams);
		teams = Lottery.removeWinner(teams, lottery);
	}else{
		teams = Lottery.startNewRound(teams);
	}

	//get the default lottery state (no balls picked, etc)
	lottery = Defaults.getLottery();

	//recalculate the odds
	teams = Lottery.calculateOddsBlock(lottery.combosRemaining, teams);

	//remove the balls and odds chart from the view
	HTMLCreate.reset(true);
	HTMLCreate.setupOddsChart(teams, ballsDrawn);
});


function endOfRound(){
	//hide draw ball button, show start round button
	document.getElementById("draw-btn").classList.add("hidden");
	document.getElementById("start-btn").classList.remove("hidden");

	//if it's redraw that won, show alert and nothing else (we have to re-do round)
	if(teams[0].name === "Redraw"){
		HTMLCreate.createAlert("Redraw combo has been selected. Please start the round over.");
		return;
	}

	//sort the winning combo smallest to largest (as they were assigned that way)
	lottery.ballsDrawn.sort(function(a, b) {
	  return a - b;
	});

	//show winner on page
	HTMLCreate.showWinner(round, teams[0], lottery.ballsDrawn);

	return true;
}


function endLottery(){
	document.getElementById("start-btn").classList.add("hidden");
	document.getElementById("draw-btn").classList.add("hidden");
	teams = Lottery.endLottery(teams, lottery);
	HTMLCreate.showFinalOrder(teams, (lottery.rounds + 1));

	return true;
}





document.getElementById("reset-btn").addEventListener("click", () => {
	settings = Defaults.getDefaults(),
	lottery = settings.lottery,
	teams = settings.teams,
	ballsDrawn = 0,
	round = 1;

	teams = Lottery.calculateOddsBlock(lottery.combosRemaining, teams);

	document.getElementById("start-btn").classList.add("hidden");
	document.getElementById("draw-btn").classList.remove("hidden");

	HTMLCreate.reset();
	HTMLCreate.setupOddsChart(teams, ballsDrawn);
	let tableDetailBtns = document.getElementsByClassName("details-btn");
	addEventListenerList(tableDetailBtns, 'click', showDetails);
});





function showDetails(){
	const team = this.getAttribute("team");
	HTMLCreate.showTeamDetails(teams[team]);
} 


function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}