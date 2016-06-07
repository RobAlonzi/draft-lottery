module.exports = exports = {};

let ballMin = 1,
	ballMax = 14,
	ballsLoaded = [],
	ballsDrawn = [],
	ballsRemaining = [];

exports.setRange = (min = ballMin, max = ballMax) => {
	ballMin = min;
	ballMax = max;

	for(let i = min; i <= max; i++){
		ballsLoaded.push(i);
	}

	ballsRemaining = ballsLoaded.slice();
	
	return ballsLoaded;
};	


exports.drawBall = () => {
	let indexDrawn = Math.floor(Math.random() * ballsRemaining.length);
	let ballChosen = ballsRemaining[indexDrawn];
	ballsDrawn.push(ballsRemaining.splice(indexDrawn, 1)[0]);
	createBall(ballChosen);

	return {
			ballDrawn: ballChosen,
			drawn: ballsDrawn,
			remaining: ballsRemaining
		};
};

exports.reset = () => {
	ballsDrawn = [],
	ballsRemaining = ballsLoaded.slice();
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