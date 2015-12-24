//var constants = require('./constants');

function rgbToStyleString(rgb) {
	var r = Math.floor(rgb.r * 0xff);
	var g = Math.floor(rgb.g * 0xff);
	var b = Math.floor(rgb.b * 0xff);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// TODO: this is a quick and dirty imageData cache, could flesh this out more if needed.
var drawMapImageData = null;

var drawLib = {
	clearCtx: function(ctx) {
		var w = ctx.canvas.clientWidth;
		var h = ctx.canvas.clientHeight;
		ctx.clearRect(0, 0, w, h);
	},

	// takes a 2d map with each value between 0,1 and maps that into the context
	// this implementation assumes that the context device size will be bigger
	// than the map's resolution, so we'll scale it using fillRect.
	// this version is slow, only use for cases where you need to map sizes.
	drawMapScaled: function(ctx, map, gradient) {
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
	},
	// draws the entire map using imageData, assumes 1:1 but much faster.
	drawMap: function(ctx, map, gradient) {
		var w = ctx.canvas.clientWidth;
		var h = ctx.canvas.clientHeight;
		if (w !== map.length || h !== map[0].length) {
			console.log('drawMap: size mismatch, this case not handled yet');
		}
		// lazy get image data
		if (!drawMapImageData) {
			drawMapImageData = ctx.getImageData(0, 0, w, h);
		}
		var dataIndex = 0;
		var i, j, val, rgb;
		for (j = 0; j < h; ++j) {
			for (i = 0; i < w; ++i) {
				val = map[i][j];
				if (val === null) {
					rgb = {r: 1, g: 0, b: 1};
				} else {
					rgb = gradient.getRgbForValue(val);
				}
				// set imageData r,g,b,a
				drawMapImageData.data[dataIndex++] = rgb.r * 0xff;
				drawMapImageData.data[dataIndex++] = rgb.g * 0xff;
				drawMapImageData.data[dataIndex++] = rgb.b * 0xff;
				drawMapImageData.data[dataIndex++] = 0xff;
			}
		}
		ctx.putImageData(drawMapImageData, 0, 0);
	},
	drawPlant: function(ctx, cx, cy, radius, color) {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.beginPath();
		ctx.arc(cx, cy, radius, 2 * Math.PI, false);
		ctx.fillStyle = color;
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
};

module.exports = drawLib;
