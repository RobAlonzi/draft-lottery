module.exports = exports = {};


exports.initCombos = (settings) => {
	initCombos(settings);	
}


exports.calculateOddsBlock = (totalCombos, teams) => {
	teams.forEach((team) => {
		team.odds = calculateOddsBlock(team.combos, totalCombos, team.originalStats.pct);
	});

	return teams;
};


exports.drawBall = (lottery) => {
	let ballDrawn = drawBall(lottery.ballRange);
	let ballDrawnIndex = lottery.ballRange.indexOf(ballDrawn);

	lottery.mostRecentBallDrawn = ballDrawn;
	lottery.ballRange.splice(ballDrawnIndex, 1);
	lottery.ballsDrawn.push(ballDrawn);


	return lottery;
}

exports.updateOdds = (teams, lottery, reveal) => {
	let ballDrawn = lottery.mostRecentBallDrawn,
		ballsDrawn = lottery.ballsDrawn;

	teams.forEach((team) => {
		team = removeLosingCombos(team, ballDrawn);

		if(reveal)
			team.winsWith = revealWinningCombos(team, ballsDrawn);
	});

	let totalCombos = countCombosRemaining(teams);

	teams.forEach((team) => {
		team.odds = calculateOddsBlock(team.combos, totalCombos, team.originalStats.pct);
	});

	teams = teams.sort(sortTeams);

	return teams;
}


exports.startNewRound = (teams) => {
	teams.forEach((team) => {
		team.winningCombos = team.winningCombos.concat(team.losingCombos);
		team.losingCombos = [];
		team.winsWith = null;
		team.odds = null;
		team.combos = team.winningCombos.length;
	});

	return teams;
};

exports.removeWinner = (teams, lottery) => {
	let winningCombos = teams[0].winningCombos,
		redrawTeamIndex = teams.length - 1,
		redrawCombos = teams[redrawTeamIndex].winningCombos;

	//add winning teams combos into redraws combos	
	teams[redrawTeamIndex].winningCombos = redrawCombos.concat(winningCombos);

	//change the original odds for the redraw combo	
	teams[redrawTeamIndex].originalStats.combos = teams[redrawTeamIndex].winningCombos.length;
	teams[redrawTeamIndex].originalStats.pct = calculateWinPct(teams[redrawTeamIndex].winningCombos.length, lottery.combosRemaining);

	//remove the first team from array (the winning team)
	teams.shift();

	return teams;
}










function initCombos(settings) {
 	let lottery = settings.lottery,
 		teams = settings.teams,
 		availableCombos = [];

 	//create array of potential numbers to be drawn
 	lottery.ballRange = setBallRange(lottery.ballMin, lottery.ballMax);
 	//create array of possible unique combos to distribute between teams
 	availableCombos = getAvailableCombos(lottery.ballRange, lottery.ballsDrawnPerRound);
 	//store amount of combinations for winning pct calcs
	lottery.combosRemaining = availableCombos.length;


	//the last X combos will be the re-draw ones (before the shuffle). Add them to the list of teams 
	//and subtract those combos from the pool (only if needed).
	let redrawCombos = setRedrawCombos(availableCombos, teams, lottery.combosRemaining);

	//if any, remove redraw combos from the pool of available combos if
	if(redrawCombos)
		availableCombos.splice(availableCombos.length - redrawCombos.combos, redrawCombos.combos);

	//shuffle the array before distribution
	availableCombos = shuffle(availableCombos);

	//assign the combos to each team
	teams = assignCombos(availableCombos, teams);

	//add redraw into the teams pool if any
	if(redrawCombos)
		teams.push(redrawCombos);

	//calculate the initial percentages of that team winning
	teams = exports.calculateOddsBlock(lottery.combosRemaining, teams);
	//sort the teams based on odds
	teams = teams.sort(sortTeams);

	return settings;
 } 

function setBallRange(min, max){
	let ballRange = [];
	for(let i = min; i <= max; i++){
		ballRange.push(i);
	}

	return ballRange;
};	


