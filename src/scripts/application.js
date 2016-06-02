import "../styles/site.scss";
import Defaults from "./settings.js";
import Odds from "./odds.js";
import Balls from "./balls.js";

Odds.setUpHTML();

Balls.createBall(1);
Balls.createBall(2);
Balls.createBall(13);
Balls.createBall(14);
