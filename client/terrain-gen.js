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
			row.push(0);
		}
		result.push(row);
	}
	return result;
}

// recurse function for the terrain generator
function recurseGen(map, xOffs, yOffs, dim) {
	var values, targetVal;
	var delta = Math.floor(dim / 2);

	// diamond step: set center to average of four corners
	values = [];
	values.push(map[xOffs][yOffs]);
	values.push(map[xOffs + dim - 1][yOffs]);
	values.push(map[xOffs][yOffs + dim -1]);
	values.push(map[xOffs + dim - 1][yOffs + dim - 1]);
	targetVal = values.reduce(function(prev, cur) { return prev + cur; }, 0) / values.length;
	// TODO: scaled bipolar random value added to targetVal
	map[xOffs + delta][yOffs + delta] = targetVal;

	// square step: set 4 center points of the diamonds to average of corners.
	// Our desired corner points can be outside the input dims (and potentially outside the map)

	// north
	values = [];
	values.push(map[xOffs][yOffs]);
	values.push(map[xOffs + delta][yOffs + delta]);
	values.push(map[xOffs + dim - 1][yOffs]);
	if (yOffs - delta >= 0) {
		values.push(map[xOffs + delta][yOffs - delta]);
	}
	targetVal = values.reduce(function(prev, cur) { return prev + cur; }, 0) / values.length;
	// TODO: scaled bipolar random value added to targetVal
	map[xOffs + delta][yOffs] = targetVal;

	// east
	values = [];
	values.push(map[xOffs + dim - 1][yOffs]);
	if (xOffs + dim - 1 + delta < map.length) {
		values.push(map[xOffs + dim - 1 + delta][yOffs + delta]);
	}
	values.push(map[xOffs + dim - 1][yOffs + dim - 1]);
	values.push(map[xOffs + delta][yOffs + delta]);
	targetVal = values.reduce(function(prev, cur) { return prev + cur; }, 0) / values.length;
	// TODO: scaled bipolar random value added to targetVal
	map[xOffs + dim - 1][yOffs + delta] = targetVal;

	// south
	values = [];
	values.push(map[xOffs + dim - 1][yOffs + dim - 1]);
	if (yOffs + dim - 1 + delta < map[0].length) {
		values.push(map[xOffs + delta][yOffs + dim - 1 + delta]);
	}
	values.push(map[xOffs][yOffs + dim - 1]);
	values.push(map[xOffs + delta][yOffs + delta]);
	targetVal = values.reduce(function(prev, cur) { return prev + cur; }, 0) / values.length;
	// TODO: scaled bipolar random value added to targetVal
	map[xOffs + delta][yOffs + dim - 1] = targetVal;

	// west
	values = [];
	values.push(map[xOffs][yOffs]);
	values.push(map[xOffs + delta][yOffs + delta]);
	values.push(map[xOffs][yOffs + dim - 1]);
	if (xOffs - delta >= 0) {
		values.push(map[xOffs - delta][yOffs + delta]);
	}
	targetVal = values.reduce(function(prev, cur) { return prev + cur; }, 0) / values.length;
	// TODO: scaled bipolar random value added to targetVal
	map[xOffs - delta][yOffs + delta] = targetVal;

	// TODO: recurse
}

// uses diamond-square algorithm to generate a heightmap square.
// since the algorithm needs a square of size 2^n+1, we'll generate the smallest map that fits width,height,
// then trim out the desired size, OR map into the desired size, that might work too.
function generateTerrain(width, height) {
	var dim = getNextBinarySize(Math.max(width, height));
	var map = make2dArray(dim, dim);

	// initial values in corners
	map[0][0] = Math.random();
	map[0][dim - 1] = Math.random();
	map[dim - 1][0] = Math.random();
	map[dim - 1][dim - 1] = Math.random();
	recurseGen(map, 0, 0, dim);
	return map;
}

module.exports = generateTerrain;
