/*	
	IMPORTS
*/
import "../styles/site.scss";
import Odds from "./odds.js";
import Balls from "./balls.js";

/*	
	SETTINGS
*/
const 	Title = "OTHL Draft Lottery",
		Desc = "Lottery description";
let 	ballsDrawnCount = 0,
		ballsDrawn = [],
		ballMin = 1,
		ballMax = 14;


/*	
	SET UP
*/
Odds.setUpOdds(Balls.setRange(ballMin, ballMax));
Odds.setUpHTML();




/*	
	HANDLERS
*/
document.getElementById("start-btn").addEventListener("click", () => {
	ballsDrawnCount++;
	let lotteryDraw =  Balls.drawBall();
	Odds.update(lotteryDraw)
});

document.getElementById("reset-btn").addEventListener("click", () => {
	ballsDrawnCount = 0;
	Balls.reset();
});