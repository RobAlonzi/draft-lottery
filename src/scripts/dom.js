module.exports = exports = {};

exports.setupOddsChart = (teams, ballsDrawn) => {
	//if a ball has been pulled we need to show extra columns
	let showExtraColumns = ballsDrawn > 0 ? true : false;
	//remove the old odds table
	removeOddsTable();

	//create the table element for odds chart
	let table = document.createElement('table'),
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody'),
		tr = document.createElement('tr');


	table.className = "table table-striped table-hover";
	tr.innerHTML = '<th>#</th><th>Team</th><th>Combos Remaining</th>';
	tr.innerHTML += showExtraColumns ? '<th>Change from Original</th>' : '';
	tr.innerHTML += '<td>&nbsp;</td>';

	thead.appendChild(tr);
	table.appendChild(thead);


	teams.forEach((team, i) => {
		tbody.appendChild(buildOddsRow(team, showExtraColumns, ballsDrawn, i));
	});

	table.appendChild(tbody);
	document.getElementById('odds').appendChild(table);

	return true;
};



exports.createLotteryBall = (number, returnToCaller) => {
	let ball = createLotteryBall(number);
	document.getElementById('lottery-balls').appendChild(ball);
}



exports.showWinner = (round, team, ballsDrawn) => {
	let div = document.createElement('div'),
		container = document.getElementById('winner-list'),
		winningBalls = '';

	div.className = `winning-team`;	

	ballsDrawn.forEach((ball) => {
		var ball  = createLotteryBall(ball);
		winningBalls += ball.outerHTML;
	});

	let position = team.originalStats.pick - round;
	let change = (position === 0) ? 'none' : (position > 0) ? 'up' : 'down';
	let icon = '';


	if(change !== 'none')
		icon = `
			<span class="change-${change}">
				(<i class="ion-arrow-${change}-a" aria-hidden="true"></i> 
				${Math.abs(position)})
			</span>
		`;

	
	div.innerHTML = `
		<h2>Pick #${round}</h2>
		<p>${team.name} ${icon}</p>
		${winningBalls}
	`;

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
				<td class="change-${change}">${icon} ${Math.abs(team.placeChange)}</td>`;


		tbody.innerHTML += document.createElement('tr').innerHTML = row;
		table.appendChild(tbody);
	});

	document.getElementById('odds').appendChild(table);
	return true;

}


exports.showTeamDetails = (team) => {
	let teamName = team.name,
		originalOdds = team.originalStats.pct,
		originalCombos = team.originalStats.combos,
		winningCombos = team.winningCombos,
		losingCombos = team.losingCombos,
		currentOdds = team.odds.percent,
		changeInOdds = parseInt(team.odds.change),
		changeUpDown = (changeInOdds === 0) ? 'none' : (changeInOdds > 0) ? 'up' : 'down',
		icon = '';

	if(changeUpDown !== 'none'){
		icon = ` (<i class="ion-arrow-${changeUpDown}-a" aria-hidden="true"></i> ${changeInOdds}%)`;
	}	

	let headerDiv = `
		<div class="modal-header">
			<h2>${teamName}</h2>
			<p>Current Winning Combos: ${winningCombos.length} [${currentOdds}%${icon}]</p>
			<p>Original Winning Combos: ${originalCombos} [${originalOdds}%]</p>
		</div>
	`;

	let winningComboContainer = document.createElement('div');
	winningComboContainer.className = 'combo-container';
	winningComboContainer.innerHTML = '<h3>Winning Combos</h3>';

	winningCombos.forEach((combo) => {
		let winningBalls = '';
		combo.forEach((ball) => {
			var ball  = createLotteryBall(ball);
			winningBalls += ball.outerHTML;
		});

		winningComboContainer.innerHTML += `<div class="combo-row"> ${winningBalls} </div>`;
	});


	let losingComboContainer = document.createElement('div');
	losingComboContainer.className = 'combo-container right';
	losingComboContainer.innerHTML = '<h3>Losing Combos</h3>';

	losingCombos.forEach((combo) => {
		let losingBalls = '';
		combo.forEach((ball) => {
			var ball  = createLotteryBall(ball);
			losingBalls += ball.outerHTML;
		});

		losingComboContainer.innerHTML += `<div class="combo-row"> ${losingBalls} </div>`;
	});

	let fullHTML = `${headerDiv} ${winningComboContainer.outerHTML} ${losingComboContainer.outerHTML}`;


	createModal(fullHTML);
	console.log(team);
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





function buildOddsRow(team, showExtraColumns, ballsDrawn, i){
	let tr = document.createElement('tr'),
		iconHTML = '',
		winsWith = '';

	if(team.combos === 0)
		tr.className = 'no-chance';


	if(showExtraColumns){
		let change = team.odds.change > 0 ? 'up' : 'down';
		iconHTML = 
		`<td class="change-${change}">
			<i class="ion-arrow-${change}-a" aria-hidden="true"></i> 
			${Math.abs(team.odds.change)}%
		</td>`;
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
			<td>${detailsBtn.outerHTML}</td> 
		`;

	tr.innerHTML = row;

	return tr;	

}


function createLotteryBall(number) {
	let numberSpan = document.createElement('span'),
	ballDiv = document.createElement('div'),
	containerDiv = document.createElement('div');


	numberSpan.textContent = number;
	ballDiv.className = "ball";
	containerDiv.className = "col-xs-12 col-md-6 col-lg-3";

	ballDiv.appendChild(numberSpan);
	containerDiv.appendChild(ballDiv);

	return containerDiv;
}


function removeOddsTable(){
	const table = document.getElementsByTagName("table")[0];

	if(table){
		table.parentElement.removeChild(table);
	}

	return;
}



function createModal(content){
	let modalDiv = document.createElement('div'),
		modalContent = document.createElement('div');

	modalDiv.className = "modal-bg";
	modalDiv.id = "modal-bg";
	modalContent.className = "modal-content";

	modalContent.innerHTML = content;

	modalDiv.appendChild(modalContent);
	document.body.appendChild(modalDiv);
	document.body.classList.add("modal-open");
	

	document.getElementById("modal-bg").onclick = function(e) {
		if (e.target !== this)
    		return;

    	destroyModal();
	};
}

function destroyModal(){
	let modal = document.getElementById("modal-bg");
	modal.parentElement.removeChild(modal);
	document.body.classList.remove("modal-open");	
}