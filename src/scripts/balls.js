module.exports = exports = {};

exports.createBall = (number) => {
	let numberSpan = document.createElement('span'),
		ballDiv = document.createElement('div'),
		containerDiv = document.createElement('div');

	numberSpan.textContent = number;
	ballDiv.className = "ball";
	containerDiv.className = "col-xs-12 col-md-6 col-lg-3";

	ballDiv.appendChild(numberSpan);
	containerDiv.appendChild(ballDiv);

	document.getElementById('lottery-balls').appendChild(containerDiv);
}