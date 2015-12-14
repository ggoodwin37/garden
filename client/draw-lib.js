//var constants = require('./constants');

var BLANK_CANVAS_COLOR = '#0c0c0c';

function rgbToStyleString(rgb) {
	var r = Math.floor(rgb.r * 0xff);
	var g = Math.floor(rgb.g * 0xff);
	var b = Math.floor(rgb.b * 0xff);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

var drawLib = {
	clearCtx: function(ctx) {
		var w = ctx.canvas.clientWidth;
		var h = ctx.canvas.clientHeight;
		ctx.fillStyle = BLANK_CANVAS_COLOR;
		ctx.fillRect(0, 0, w, h);
	},

	// takes a 2d map with each value between 0,1 and maps that into the context
	// this implementation assumes that the context device size will be bigger
	// than the map's resolution, so we'll scale it using fillRect. There are
	// probably more efficient ways to do this if we aren't scaling up.
	drawMap: function(ctx, map, gradient) {
		var w = ctx.canvas.clientWidth;
		var h = ctx.canvas.clientHeight;
		var blockW = w / map.length;
		var blockH = h / map[0].length;
		var i, j;
		var val, rgb;
		for (i = 0; i < map.length; ++i) {
			for (j = 0; j < map[0].length; ++j) {
				val = map[i][j];
				if (val === null) {
					rgb = {r: 1, g: 0, b: 1};
				} else {
					rgb = gradient.getRgbForValue(val);
				}
				ctx.fillStyle = rgbToStyleString(rgb);
				ctx.fillRect(Math.floor(i * blockW),
							 Math.floor(j * blockH),
							 Math.ceil(blockW),
							 Math.ceil(blockH));
			}
		}
	}
};

module.exports = drawLib;
