module.exports = exports = {};

exports.setBallRange = (min, max) => {
	let ballRange = [];
	for(let i = min; i <= max; i++){
		ballRange.push(i);
	}

	return ballRange;
};	


exports.getAvailableCombos = (range, draws) => {

	var makeCombos =  (draws, range, tmp, combos) => {
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


exports.setRedrawCombos = (combos, teams) => {
	let nonRedrawComboLength = 0,
		redrawCombos = [];

	teams.forEach((team) => {
		nonRedrawComboLength += team.combos;
	});

	for(let i = nonRedrawComboLength, combosLength = combos.length; i < combosLength; i++){
		redrawCombos.push(combos[i]);
	}

	if(redrawCombos.length > 0){
		return {
			name: "Redraw",
			combos: redrawCombos.length,
			winningCombos: redrawCombos,
			losingCombos: []
		}
	}

	return false;
}

exports.assignCombos = (combos, teams) => {

	teams.forEach((team) => {
		//stop when you hit Redraw
		if(team.name === "Redraw"){
			return;
		}

		team.winningCombos = [];
		team.losingCombos = [];

		for(let i = 0; i < team.combos; i++){
			team.winningCombos.push(combos[i]);
		}

		combos.splice(0, team.combos);
	});

	return teams;
}


exports.resetCombos = (teams) => {
	teams.forEach((team) => {
		team.winningCombos = team.winningCombos.concat(team.losingCombos);
		team.losingCombos = [];
	});

	return teams;
};


exports.removeWinner = (teams) => {
	let winningCombos = teams[0].winningCombos,
		redrawCombos = teams[teams.length - 1].winningCombos;
	teams[teams.length - 1].winningCombos = redrawCombos.concat(winningCombos);
	teams.shift();
	return teams;
}


exports.drawBall = (lottery) => {
	let ballDrawn = drawBall(lottery.ballRange);
	let ballDrawnIndex = lottery.ballRange.indexOf(ballDrawn);

	lottery.mostRecentBallDrawn = ballDrawn;
	lottery.ballRange.splice(ballDrawnIndex, 1);
	lottery.ballsDrawn.push(ballDrawn);


	return lottery;
}


exports.endLottery = (teams, lottery) => {
	teams.pop();
	teams.shift();


	teams.forEach((team, i) => {
		//i + lottery.rounds + 1 is trying to get the highest non-lottery postition
		team.placeChange = getPlaceChange(team, (i + lottery.rounds + 1))
	});

	console.log(teams);

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
		team.odds = calculateWinningPct(team.combos, totalCombos);
	});

	return teams;
}


exports.calculateWinningPct = (totalCombos, teams) => {
	teams.forEach((team) => {
		team.odds = calculateWinningPct(team.combos, totalCombos);
	});

	return teams;
};




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


function calculateWinningPct(teamCombos, totalCombos){
	let winPct = (teamCombos / totalCombos * 100).toFixed(1);
	return{
			percent: winPct,
			combos : teamCombos
		};
}