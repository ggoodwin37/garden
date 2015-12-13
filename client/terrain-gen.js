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
	// TODO: use dim and max to come up with a scaled random offset here
	return avgVal(values);
}

function getDelta(dim) {
	return Math.floor(dim / 2);
}

function diamond(map, xOffs, yOffs, dim) {
	var values = [];
	var delta = getDelta(dim);
	var xMin = xOffs, xMax = xOffs + dim - 1, yMin = yOffs, yMax = yOffs + dim - 1;
	values.push(map[xMin][yMin]);
	values.push(map[xMax][yMin]);
	values.push(map[xMin][yMax]);
	values.push(map[xMax][yMax]);
	map[xOffs + delta][yOffs + delta] = calcTargetVal(values, dim, map.length);
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

// recurse function for the terrain generator
function recurseGen(map, xOffs, yOffs, dim) {
	if (dim < 3) return;

	diamond(map, xOffs, yOffs, dim);
	squareNorth(map, xOffs, yOffs, dim);
	squareEast(map, xOffs, yOffs, dim);
	squareSouth(map, xOffs, yOffs, dim);
	squareWest(map, xOffs, yOffs, dim);

	var delta = getDelta(dim);
	recurseGen(map, xOffs, yOffs, delta + 1);
	recurseGen(map, xOffs + delta, yOffs, delta + 1);
	recurseGen(map, xOffs, yOffs + delta, delta + 1);
	recurseGen(map, xOffs + delta, yOffs + delta, delta + 1);
}

// uses diamond-square algorithm to generate a heightmap square.
// since the algorithm needs a square of size 2^n+1, we'll generate the smallest map that fits width,height,
// then trim out the desired size, OR map into the desired size, that might work too.
function generateTerrain(width, height) {
	var dim = getNextBinarySize(Math.max(width, height));
	var map = make2dArray(dim, dim);

	// initial values in corners
	map[0][0] = 0;
	map[0][dim - 1] = 0;
	map[dim - 1][0] = 1;
	map[dim - 1][dim - 1] = 1;
	// map[0][0] = Math.random();
	// map[0][dim - 1] = Math.random();
	// map[dim - 1][0] = Math.random();
	// map[dim - 1][dim - 1] = Math.random();
	recurseGen(map, 0, 0, dim);
	return map;
}

// fill a map with a linear gradient to test drawing funcs
// function generateTestTerrain(width, height) {
// 	var dim = getNextBinarySize(Math.max(width, height));
// 	console.log('dim is ' + dim);
// 	var map = make2dArray(dim, dim);
// 	var i, j;
// 	for (i = 0; i < dim; ++i) {
// 		for (j = 0; j < dim; ++j) {
// 			map[i][j] = ((i * dim) + j) / (dim * dim);
// 		}
// 	}
// 	return map;
// }

module.exports = generateTerrain;
//module.exports = generateTestTerrain;
