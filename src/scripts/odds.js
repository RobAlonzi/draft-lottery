import Defaults from "./settings.js";

module.exports = exports = {};

exports.setUpHTML = (teams = Defaults.teams) => {
	let ul = document.createElement('ul');

	teams.forEach((team) => {
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
}