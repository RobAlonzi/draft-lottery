/*	
	IMPORTS
*/
import "../styles/site.scss";
import {settings} from "./settings.js";
import Odds from "./odds.js";
import Balls from "./balls.js";

let round = 1;


/*	
	SET UP
*/
Balls.setRange();
Odds.setUpOdds();
Odds.setUpHTML();


/*	
	HANDLERS
*/
document.getElementById("start-btn").addEventListener("click", () => {
	settings.lottery.ballsDrawnCount++;
	Balls.drawBall();
	Odds.update();

	if(settings.lottery.ballsDrawnCount === 4){
		showWinner();
		round++;
		Odds.startNewRound();

	}
});

document.getElementById("reset-btn").addEventListener("click", () => {
	settings.lottery.ballsDrawnCount = 0;
	Odds.reset();
	Balls.reset();
});

function showWinner() {
	for(let team of settings.teams){
		if(team.combosLeft > 0){
			let div = document.createElement('div'),
				odds = document.getElementById('odds'),
				container = document.getElementsByClassName('container')[0];

			console.log(container);	

			div.className = "row";
			div.innerHTML = `<div class="col-xs-12 col-lg-3">
						<h2>Pick #${round}</h2>
						<span>${team.name}</span>
					</div>`;


			container.insertBefore(div, odds);
			break;
		}
	}
}