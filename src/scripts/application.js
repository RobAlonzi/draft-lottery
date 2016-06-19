/*	
	IMPORTS
*/
import "../styles/site.scss";
import Defaults from "./defaults.js";
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
	teams = Lottery.calculateWinningPct(lottery.combosRemaining, teams);
	teams = teams.sort(sortTeams);

	//Create the HTML for the odds chart
	HTMLCreate.setupOddsChart(teams, ballsDrawn);	
}



//TO-DO : Too much logic in here. Esp the odds recaulculating
document.getElementById("draw-btn").addEventListener("click", () => {
	//counter for how many balls we've picked this round
	let revealWinningCombos = false;
	ballsDrawn++;

	if(ballsDrawn > 4)
		return;

	if(ballsDrawn === (lottery.ballsDrawnPerRound - 1)){
		revealWinningCombos = true;
	}

	//draw ball and update arrays
	lottery = Lottery.drawBall(lottery);

	//create the HTML for the lottery ball on the page
	HTMLCreate.createLotteryBall(lottery.mostRecentBallDrawn);


	//recalculate odds and sort
	teams = Lottery.updateOdds(teams, lottery, revealWinningCombos);
	teams = teams.sort(sortTeams);


	if(ballsDrawn === lottery.ballsDrawnPerRound){
		document.getElementById("draw-btn").classList.add("hidden");
		document.getElementById("start-btn").classList.remove("hidden");

		if(teams[0].name === "Redraw"){
			HTMLCreate.createAlert("Redraw combo has been selected. Please start the round over.");
		}else{
			HTMLCreate.showWinner(round, teams[0], lottery.ballsDrawn);

			if(round === lottery.rounds){
				document.getElementById("start-btn").classList.add("hidden");
				document.getElementById("draw-btn").classList.add("hidden");
				teams = Lottery.endLottery(teams, lottery);

				HTMLCreate.showFinalOrder(teams, (lottery.rounds + 1));
				return;

			}
		}

	}


	//recreate the odds chart
	HTMLCreate.setupOddsChart(teams, ballsDrawn);


});


document.getElementById("start-btn").addEventListener("click", () => {
	ballsDrawn = 0;
	document.getElementById("start-btn").classList.add("hidden");
	document.getElementById("draw-btn").classList.remove("hidden");

	teams = Lottery.resetCombos(teams);

	if(teams[0].name !== "Redraw"){
		round++; 
		teams = Lottery.removeWinner(teams);
	}

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

	document.getElementById("start-btn").classList.add("hidden");
	document.getElementById("draw-btn").classList.remove("hidden");

	HTMLCreate.reset();


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


function sortTeams(a, b){1

	if(a.combos > b.combos)
		return -1;
	if(a.combos < b.combos)
		return 1;
	if(a.name === "Redraw")
		return 1;
	if(b.name === "Redraw")
		return -1;
	if(a.originalStats.combos > b.originalStats.combos)
		return -1;
	if(a.originalStats.combos < b.originalStats.combos)
		return 1;
	return 0;
}
