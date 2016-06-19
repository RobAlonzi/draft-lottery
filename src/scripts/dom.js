module.exports = exports = {};


exports.setupOddsChart = (teams, ballsDrawn) => {

	if(document.getElementsByTagName("table")[0]){
		document.getElementsByTagName("table")[0].parentElement.removeChild(document.getElementsByTagName("table")[0]);
	}


	let table = document.createElement('table'),
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody');

	table.className = "table";

	let row = `<th>#</th>
			   <th>Team</th>
			   <th>Combos Remaining</th>`;
			  

	thead.innerHTML = `<tr>${row}</tr>`;

	table.appendChild(thead);

	teams.forEach((team, i) => {
		let name = team.name,
			combos = team.combos,
			winningPercentage = team.odds.percent,
			winningPctChange = team.odds.change,
			oldWinningPcts = '';

		let iconHTML = '',
			winsWith = '';

		if(ballsDrawn > 0){
			let icon = winningPctChange > 0 ? 'up' : 'down';
			iconHTML = `<i class="ion-arrow-${icon}-b" aria-hidden="true"></i>`;
		}

		if(team.winsWith && ballsDrawn === 3)
			winsWith = `<p> Wins with: ${team.winsWith} </p>`;

		
		let row = `
				<th scope="row">${i+1}</th>
				<td>${name}</td>
				<td>${combos} (${winningPercentage}% chance) ${iconHTML} ${winsWith}</td>`;


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
		container = document.getElementById('winner-list');

	div.className = "col-xs-12 col-lg-4";
	div.innerHTML = `<h2>Pick #${round}</h2>
	<span>${team.name}</span>`;

	container.appendChild(div);

	return true;
}

exports.createAlert = (message) => {
	let container = document.getElementsByClassName('container')[0],
		div = document.createElement('div');
	div.id = "alert-box";
	div.className = "alert alert-danger";
	div.setAttribute("role", "alert");
	div.innerHTML = message;


	container.insertBefore(div, container.firstChild);

	return true;

}

exports.showFinalOrder = (teams, pickStart) => {
	document.getElementById('odds').innerHTML = "";

	let table = document.createElement('table'),
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody');

	table.className = "table";

	let row = `<th>Pick #</th>
			   <th>Team</th>
			   <th>Change</th>`;
			  

	thead.innerHTML = `<tr>${row}</tr>`;

	table.appendChild(thead);

	teams.forEach((team, i) => {

		let row = `
				<th scope="row">${i+pickStart}</th>
				<td>${team.name}</td>
				<td>${team.placeChange}</td>`;


		tbody.innerHTML += document.createElement('tr').innerHTML = row;
		table.appendChild(tbody);
	});

	document.getElementById('odds').appendChild(table);
	return true;

}

exports.reset = (newRound) => {
	document.getElementById('lottery-balls').innerHTML = "";
 	
	if(document.getElementById("alert-box")){
		document.getElementById("alert-box").parentElement.removeChild(document.getElementById("alert-box"));
	}


	if(document.getElementById('winner-list') && newRound !== true){
		document.getElementById('winner-list').innerHTML = "";
	}


	return true;
}