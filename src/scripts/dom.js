module.exports = exports = {};


exports.setupOddsChart = (teams) => {
	
	document.getElementById('odds').innerHTML = "";
	let ul = document.createElement('ul');

	teams.forEach((team) => {
		let name = team.name,
			combos = team.combos,
			winningPercentage = team.winningPct;

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