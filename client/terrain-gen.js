var constants = require('./constants');
var ChunkyTaskList = require('./chunky-task-list');

// return smallest integer of form (2^n + 1) that is greater than or equal to x
function getNextBinarySize(x) {
	var n = 0;
	while (Math.pow(2, n) + 1 < x) {
		n++;
	}
	return Math.pow(2, n) + 1;
}

function make2dArray(width, height) {
	var result = [], row;
	while (result.length < width) {
		row = [];
		while (row.length < height) {
			row.push(null);
		}
		result.push(row);
	}
	return result;
}

function avgVal(values) {
	if (!values || !values.length) return 0;
	return values.reduce(function(prev, cur) { return prev + cur; }, 0) / values.length;
}

function calcTargetVal(values, dim, max) {
	// random offset is scaled by our current resolution
	var factor = constants.terrainSmoothing * dim / max;
	var randomOffset = (2 * Math.random() * factor) - (factor);
	return Math.max(Math.min(1, avgVal(values) + randomOffset), 0);
}

function getDelta(dim) {
	return Math.floor(dim / 2);
}

function diamond(map, xOffs, yOffs, dim) {
	var values = [];
	var delta = getDelta(dim);
	var xMin = xOffs, xMid = xOffs + delta, xMax = xOffs + dim - 1,
		yMin = yOffs, yMid = yOffs + delta, yMax = yOffs + dim - 1;
	values.push(map[xMin][yMin]);
	values.push(map[xMax][yMin]);
	values.push(map[xMin][yMax]);
	values.push(map[xMax][yMax]);
	map[xMid][yMid] = calcTargetVal(values, dim, map.length);
}

function squareNorth(map, xOffs, yOffs, dim) {
	var values = [];
	var delta = getDelta(dim);
	var xLeft = xOffs, xMid = xOffs + delta, xRight = xOffs + dim - 1,
		yTop = yOffs - delta, yMid = yOffs, yBottom = yOffs + delta;
	values.push(map[xLeft][yMid]);
	values.push(map[xRight][yMid]);
	values.push(map[xMid][yBottom]);
	if (yTop >= 0) {
		values.push(map[xMid][yTop]);
	}
	map[xMid][yMid] = calcTargetVal(values, dim, map.length);
}

function squareEast(map, xOffs, yOffs, dim) {
	var values = [];
	var delta = getDelta(dim);
	var xLeft = xOffs + delta, xMid = xOffs + dim - 1, xRight = xMid + delta,
		yTop = yOffs, yMid = yOffs + delta, yBottom = yOffs + dim - 1;
	values.push(map[xMid][yTop]);
	if (xRight < map.length) {
		values.push(map[xRight][yMid]);
	}
	values.push(map[xMid][yBottom]);
	values.push(map[xLeft][yMid]);
	map[xMid][yMid] = calcTargetVal(values, dim, map.length);
}

function squareSouth(map, xOffs, yOffs, dim) {
	var values = [];
	var delta = getDelta(dim);
	var xLeft = xOffs, xMid = xOffs + delta, xRight = xOffs + dim - 1,
		yTop = yOffs + delta, yMid = yOffs + dim - 1, yBottom = yMid + delta;
	values.push(map[xRight][yMid]);
	if (yBottom < map[0].length) {
		values.push(map[xMid][yBottom]);
	}
	values.push(map[xLeft][yMid]);
	values.push(map[xMid][yTop]);
	map[xMid][yMid] = calcTargetVal(values, dim, map.length);
}

function squareWest(map, xOffs, yOffs, dim) {
	var values = [];
	var delta = getDelta(dim);
	var xLeft = xOffs - delta, xMid = xOffs, xRight = xOffs + delta,
		yTop = yOffs, yMid = yOffs + delta, yBottom = yOffs + dim - 1;
	values.push(map[xMid][yTop]);
	values.push(map[xRight][yMid]);
	values.push(map[xMid][yBottom]);
	if (xLeft >= 0) {
		values.push(map[xLeft][yMid]);
	}
	map[xMid][yMid] = calcTargetVal(values, dim, map.length);
}

