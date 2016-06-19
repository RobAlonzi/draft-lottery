module.exports = exports = {};


exports.getDefaults = () => {
	return JSON.parse(JSON.stringify(Defaults));
}

exports.setLottery = (lottery) => {
	Defaults.lottery = JSON.parse(JSON.stringify(lottery));
	return true;
}

exports.getLottery = () => {
	return JSON.parse(JSON.stringify(Defaults.lottery));
}


exports.setCombos = (teams) => {
	Defaults.teams = JSON.parse(JSON.stringify(teams));
	return true;
}

exports.getCombos = () => {
	return JSON.parse(JSON.stringify(Defaults.teams));
}

let Defaults  = {
	title: "OTHL Draft Lottery",
	description: "Lottery Description",
	lottery: {
		ballsDrawnPerRound: 4,
		ballMin: 1,
		ballMax: 14,
		ballsDrawn: []
	},
	teams: [
	{
		name: "Toronto Maple Leafs",
		combos: 200,
	},{
		name: "Edmonton Oilers",
		combos: 135,
	},{
		name: "Vancouver Canucks",
		combos: 115,
	},{
		name: "Columbus Blue Jackets",
		combos: 95,
	},{
		name: "Calgary Flames",
		combos: 85,
	},{
		name: "Winnipeg Jets",
		combos: 75,
	},{
		name: "Arizona Coyotes",
		combos: 65,
	},{
		name: "Buffalo Sabres",
		combos: 60,
	},{
		name: "Montreal Canadiens",
		combos: 50,
	},{
		name: "New Jersey Devils",
		combos: 35,
	},{
		name: "Colorado Avalanche",
		combos: 30,
	},{
		name: "Ottawa Senators",
		combos: 25,
	},{
		name: "Carolina Hurricanes",
		combos: 20,
	},{
		name: "Boston Bruins",
		combos: 10,
	}
	]
};