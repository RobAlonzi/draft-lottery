module.exports = exports = {};


exports.setupOddsChart = (teams, ballsDrawn) => {

	console.log(ballsDrawn);
	
	document.getElementById('odds').innerHTML = "";
	let table = document.createElement('table'),
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody');

	table.className = "table";

	let row = `<th>#</th>
			   <th>Team</th>
			   <th>Combos Remaining</th>`;

	for(let i = (ballsDrawn - 1); i > 0; i--){
		let NewRow = `<th>After ${i} Balls</th>`;
		row += NewRow;
	}				   

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
			oldWinningPcts = '';

		if(team.oldWinningPct){
			team.oldWinningPct.forEach((pct) => {

				let icon = pct.change > 0 ? 'up' : 'down';
				oldWinningPcts += `<td>${pct.combos} (${pct.percent}% chance) </td>`;
			});
		}



		let row = `
			<tr>
				<th scope="row">${i+1}</th>
				<td>${name}</td>
				<td>${combos} (${winningPercentage}% chance) </td>
				${oldWinningPcts}
			</tr>
		`;

		tbody.innerHTML += row;
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

	div.className = "row";
	div.innerHTML = `<div class="col-xs-12 col-lg-3">
	<h2>Pick #${round}</h2>
	<span>${team.name}</span>
	</div>`;

	container.insertBefore(div, odds);

	return true;
}