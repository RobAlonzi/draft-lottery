import {settings} from "./settings.js";

module.exports = exports = {};

exports.setRange = () => {
	for(let i = settings.lottery.ballMin; i <= settings.lottery.ballMax; i++){
		settings.lottery.ballsLoaded.push(i);
	}

	settings.lottery.ballsRemaining = settings.lottery.ballsLoaded.slice();
	
	return true;
};	


exports.drawBall = () => {
	let indexDrawn = Math.floor(Math.random() * settings.lottery.ballsRemaining.length);
	let ballChosen = settings.lottery.ballsRemaining[indexDrawn];
	settings.lottery.ballsDrawn.push(settings.lottery.ballsRemaining.splice(indexDrawn, 1)[0]);
	settings.lottery.ballPicked = ballChosen;
	createBall(ballChosen);

	return true;
};

exports.reset = () => {
	settings.lottery.ballsDrawn = [],
	settings.lottery.ballsRemaining = settings.lottery.ballsLoaded.slice();
	document.getElementById('lottery-balls').innerHTML = "";
}



function createBall(number) {
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