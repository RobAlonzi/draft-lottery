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
	title: "WCFHL Draft Lottery",
	description: "Lottery Description",
	lottery: {
		rounds: 3,
		ballsDrawnPerRound: 4,
		ballMin: 1,
		ballMax: 14,
		ballsDrawn: []
	},
	teams: [
	{
		name: "San Jose Sharks",
		combos: 200,
		originalStats: {
			pick: 1,
			combos: 200,
			pct: 20
		}
	},{
		name: "Carolina Hurricanes",
		combos: 135,
		originalStats: {
			pick: 2,
			combos: 135,
			pct: 13.5
		}
	},{
		name: "Florida Panthers",
		combos: 115,
		originalStats: {
			pick: 3,
			combos: 115,
			pct: 11.5
		}
	},{
		name: "Montreal Canadiens",
		combos: 95,
		originalStats: {
			pick: 4,
			combos: 95,
			pct: 9.5
		}
	},{
		name: "Nashville Predators",
		combos: 85,
		originalStats: {
			pick: 5,
			combos: 85,
			pct: 8.5
		}
	},{
		name: "New York Rangers",
		combos: 75,
		originalStats: {
			pick: 6,
			combos: 75,
			pct: 7.5
		}
	},{
		name: "Pittsburgh Penguins",
		combos: 65,
		originalStats: {
			pick: 7,
			combos: 65,
			pct: 6.5
		}
	},{
		name: "New Jersey Devils",
		combos: 60,
		originalStats: {
			pick: 8,
			combos: 60,
			pct: 6
		}
	},{
		name: "Detroit Red Wings",
		combos: 50,
		originalStats: {
			pick: 9,
			combos: 50,
			pct: 5
		}
	},{
		name: "Minnesota Wild",
		combos: 35,
		originalStats: {
			pick: 10,
			combos: 35,
			pct: 3.5
		}
	},{
		name: "Toronto Maple Leafs",
		combos: 30,
		originalStats: {
			pick: 11,
			combos: 30,
			pct: 3
		}
	},{
		name: "Chicago Blackhawks",
		combos: 25,
		originalStats: {
			pick: 12,
			combos: 25,
			pct: 2.5
		}
	},{
		name: "Winnipeg Jets",
		combos: 20,
		originalStats: {
			pick: 13,
			combos: 20,
			pct: 2
		}
	},{
		name: "Vancouver Canucks",
		combos: 10,
		originalStats: {
			pick: 14,
			combos: 10,
			pct: 1
		}
	}
	]
};