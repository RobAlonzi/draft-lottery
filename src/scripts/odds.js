let _teams = [
	{
		name: "Toronto Maple Leafs",
		combos: 200
	},
	{
		name: "Edmonton Oilers",
		combos: 135
	},
	{
		name: "Vancouver Canucks",
		combos: 115
	},
	{
		name: "Columbus Blue Jackets",
		combos: 95
	},
	{
		name: "Calgary Flames",
		combos: 85
	},
	{
		name: "Winnipeg Jets",
		combos: 75
	},
	{
		name: "Arizona Coyotes",
		combos: 65
	},
	{
		name: "Buffalo Sabres",
		combos: 60
	},
	{
		name: "Montreal Canadiens",
		combos: 50
	},
	{
		name: "New Jersey Devils",
		combos: 35
	},
	{
		name: "Colorado Avalanche",
		combos: 30
	},
	{
		name: "Ottawa Senators",
		combos: 25
	},
	{
		name: "Carolina Hurricanes",
		combos: 20
	},
	{
		name: "Boston Bruins",
		combos: 10
	},
	];



module.exports = exports = {};

exports.setUpHTML = (teams = _teams) => {
	let ul = document.createElement('ul');

	teams.forEach((team) => {
		let name = team.name,
			combos = team.combos;

		let li = document.createElement('li'),
			spanName = document.createElement('span'),
			spanCombos = document.createElement('span');

		li.className = "col-xs-12 col-md-6 col-lg-3";
		spanName.className = "lottery-team";
		spanCombos.className = "remaining-odds";

		spanName.textContent = name;
		spanCombos.textContent = `${combos} combinations remaining.`;

		li.appendChild(spanName);
		li.appendChild(spanCombos);
		ul.appendChild(li);
	});

	document.getElementById('odds').appendChild(ul);

	return true;
}

exports.update = (lotteryDraw) => {
	console.log(lotteryDraw.drawn);
	console.log(lotteryDraw.remaining);
}


exports.setUpOdds = (range) => {
	let allCombos = getLotteryCombos(range, 1);

	console.log(allCombos); 
}



//http://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/
//http://stackoverflow.com/questions/5752002/find-all-possible-subset-combos-in-an-array

//UNDERSTAND WHAT IS HAPPENING HERE
function getLotteryCombos(totalBalls, ballsPerCombo) {

	var makeCombos =  (ballsPerCombo, totalBalls, tmp, combos) => {
		console.log(ballsPerCombo);

	    if (ballsPerCombo == 0) {
	        if (tmp.length > 0) {
	            combos[combos.length] = tmp;
	        }
	        return;
	    }

	    for (var j = 0; j < totalBalls.length; j++) {
	        makeCombos(ballsPerCombo - 1, totalBalls.slice(j + 1), tmp.concat([totalBalls[j]]), combos);
	    }
	    return;
	}

    let combos = [],
    	tmp = [];

    makeCombos(ballsPerCombo, totalBalls, tmp, combos);

    return combos;
}



//FOR LEARNING
// function getLotteryCombos(totalBalls, ballsPerCombo) {

// 	var makeCombos =  (ballsPerCombo, totalBalls, tmp, combos) => {
// 		//if(ballsPerCombo === 0) console.log(ballsPerCombo);
// 		if(ballsPerCombo === 0) console.log(tmp.length);

// 	    if (ballsPerCombo == 0) {
// 	        if (tmp.length > 0) {
// 	            combos[combos.length] = tmp;
// 	        }
// 	        return;
// 	    }

// 	    for (var j = 0; j < totalBalls.length; j++) {
// 	        makeCombos(ballsPerCombo - 1, totalBalls.slice(j + 1), tmp.concat([totalBalls[j]]), combos);
// 	    }
// 	    return;
// 	}

//     let combos = [],
//     	tmp = [];

//     makeCombos(4, totalBalls, tmp, combos);

//     return combos;
// }






// var combine = function(a, min) {

//     var fn = function(n, src, got, all) {
//         if (n == 0) {
//             if (got.length > 0) {
//                 all[all.length] = got;
//             }
//             return;
//         }
//         for (var j = 0; j < src.length; j++) {
//             fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
//         }
//         return;
//     }


//     var all = [];
//     for (var i = min; i < a.length; i++) {
//         fn(i, a, [], all);
//     }
//     all.push(a);
//     return all;
// }