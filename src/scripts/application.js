/*	
	IMPORTS
*/
import "../styles/site.scss";
import {settings} from "./settings.js";
import Odds from "./odds.js";
import Balls from "./balls.js";


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
	console.log(settings.teams);
});

document.getElementById("reset-btn").addEventListener("click", () => {
	settings.lottery.ballsDrawnCount = 0;
	Balls.reset();
});