function getAvailableCombos(range, draws){
	let makeCombos =  (draws, range, tmp, combos) => {
	    if (draws == 0) {
	        if (tmp.length > 0) {
	            combos[combos.length] = tmp;
	        }
	        return;
	    }

	    for (var j = 0; j < range.length; j++) {
	        makeCombos(draws - 1, range.slice(j + 1), tmp.concat([range[j]]), combos);
	    }
	    return;
	}

    let combos = [],
    	tmp = [];

    makeCombos(draws, range, tmp, combos);

    return combos;
}


function setRedrawCombos(combos, teams, combosRemaining){
	let nonRedrawComboLength = 0,
		redrawCombos = [];

	teams.forEach((team) => {
		nonRedrawComboLength += team.combos;
	});

	for(let i = nonRedrawComboLength, combosLength = combos.length; i < combosLength; i++){
		redrawCombos.push(combos[i]);
	}

	if(redrawCombos.length > 0){
		//fix this.. calculate function returns a block
		let pct = calculateWinPct(redrawCombos.length, combosRemaining);

		return {
			name: "Redraw",
			combos: redrawCombos.length,
			originalStats: {
				pick: (teams.length + 1),
				combos: redrawCombos.length,
				pct: pct
			},
			winningCombos: redrawCombos,
			losingCombos: []
		}
	}

	return false;
}

function assignCombos(combos, teams){
	teams.forEach((team) => {
		team.winningCombos = [];
		team.losingCombos = [];

		for(let i = 0; i < team.combos; i++){
			team.winningCombos.push(combos[i]);
		}
		combos.splice(0, team.combos);
	});
	return teams;
}





































exports.endLottery = (teams, lottery) => {
	teams.pop();
	teams.shift();

	teams.forEach((team, i) => {
		//i + lottery.rounds + 1 is trying to get the highest non-lottery postition
		team.placeChange = getPlaceChange(team, (i + lottery.rounds + 1))
	});

	return teams;
}


function drawBall(range){
	let indexDrawn = Math.floor(Math.random() * range.length);
	let ballChosen = range[indexDrawn];
	return ballChosen;
}

function getPlaceChange(team, place){
	return team.originalStats.pick - place;
}


/* -----------------------------------------------------------------------
	--------------------------------------------------------------------- */





function removeLosingCombos(team, ballDrawn){
	//start removing winning combos into losing combos
	let tmpWinningCombos = [];

	for(let i = 0, combos = team.winningCombos.length; i < combos; i++){
		if(team.winningCombos[i].indexOf(ballDrawn) === -1){
			team.losingCombos.push(team.winningCombos[i]);
		}else{
			tmpWinningCombos.push(team.winningCombos[i]);
		}
	}

	team.winningCombos = tmpWinningCombos;
	team.combos = team.winningCombos.length;

	return team;
}

function revealWinningCombos(team, ballsDrawn){
	if(team.combos > 0){
		let winsWith = [];
		for(let i = 0, combosLeft = team.winningCombos.length; i < combosLeft; i++){
			let winningNumber = team.winningCombos[i].filter((el) =>{
				return ballsDrawn.indexOf(el) < 0;
			});

			winsWith.push(winningNumber.join());
		}
		
		return winsWith.toString();
	}

	return null;
}

function countCombosRemaining(teams) {
	let combos = 0;
	teams.forEach((team) => {
		combos += team.combos;
	});

	return combos;
}


function calculateOddsBlock(teamCombos, totalCombos, originalPct){
	let winPct = calculateWinPct(teamCombos, totalCombos),
		change = calculatePctChange(winPct, originalPct);

	return{
			percent: winPct,
			combos : teamCombos,
			change: change
		};
}


function calculateWinPct(combos, total){
	return (combos / total * 100).toFixed(1);
}

function calculatePctChange(pct, oldPct){
	return (pct - oldPct).toFixed(1);
}



/* UTILITY FUNCTIONS */

function shuffle(array) {
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
	if(a.originalStats.combos > b.originalStats.combos)
		return -1;
	if(a.originalStats.combos < b.originalStats.combos)
		return 1;
	return 0;
}