function square(map, xOffs, yOffs, dim) {
	squareNorth(map, xOffs, yOffs, dim);
	squareEast(map, xOffs, yOffs, dim);
	squareSouth(map, xOffs, yOffs, dim);
	squareWest(map, xOffs, yOffs, dim);
}

function trimMap(map, width, height) {
	if (width > map.length || height > map[0].length) {
		console.log('trimMap: bad size');
		return map;
	}

	var trimmedMap = [];
	var i, j;
	for (i = 0; i < width; ++i) {
		trimmedMap.push([]);
		for (j = 0; j < height; ++j) {
			trimmedMap[i].push(map[i][j]);
		}
	}
	return trimmedMap;
}

// uses diamond-square algorithm to generate a heightmap square.
// since the algorithm needs a square of size 2^n+1, we'll generate the smallest map that fits width,height,
// then trim out the desired size.
function generateTerrain(width, height, cbDone, cbProgress) {
	var dim = getNextBinarySize(Math.max(width, height));
	var map = make2dArray(dim, dim);

	// queueing up the actual work here so can avoid blocking UI thread for too long.
	// TODO: this is only slightly better than just doing it all synchronously, since
	// the last chunk is bigger than the others combined. you could make this really
	// fine-grained by having a special purpose task list that just iterates from 0 to
	// n and maps the various parameters into that range numerically. want to avoid
	// lots of temp vars since there are hundreds of thousands of tasks.
	var taskList = new ChunkyTaskList(1);

	// initial values in corners
	var fixedCorners = false;
	if (fixedCorners) {
		map[0][0] = 0;
		map[0][dim - 1] = 0;
		map[dim - 1][0] = 1;
		map[dim - 1][dim - 1] = 1;
	} else {
		map[0][0] = Math.random();
		map[0][dim - 1] = Math.random();
		map[dim - 1][0] = Math.random();
		map[dim - 1][dim - 1] = Math.random();
	}

	// this is the chunk of work that gets done for each grid resolution
	function stepTask(step) {
		return function() {
			var resolution = (map.length - 1) / (step - 1);
			var i, j, xOffs, yOffs;
			yOffs = 0;
			for (i = 0; i < resolution; ++i) {
				xOffs = 0;
				for (j = 0; j < resolution; ++j) {
					diamond(map, xOffs, yOffs, step);
					xOffs += step - 1;
				}
				yOffs += step - 1;
			}
			yOffs = 0;
			for (i = 0; i < resolution; ++i) {
				xOffs = 0;
				for (j = 0; j < resolution; ++j) {
					square(map, xOffs, yOffs, step);
					xOffs += step - 1;
				}
				yOffs += step - 1;
			}
		};
	}

	// can't use recursion here, because we have to do all diamond steps
	// at a given resolution before starting the square steps.
	var stepDim = dim;
	while (stepDim >= 3) {
		taskList.add(stepTask(stepDim));
		stepDim = Math.floor(stepDim / 2) + 1;
	}
	var cbProgressWrapper = function(cur, tot) {
		if (cbProgress) {
			cbProgress(map, cur, tot);
		}
	};
	taskList.execute(function() {
		cbDone(trimMap(map, width, height));
	}, cbProgressWrapper);
}

// fill a map with a linear gradient to test drawing funcs/gradients
function generateTestTerrain(width, height, cb) {
	window.setTimeout(function() {
		var dim = getNextBinarySize(Math.max(width, height));
		var map = make2dArray(dim, dim);
		var i, j;
		for (i = 0; i < dim; ++i) {
			for (j = 0; j < dim; ++j) {
				map[i][j] = ((i * dim) + j) / (dim * dim);
			}
		}
		cb(map);
	}, 1);
}

var testTerrain = false;
module.exports = testTerrain ? generateTestTerrain : generateTerrain;
