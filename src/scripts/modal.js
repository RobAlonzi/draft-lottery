import HTMLCreate from "./dom.js";

module.exports = exports = {};

const modal = document.getElementsByClassName('modal')[0],
	  modalContent = modal.children[0];

exports.create = (team) => {
	let div = document.createElement('div'),
		listDiv = document.createElement('div'),
		winningComboList = document.createElement('ul'),
		losingComboList = document.createElement('ul');

	div.className = "modal-team-overview row";
	listDiv.className = "modal-team-lists row";

	div.innerHTML = `
					<div class="col-xs-12 col-md-6 col-md-offset-3 text-xs-center">
						<span class="modal-team-name">${team.name}</span>
						<span class="modal-team-combos">Original Combos: ${team.originalStats.combos} (${team.originalStats.pct}%)</span>
					</div>
	`;

	
	team.winningCombos.forEach((combo) => {
		let HTMLCombo = "";
		combo.forEach((ball) => {
			HTMLCombo += HTMLCreate.createLotteryBall(ball, true);
		});
		let li = `<li>${HTMLCombo}</li>`;
		winningComboList.innerHTML += li;
	});


	team.losingCombos.forEach((combo) => {
		let HTMLCombo = "";
		combo.forEach((ball) => {
			HTMLCombo += HTMLCreate.createLotteryBall(ball, true);
		});
		let li = `<li>${HTMLCombo}</li>`;
		losingComboList.innerHTML += li;
	});

	listDiv.innerHTML = `
			<div class="col-xs-12 col-md-6">${winningComboList.outerHTML}</div>
			<div class="col-xs-12 col-md-6 losing-list">${winningComboList.outerHTML}</div>	
	`;


	
	modalContent.appendChild(div);
	modalContent.appendChild(listDiv);
	modal.style.display = "block";
}


document.getElementsByClassName("modal")[0].addEventListener("click", () => {
	modalContent.removeChild(modalContent.childNodes[1]);
	modalContent.removeChild(modalContent.childNodes[1]);  
	modal.style.display = "none";
});