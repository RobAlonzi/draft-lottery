module.exports = exports = {};


exports.calculateWinningPct = (totalCombos, teams) => {
	teams.forEach((team) => {
		team.odds = calculateWinningPct(totalCombos, team.combos);
		team.originalWinPct = team.odds;
	});

	return teams;
};

exports.updateCombosAndWinPct = (teams, ballDrawn) => {
	let combosRemaining = 0,
		totalCombos = 0;

	teams.forEach((team) => {
		//archive the previous round if necessary
		team.history = team.history || [];
		team.history.unshift(team.odds);

		//temporarily store new winning combos
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
		totalCombos += team.combos;
	});

	teams.forEach((team) => {
		team.odds = calculateWinningPct(totalCombos, team.combos, team.originalWinPct);
	});

	return teams;
}


exports.revealWinningCombos = (teams, ballsDrawn) => {
	teams.forEach((team) => {
		if(team.combos > 0){
			let winsWith = [];
			for(let i = 0, combosLeft = team.winningCombos.length; i < combosLeft; i++){
				let winningNumber = team.winningCombos[i].filter((el) =>{
					return ballsDrawn.indexOf(el) < 0;
				});

				winsWith.push(winningNumber.join());
			}
			team.winsWith = winsWith.toString();
		}
	});

	return teams;
}



function calculateWinningPct(totalCombos, teamCombos, originalWinPct) {
	let winPct = (teamCombos / totalCombos * 100).toFixed(1),
		changeFromStart;

	if(originalWinPct && originalWinPct.combos !== teamCombos){
		changeFromStart = (winPct - originalWinPct.percent).toFixed(1);
	}else{
		changeFromStart = "--";
	}

	return {
		percent: winPct,
		change : changeFromStart,
		combos : teamCombos
	}
}



