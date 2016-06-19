/*	
	IMPORTS
*/
import "../styles/site.scss";
import Defaults from "./defaults.js";
import Odds from "./odds.js";
import Lottery from "./lottery.js";
import HTMLCreate from "./dom.js";

//copy defaults so we can reset quick if needed


let settings = Defaults.getDefaults(),
	lottery = settings.lottery,
	teams = settings.teams,
	ballsDrawn = 0,
	round = 1;


makeCombosAndAssign();


function makeCombosAndAssign() {
	//create array of potential numbers to be picked
	lottery.ballRange = Lottery.setBallRange(lottery.ballMin, lottery.ballMax);
	//create all possible unique draw combinations
	let availableCombos = Lottery.getAvailableCombos(lottery.ballRange, lottery.ballsDrawnPerRound);
	//store amount of combinations for winning pct calcs
	lottery.combosRemaining = availableCombos.length;
	//the last X combos will be the re-draw ones. Add them to the list of teams 
	//and subtract those combos from the pool (only if needed).
	let redrawCombos = Lottery.setRedrawCombos(availableCombos, teams);
	if(redrawCombos){
		availableCombos.splice(availableCombos.length - redrawCombos.combos, redrawCombos.combos);
		teams.push(redrawCombos);
	}
	//shuffle the remaining combos to split amongst the teams
	availableCombos = shuffleArray(availableCombos);
	//assign the combos to each team
	teams = Lottery.assignCombos(availableCombos, teams);

	//assigning them to defaults
	Defaults.setLottery(lottery); 
	Defaults.setCombos(teams);

	initHTML();
}


function initHTML() {
	//calculate initial winning pct and sort
	teams = Odds.calculateWinningPct(lottery.combosRemaining, teams);
	teams = teams.sort(sortTeams);

	//Create the HTML for the odds chart
	HTMLCreate.setupOddsChart(teams, ballsDrawn);	
}



//TO-DO : Too much logic in here. Esp the odds recaulculating
document.getElementById("draw-btn").addEventListener("click", () => {
	//counter for how many balls we've picked this round
	ballsDrawn++;
	//draw ball and assign it, also get the index and 
	//remove it from the ballRange array and into ballsDrawn
	let ballDrawn = Lottery.drawBall(lottery.ballRange);
	let ballDrawnIndex = lottery.ballRange.indexOf(ballDrawn);
	lottery.ballRange.splice(ballDrawnIndex, 1);
	lottery.ballsDrawn.push(ballDrawn);
	
	//create the HTML for the lottery ball on the page
	HTMLCreate.createLotteryBall(ballDrawn);

	//recalculate odds and sort
	teams = Odds.updateCombosAndWinPct(teams, ballDrawn);
	teams = teams.sort(sortTeams);


	if(ballsDrawn === 3){
		teams = Odds.revealWinningCombos(teams, lottery.ballsDrawn);
	}

	if(ballsDrawn === 4){
		HTMLCreate.showWinner(round, teams[0], lottery.ballsDrawn);
		document.getElementById("draw-btn").classList.add("hidden");
		document.getElementById("start-btn").classList.remove("hidden");
	}


	//recreate the odds chart
	HTMLCreate.setupOddsChart(teams, ballsDrawn);


});

document.getElementById("start-btn").addEventListener("click", () => {
	ballsDrawn = 0;
	round++; 
	document.getElementById("start-btn").classList.add("hidden");
	document.getElementById("draw-btn").classList.remove("hidden");

	teams = Lottery.resetCombos(teams);
	teams = Lottery.removeWinner(teams);

	teams.forEach((team) => {
		team.winsWith = null,
		team.odds = null,
		team.history = [];
		team.combos = team.winningCombos.length;
	});

	lottery = Defaults.getLottery();
	HTMLCreate.reset(true);
	initHTML();

});

document.getElementById("reset-btn").addEventListener("click", () => {
	settings = Defaults.getDefaults(),
	lottery = settings.lottery,
	teams = settings.teams,
	ballsDrawn = 0,
	round = 1;

	HTMLCreate.reset();

	console.log(settings);

	initHTML();
});






function shuffleArray(array) {
	for(let i = array.length - 1; i > 0; i--){
	    let j = Math.floor(Math.random() * (i + 1));
	    let temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
}


function sortTeams(a, b){
	if(a.combos > b.combos)
		return -1;
	if(a.combos < b.combos)
		return 1;
	if(a.name === "Redraw")
		return 1;
	if(b.name === "Redraw")
		return -1;
	if(a.originalWinPct.combos > b.originalWinPct.combos)
		return -1;
	if(a.originalWinPct.combos < b.originalWinPct.combos)
		return 1;
	return 0;
}
