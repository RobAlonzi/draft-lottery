module.exports = exports = {};


exports.setupOddsChart = (teams, ballsDrawn) => {
	
	document.getElementById('odds').innerHTML = "";
	let table = document.createElement('table'),
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody');

	table.className = "table";

	let row = `<th>#</th>
			   <th>Team</th>
			   <th>Combos Remaining</th>`;
			   

	if(ballsDrawn > 0){
		let NewRow = `<th>Original Odds</th>`;
		row += NewRow;
	}

	thead.innerHTML = `<tr>${row}</tr>`;

	table.appendChild(thead);

	teams.forEach((team, i) => {
		let name = team.name,
			combos = team.combos,
			winningPercentage = team.winningPct.percent,
			winningPctChange = team.winningPct.change,
			oldWinningPcts = '';

		// if(team.oldWinningPct){
		// 	team.oldWinningPct.forEach((pct) => {

		// 		let icon = pct.change > 0 ? 'up' : 'down';
		// 		oldWinningPcts += `<td>${pct.combos} (<i class="ion-arrow-${icon}-b" aria-hidden="true"></i> ${pct.percent}% chance) </td>`;
		// 	});
		// }

		let iconHTML = '';

		if(ballsDrawn > 0){
			let icon = winningPctChange > 0 ? 'up' : 'down';
			iconHTML = `<i class="ion-arrow-${icon}-b" aria-hidden="true"></i>`;
		}

		
		let row = `
				<th scope="row">${i+1}</th>
				<td>${name}</td>
				<td>${combos} (${winningPercentage}% chance) ${iconHTML}</td>`;

		if(ballsDrawn > 0){
			let originalCombos = team.originalWinPct.combos,
				orignalWinningPercentage = team.originalWinPct.percent,
				NewRow = `<td>${originalCombos} (${orignalWinningPercentage}% chance) </td>`;
			row += NewRow;
		}



		tbody.innerHTML += document.createElement('tr').innerHTML = row;
		table.appendChild(tbody);

	});

	document.getElementById('odds').appendChild(table);
	return true;
};



exports.createLotteryBall = (number) => {

	let numberSpan = document.createElement('span'),
	ballDiv = document.createElement('div'),
	containerDiv = document.createElement('div');

	numberSpan.textContent = number;
	ballDiv.className = "ball";
	containerDiv.className = "col-xs-12 col-md-6 col-lg-3";

	ballDiv.appendChild(numberSpan);
	containerDiv.appendChild(ballDiv);

	document.getElementById('lottery-balls').appendChild(containerDiv);

	return true;

}



exports.showWinner = (round, team) => {
	let div = document.createElement('div'),
		odds = document.getElementById('odds'),
		container = document.getElementsByClassName('container')[0];

	div.className = "row winner";
	div.innerHTML = `<div class="col-xs-12 col-lg-3">
	<h2>Pick #${round}</h2>
	<span>${team.name}</span>
	</div>`;

	container.insertBefore(div, odds);

	return true;
}

exports.reset = () => {
	document.getElementById('lottery-balls').innerHTML = "";
	document.getElementsByClassName('winner')[0].innerHTML = "";

	return true;
}