import {settings} from "./settings.js";


module.exports = exports = {};

exports.reset = () => {
	settings.teams.forEach((team) => {
		team.combosLeft = team.combosStart;
		team.winningCombosLeft = team.winningCombosStart.slice();
		team.losingCombos = [];
	});	
	settings.lottery.combosRemaining = settings.lottery.totalCombosStart;
	updateOdds();
}

exports.setUpHTML = () => {
	calculateOdds();
	makeHTML();
	console.log(settings);
}

exports.update = () => {
	let combosRemaining = 0;
	settings.teams.forEach((team) => {
		let tmpWinningCombos = [];
		for(let i = 0; i < team.winningCombosLeft.length; i++){
			if(team.winningCombosLeft[i].indexOf(settings.lottery.ballPicked) === -1){
				team.losingCombos.push(team.winningCombosLeft[i]);
			}else{
				tmpWinningCombos.push(team.winningCombosLeft[i]);
			}
		}

		team.winningCombosLeft = tmpWinningCombos;
		team.combosLeft = team.winningCombosLeft.length;
		combosRemaining += team.winningCombosLeft.length;
	});

	settings.lottery.combosRemaining = combosRemaining;

	updateOdds();
}

exports.startNewRound = () => {
	console.log("yo");
}


exports.setUpOdds = () => {
	let allCombos = getLotteryCombos(settings.lottery.ballsLoaded, 4);
	settings.lottery.combosRemaining = settings.lottery.totalCombosStart = allCombos.length;
	allCombos = shuffleArray(allCombos);

	settings.teams.forEach((team) => {
		team.winningCombosStart = [];

		for(let i = 0; i < team.combosStart; i++){
			team.winningCombosStart.push(allCombos[i]);
		}

		team.winningCombosLeft = team.winningCombosStart.slice();
		allCombos.splice(0, team.combosStart);
	});

	//Leftover combos become redraw
	settings.teams.push({
		name: "Redraw",
		combosStart: allCombos.length,
		combosLeft: allCombos.length,
		winningPercentage: (allCombos.length / settings.lottery.combosRemaining * 100).toFixed(1),
		winningCombosStart: allCombos,
		winningCombosLeft: allCombos,
		losingCombos: []
	});
}


function makeHTML() {
	document.getElementById('odds').innerHTML = "";
	let ul = document.createElement('ul');

	settings.teams.forEach((team) => {
		let name = team.name,
			combos = team.combosLeft,
			winningPercentage = team.winningPercentage;

		let row = `
			<li class="row">
				<div class="name-odds-overview col-xs-12 col-md-6">
					<span class="lottery-team">${name}</span>
					<span class="combos-left">${combos} combinations remaining.</span>
				</div>
				<div class="odds-percent col-xs-12 col-md-6">
					${winningPercentage}%
				</div>	
			</li>
		`;

		ul.innerHTML += row;
	});

	document.getElementById('odds').appendChild(ul);

	return true;
}


//http://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/
//http://stackoverflow.com/questions/5752002/find-all-possible-subset-combos-in-an-array

//UNDERSTAND WHAT IS HAPPENING HERE
function getLotteryCombos(totalBalls, ballsPerCombo) {

	var makeCombos =  (ballsPerCombo, totalBalls, tmp, combos) => {
	    if (ballsPerCombo == 0) {
	        if (tmp.length > 0) {
	            combos[combos.length] = tmp;
	        }
	        return;
	    }

	    for (var j = 0; j < totalBalls.length; j++) {
	        makeCombos(ballsPerCombo - 1, totalBalls.slice(j + 1), tmp.concat([totalBalls[j]]), combos);
	    }
	    return;
	}

    let combos = [],
    	tmp = [];

    makeCombos(ballsPerCombo, totalBalls, tmp, combos);

    return combos;
}


function shuffleArray(array) {
	for(let i = array.length - 1; i > 0; i--){
	    let j = Math.floor(Math.random() * (i + 1));
	    let temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
}


function updateOdds(){
	calculateOdds();
	makeHTML();

	return true;
}


function calculateOdds() {

	settings.teams.forEach((team) => {
		team.winningPercentage = (team.combosLeft / settings.lottery.combosRemaining * 100).toFixed(1);
	});

	return true;
}