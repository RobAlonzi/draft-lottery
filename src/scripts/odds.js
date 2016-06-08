import {settings} from "./settings.js";


module.exports = exports = {};

exports.setUpHTML = makeHTML;

exports.update = () => {
	settings.teams.forEach((team) => {
		let tmpWinningCombos = [];
		for(let i = 0; i < team.winningCombos.length; i++){
			if(team.winningCombos[i].indexOf(settings.lottery.ballPicked) === -1){
				team.losingCombos.push(team.winningCombos[i]);
			}else{
				tmpWinningCombos.push(team.winningCombos[i]);
			}
		}

		team.winningCombos = tmpWinningCombos;
		team.combos = team.winningCombos.length;
	});

	updateOdds();
}


exports.setUpOdds = () => {
	let allCombos = getLotteryCombos(settings.lottery.ballsLoaded, 4);
	allCombos = shuffleArray(allCombos);

	settings.teams.forEach((team) => {
		team.winningCombos = [];

		for(let i = 0; i < team.combos; i++){
			team.winningCombos.push(allCombos[i]);
		}
		allCombos.splice(0, team.combos);
	});

	//Leftover combos become redraw
	settings.teams.push({
		name: "Redraw",
		combos: allCombos.length,
		winningCombos: allCombos,
		losingCombos: []
	});
}


function makeHTML() {
	document.getElementById('odds').innerHTML = "";
	let ul = document.createElement('ul');

	settings.teams.forEach((team) => {
		let name = team.name,
			combos = team.combos;

		let li = document.createElement('li'),
			spanName = document.createElement('span'),
			spanCombos = document.createElement('span');

		li.className = "col-xs-12 col-md-6 col-lg-3";
		spanName.className = "lottery-team";
		spanCombos.className = "remaining-odds";

		spanName.textContent = name;
		spanCombos.textContent = `${combos} combinations remaining.`;

		li.appendChild(spanName);
		li.appendChild(spanCombos);
		ul.appendChild(li);
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
	for (let i = array.length - 1; i > 0; i--) {
	    let j = Math.floor(Math.random() * (i + 1));
	    let temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
}


function updateOdds(){
	makeHTML();
}
