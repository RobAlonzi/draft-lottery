module.exports = exports = {};


exports.calculateWinningPct = (totalCombos, teamCombos) => {
	return (teamCombos / totalCombos * 100).toFixed(1); 
};

exports.updateOdds = (teams, ballDrawn) => {
	let combosRemaining = 0;
	teams.forEach((team) => {
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
	});

	return teams;
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



