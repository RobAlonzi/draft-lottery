module.exports = exports = {};


exports.calculateWinningPct = (totalCombos, teams) => {
	teams.forEach((team) => {
		team.winningPct = calculateWinningPct(totalCombos, team.combos);
		team.originalWinPct = team.winningPct;
	});

	return teams;
};

exports.updateCombosAndWinPct = (teams, ballDrawn) => {
	let combosRemaining = 0,
		totalCombos = 0;

	teams.forEach((team) => {
		//archive the previous round if necessary
		team.oldWinningPct = team.oldWinningPct || [];
		team.oldWinningPct.unshift(team.winningPct);

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
		team.winningPct = calculateWinningPct(totalCombos, team.combos, team.originalWinPct);
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


// exports.revealWinningCombos = () => {
// 	settings.teams.forEach((team) => {

// 		if(team.combosLeft > 0){
// 			let winsWith = [];
// 			console.log("-------------------------");
// 			for(let i = 0, combosLeft = team.winningCombosLeft.length; i < combosLeft; i++){
// 				console.log(team.winningCombosLeft[i]);
// 				let winningNumber = team.winningCombosLeft[i].filter((el) =>{
// 					return settings.lottery.ballsDrawn.indexOf(el) < 0;
// 				});

// 				winsWith.push(winningNumber.join());
// 			}

// 			console.log(winsWith);

// 		}
// 	});
// }



