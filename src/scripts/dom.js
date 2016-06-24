module.exports = exports = {};


exports.setupOddsChart = (teams, ballsDrawn) => {
	let showExtraColumns = false;

	if(document.getElementsByTagName("table")[0]){
		document.getElementsByTagName("table")[0].parentElement.removeChild(document.getElementsByTagName("table")[0]);
	}

	if(ballsDrawn > 0)
		showExtraColumns = true;


	let table = document.createElement('table'),
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody');

	table.className = "table table-striped table-hover";

	let row = `<th>#</th>
			   <th>Team</th>
			   <th>Combos Remaining</th>`;

	if(showExtraColumns){
		row += `<th>Change from Original</th>`;
	}		   
	
	row += `<td>&nbsp;</td>`;		  

	thead.innerHTML = `<tr>${row}</tr>`;
	table.appendChild(thead);


	teams.forEach((team, i) => {

		let iconHTML = '',
			winsWith = '';

		if(showExtraColumns){
			let change = team.odds.change > 0 ? 'up' : 'down';
			iconHTML = `<td class="change-${change}"><i class="ion-arrow-${change}-a" aria-hidden="true"></i> ${team.odds.change}%</td>`;
		}

		if(team.winsWith && ballsDrawn === 3)
			winsWith = `<p> Wins with: ${team.winsWith} </p>`;


		let detailsBtn = document.createElement('button');
		detailsBtn.className = "btn btn-info-outline details-btn";
		detailsBtn.innerHTML = "View Details";

		//let teamValue = document.createAttribute("team").value = team;
		detailsBtn.setAttribute("team", i); 


		let row = `
		<th scope="row">${i+1}</th>
		<td>${team.name}</td>
		<td>${team.combos} (${team.odds.percent}% chance) ${winsWith}</td>
		${iconHTML} 
		<td>${detailsBtn.outerHTML}</td>`;


		let tblRow = document.createElement('tr');

		if(team.combos === 0){
			tblRow.className = 'no-chance';
		}

		tblRow.innerHTML = row;

		tbody.appendChild(tblRow);
		table.appendChild(tbody);

	});

	document.getElementById('odds').appendChild(table);

	return true;
};



exports.createLotteryBall = (number, returnToCaller) => {

	let numberSpan = document.createElement('span'),
	ballDiv = document.createElement('div'),
	containerDiv = document.createElement('div');

	numberSpan.textContent = number;
	ballDiv.className = "ball";
	containerDiv.className = "col-xs-12 col-md-6 col-lg-3";

	ballDiv.appendChild(numberSpan);
	containerDiv.appendChild(ballDiv);


	if(!returnToCaller){
		document.getElementById('lottery-balls').appendChild(containerDiv);
		return true;
	}
	
	return containerDiv.innerHTML;


}


exports.showWinner = (round, team, ballsDrawn) => {
	let div = document.createElement('div'),
		container = document.getElementById('winner-list'),
		winningBalls = '';

	ballsDrawn.forEach((ball) => {
		winningBalls += exports.createLotteryBall(ball, true);
	});

	div.className = `winning-team`;
	div.innerHTML = `<h2>Pick #${round}</h2>
	<span>${team.name}</span>
	<div class="winning-balls">${winningBalls}</div>`;

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

	table.className = "table table-striped table-hover";

	let row = `<th>Pick #</th>
			   <th>Team</th>
			   <th>Change</th>`;
			  

	thead.innerHTML = `<tr>${row}</tr>`;

	table.appendChild(thead);

	teams.forEach((team, i) => {
		let change = team.placeChange > 0 ? 'up' : 'down';
			change = team.placeChange === 0 ? 'none' : change;
		let icon = '';

		if(change !== 'none')
			icon = `<i class="ion-arrow-${change}-a" aria-hidden="true"></i>`;
			
		let row = `
				<th scope="row">${i+pickStart}</th>
				<td>${team.name}</td>
				<td class="change-${change}">${icon} ${team.placeChange}</td>`;


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


