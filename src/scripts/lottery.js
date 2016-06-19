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


exports.drawBall = (range) => {
	let indexDrawn = Math.floor(Math.random() * range.length);
	let ballChosen = range[indexDrawn];
	return ballChosen;
};


exports.resetCombos = (teams) => {
	teams.forEach((team) => {
		team.winningCombos = team.winningCombos.concat(team.losingCombos);
		team.losingCombos = [];
	});

	return teams;
};


exports.removeWinner = (teams) => {

	console.log(teams[0]);
	console.log(teams[teams.length - 1]);

	let winningCombos = teams[0].winningCombos,
		redrawCombos = teams[teams.length - 1].winningCombos;

	teams[teams.length - 1].winningCombos = redrawCombos.concat(winningCombos);
	teams.shift();

	return teams;
}