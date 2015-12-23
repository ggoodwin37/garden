// helper that returns one value from a probability map
// example map:
// { outcomes: ['out1', 'out2', 'out3'],
//   probabilities: [0.2, 0.7]
// val is on [0, 1) and would usually just be passed as Math.random()
function probMap(map, val) {
	if (!map.outcomes || !map.probabilities) {
		console.log('bad params.');
		return null;
	}
	if (map.outcomes.length !== map.probabilities.length + 1) {
		console.log('pass one less probability than outcome. think about it.');
		return null;
	}
	var i = 0;
	while (val >= map.probabilities[i] && i < map.outcomes.length - 1) {
		++i;
	}
	return map.outcomes[i];
}

module.exports = probMap;
